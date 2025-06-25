/// <reference types="leaflet" />
// @ts-ignore: If you see a type error for leaflet, run: npm install --save-dev @types/leaflet
import React, { useEffect, useRef, useState } from 'react';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './EmergencyRoutingPage.css';

interface Incident {
  id: number;
  type: string;
  description: string;
  location: string;
  timestamp: string;
  lon: number;
}

interface Node {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

const EmergencyRoutingPage: React.FC = () => {
  const [mapData, setMapData] = useState<{ nodes: Node[] } | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [fromNode, setFromNode] = useState<string>('G');
  const [route, setRoute] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Helper to get node by id
  const getNodeById = (id: string): Node | undefined => mapData?.nodes.find((n: Node) => n.id === id);

  useEffect(() => {
    fetch('/refinery_map.json')
      .then(response => response.json())
      .then(data => setMapData(data));

    // Clean up any previous map instance
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    if (mapContainerRef.current) {
      mapContainerRef.current.innerHTML = '';
    }

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current!).setView([17.691, 83.244], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Fetch incidents
  useEffect(() => {
    fetch('http://localhost:5000/incidents')
      .then(res => res.json())
      .then(data => {
        // Map backend fields to frontend Incident interface
        const mapped = (data.incidents || []).map((incident: any, idx: number) => ({
          id: idx,
          type: incident.hazard_type || incident.type || "Unknown Hazard",
          description: incident.description || "No description",
          location: incident.location,
          timestamp: incident.timestamp || "",
          lon: 0 // Not used, but required by interface
        }));
        setIncidents(mapped);
      });
  }, []);

  // Display incidents as markers
  useEffect(() => {
    if (!mapRef.current) return;
    // Remove all markers and polylines except the tile layer
    mapRef.current.eachLayer((layer: L.Layer) => {
      // @ts-ignore
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapRef.current?.removeLayer(layer);
      }
    });
    // Add incident markers
    incidents.forEach(incident => {
      const node = getNodeById(incident.location);
      if (node) {
        const marker = L.marker([node.lat, node.lon]).addTo(mapRef.current!);
        marker.bindPopup(
          `<b>${incident.type ? incident.type.toUpperCase() : "Unknown Hazard"}</b><br/>${incident.description || "No description"}<br/><button id="route-to-${incident.location}">Show Route from ${getNodeById(fromNode)?.name || 'Start Point'}</button>`
        );
        marker.on('popupopen', () => {
          setTimeout(() => {
            const btn = document.getElementById(`route-to-${incident.location}`);
            if (btn) {
              btn.onclick = () => handleRoute(fromNode, incident.location);
            }
          }, 100);
        });
      }
    });
    // Draw route if available
    if (route.length > 0) {
      const routePoints: L.LatLngExpression[] = route
        .map(getNodeById)
        .filter((node): node is Node => !!node)
        .map(node => [node.lat, node.lon]);
      
      if (routePoints.length > 1) {
        const polyline = L.polyline(routePoints, { color: 'blue' }).addTo(mapRef.current!);
        mapRef.current!.fitBounds(polyline.getBounds());
      }
    }
  }, [mapData, incidents, route]);

  const handleRoute = async (start?: string, end?: string) => {
    const from = start || fromNode;
    const to = end;

    if (!from || !to) {
      alert("Please select a start and destination.");
      return;
    }

    setLoading(true);
    setRoute([]); // Clear previous route
    try {
      // Exclude the destination node from the blocked list
      const blocked = incidents
        .map(i => i.location)
        .filter(loc => loc !== to);

      const response = await fetch('http://localhost:5000/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: from,
          to: to,
          blocked: blocked
        }),
      });
      const data = await response.json();
      if (response.ok && data.route) {
        setRoute(data.route);
      } else {
        alert(data.error || 'Failed to find a route.');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      alert('An error occurred while fetching the route.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emergency-routing-page">
      <div className="routing-controls">
        <h2>Calculate Emergency Route</h2>
        <select value={fromNode} onChange={(e) => setFromNode(e.target.value)}>
          <option value="">Select Start Point</option>
          {mapData?.nodes.map(node => (
            <option key={`from-${node.id}`} value={node.id}>{node.name}</option>
          ))}
        </select>
      </div>
      <div className="map-container" ref={mapContainerRef}>
        {loading && <div className="loading-overlay">Calculating Route...</div>}
      </div>
    </div>
  );
};

export default EmergencyRoutingPage;
