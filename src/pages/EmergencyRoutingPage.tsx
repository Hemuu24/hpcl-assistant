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
      .then(data => setIncidents(data.incidents || []));
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
          `<b>${incident.type.toUpperCase()}</b><br/>${incident.description}<br/><button id="route-to-${incident.location}">Route from Main Gate</button>`
        );
        marker.on('popupopen', () => {
          setTimeout(() => {
            const btn = document.getElementById(`route-to-${incident.location}`);
            if (btn) {
              btn.onclick = () => handleRoute(incident.location);
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

  // Route calculation
  const handleRoute = async (endNode: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'G', // Assuming Main Gate is the start
          to: endNode,
          blocked: incidents.map(i => i.location)
        }),
      });
      const data = await response.json();
      if (response.ok && data.route) {
        setRoute(data.route);
      } else {
        alert(data.error || 'No route found');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Emergency Routing System</h1>
      <div ref={mapContainerRef} id="emergency-map" style={{ height: 500, width: '100%', borderRadius: 8, marginBottom: 24 }}></div>
      {loading && <p>Calculating route...</p>}
      <p>Click on an incident marker and use the popup to route from Main Gate.</p>
      {route.length > 1 && (
        <div style={{ marginTop: 16, background: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <b>Route:</b> {route.map(id => getNodeById(id)?.name || id).join(' → ')}
        </div>
      )}
    </div>
  );
};

export default EmergencyRoutingPage;
