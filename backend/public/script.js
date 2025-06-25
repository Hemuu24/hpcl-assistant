const API_URL = 'http://127.0.0.1:5000';

const statusDiv = document.getElementById('status');
const answerDiv = document.getElementById('answer');
const routeDiv = document.getElementById('route');
const fromNodeSelect = document.getElementById('fromNode');
const toNodeSelect = document.getElementById('toNode');
const blockedNodesContainer = document.getElementById('blockedNodesContainer');

let map = null;
let markers = {};
let lines = {};
let mapData = null; // Store map data globally

document.addEventListener('DOMContentLoaded', initMap);

function setStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? '#e74c3c' : '#2ecc71';
}

async function initMap() {
    map = L.map('map').setView([17.691, 83.244], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    try {
        const response = await fetch(`${API_URL}/refinery_map.json`);
        mapData = await response.json(); // Store map data

        // Populate dropdowns and checkboxes
        populateSelectors(mapData.nodes);

        // Draw nodes (markers)
        mapData.nodes.forEach(node => {
            const marker = L.marker([node.lat, node.lon]).addTo(map)
                .bindPopup(`<b>${node.name || `Node ${node.id}`}</b>`);
            
            // Add click listener for emergency routing
            marker.on('click', () => handleEmergencyClick(node.id));
            
            markers[node.id] = marker;
        });

        // Draw edges (lines)
        mapData.edges.forEach(edge => {
            const fromNode = mapData.nodes.find(n => n.id === edge.from);
            const toNode = mapData.nodes.find(n => n.id === edge.to);
            if (fromNode && toNode) {
                const latlngs = [
                    [fromNode.lat, fromNode.lon],
                    [toNode.lat, toNode.lon]
                ];
                const line = L.polyline(latlngs, { color: '#3498db', weight: 3 }).addTo(map);
                lines[`${edge.from}-${edge.to}`] = line;
                lines[`${edge.to}-${edge.from}`] = line; // For bidirectional lookup
            }
        });

    } catch (error) {
        console.error("Failed to load map data:", error);
        setStatus("Could not load refinery map.", true);
    }
}

function populateSelectors(nodes) {
    fromNodeSelect.innerHTML = '';
    toNodeSelect.innerHTML = '';
    blockedNodesContainer.innerHTML = '';

    nodes.forEach(node => {
        // Populate dropdowns
        fromNodeSelect.add(new Option(node.name, node.id));
        toNodeSelect.add(new Option(node.name, node.id));

        // Populate checkboxes for blocked nodes
        const checkboxDiv = document.createElement('div');
        checkboxDiv.innerHTML = `
            <input type="checkbox" id="block-${node.id}" value="${node.id}">
            <label for="block-${node.id}">${node.name}</label>
        `;
        blockedNodesContainer.appendChild(checkboxDiv);
    });
}

async function handleEmergencyClick(destinationNodeId) {
    // Set 'from' to Main Gate (assuming 'G' is the Main Gate)
    const startNode = mapData.nodes.find(n => n.name === "Main Gate");
    if (!startNode) {
        setStatus("Could not find 'Main Gate' in map data.", true);
        return;
    }
    fromNodeSelect.value = startNode.id;
    toNodeSelect.value = destinationNodeId;

    // Clear all blocked nodes for an emergency click
    const checkboxes = blockedNodesContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);

    // Find the route
    findRoute();
}

async function uploadDocument() {
    const fileInput = document.getElementById('pdfFile');
    const file = fileInput.files[0];

    if (!file) {
        setStatus('Please select a PDF file to upload.', true);
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        setStatus('Uploading and processing file...');
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            setStatus(result.message);
        } else {
            throw new Error(result.error || 'Upload failed');
        }
    } catch (error) {
        setStatus(`Error: ${error.message}`, true);
    }
}

async function askQuestion() {
    const questionInput = document.getElementById('question');
    const question = questionInput.value.trim();

    if (!question) {
        setStatus('Please enter a question.', true);
        return;
    }

    try {
        setStatus('Searching for an answer...');
        answerDiv.textContent = '';
        const response = await fetch(`${API_URL}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question }),
        });

        const result = await response.json();
        if (response.ok) {
            setStatus('Answer received.');
            if (result.answer) {
                answerDiv.textContent = result.answer;
            } else {
                answerDiv.textContent = 'No relevant information found.';
            }
        } else {
            throw new Error(result.error || 'Failed to get answer');
        }
    } catch (error) {
        setStatus(`Error: ${error.message}`, true);
    }
}

function resetMapStyles() {
    for (const key in lines) {
        lines[key].setStyle({ color: '#3498db', weight: 3, opacity: 0.7 });
    }
}

async function findRoute() {
    const fromNode = fromNodeSelect.value;
    const toNode = toNodeSelect.value;
    
    const blockedCheckboxes = blockedNodesContainer.querySelectorAll('input[type="checkbox"]:checked');
    const blocked = Array.from(blockedCheckboxes).map(cb => cb.value);

    resetMapStyles();

    if (!fromNode || !toNode) {
        setStatus('Please select both a "From" and "To" location.', true);
        return;
    }

    try {
        setStatus('Calculating route...');
        routeDiv.textContent = '';
        const response = await fetch(`${API_URL}/route`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from: fromNode, to: toNode, blocked }),
        });

        const result = await response.json();
        if (response.ok) {
            setStatus('Route found.');
            const path = result.route;
            routeDiv.textContent = path.join(' → ');

            // Highlight the route on the map
            for (let i = 0; i < path.length - 1; i++) {
                const from = path[i];
                const to = path[i+1];
                const lineKey = `${from}-${to}`;
                if (lines[lineKey]) {
                    lines[lineKey].setStyle({ color: '#e74c3c', weight: 5, opacity: 1.0 });
                }
            }
        } else {
            throw new Error(result.error || 'Could not find route');
        }
    } catch (error) {
        setStatus(`Error: ${error.message}`, true);
        routeDiv.textContent = 'No path found.';
    }
} 