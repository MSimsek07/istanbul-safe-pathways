
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// The token will be replaced by a real one in production
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1hY2NvdW50MiIsImEiOiJjbHh3bDJndjIxNzR0MmtucnEzeTgxb2huIn0.vpbQAAYGSZuyyTac-5JODA';

// Emergency locations data
const emergencyLocations = [
  {
    id: 1,
    name: 'Fenerbahçe Park Toplanma Alanı',
    type: 'assembly',
    coordinates: [29.036, 40.9698],
    capacity: 5000,
    description: 'Acil toplanma alanı'
  },
  {
    id: 2,
    name: 'İstanbul Tıp Fakültesi Hastanesi',
    type: 'hospital',
    coordinates: [28.9394, 41.0120],
    capacity: null,
    description: 'Tam donanımlı hastane'
  },
  {
    id: 3,
    name: 'Beyoğlu İlçe Afet Sığınağı',
    type: 'shelter',
    coordinates: [28.9784, 41.0322],
    capacity: 1200,
    description: 'Deprem sığınağı'
  },
  {
    id: 4,
    name: 'Beşiktaş Meydanı Toplanma Alanı',
    type: 'assembly',
    coordinates: [29.0055, 41.0430],
    capacity: 3000,
    description: 'Acil toplanma alanı'
  },
  {
    id: 5,
    name: 'Acıbadem Hastanesi Maslak',
    type: 'hospital',
    coordinates: [29.0285, 41.1054],
    capacity: null,
    description: 'Özel hastane'
  },
];

interface EmergencyMapProps {
  showAssemblyPoints?: boolean;
  showHospitals?: boolean;
  showShelters?: boolean;
}

const EmergencyMap: React.FC<EmergencyMapProps> = ({
  showAssemblyPoints = true,
  showHospitals = true,
  showShelters = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize the map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [29.0, 41.04], // Istanbul
      zoom: 10.5,
    });
    
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
    
    map.current.on('load', () => {
      setMapLoaded(true);
    });
    
    return () => {
      map.current?.remove();
    };
  }, []);
  
  // Add markers when map is loaded and filter settings change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    // Remove any existing markers first
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Filter locations based on settings
    const filteredLocations = emergencyLocations.filter(location => {
      if (location.type === 'assembly' && !showAssemblyPoints) return false;
      if (location.type === 'hospital' && !showHospitals) return false;
      if (location.type === 'shelter' && !showShelters) return false;
      return true;
    });
    
    // Add markers for filtered locations
    filteredLocations.forEach(location => {
      // Create a marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'marker';
      
      // Style based on location type
      let color = '';
      if (location.type === 'assembly') {
        color = '#10b981'; // Success color for assembly points
      } else if (location.type === 'hospital') {
        color = '#3b82f6'; // Primary color for hospitals
      } else if (location.type === 'shelter') {
        color = '#7c3aed'; // Secondary color for shelters
      }
      
      markerEl.style.width = '24px';
      markerEl.style.height = '24px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.background = color;
      markerEl.style.border = '3px solid white';
      markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <strong>${location.name}</strong>
          <p>${location.description}</p>
          ${location.capacity ? `<p>Kapasite: ${location.capacity} kişi</p>` : ''}
        `);
        
      // Add marker to map
      new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates as [number, number])
        .setPopup(popup)
        .addTo(map.current);
    });
    
  }, [mapLoaded, showAssemblyPoints, showHospitals, showShelters]);
  
  return (
    <div className="h-full w-full relative">
      <div ref={mapContainer} className="h-full w-full rounded-lg"></div>
    </div>
  );
};

export default EmergencyMap;
