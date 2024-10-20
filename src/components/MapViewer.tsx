'use client';

import {
  MapContainer,
  TileLayer,
  Popup,
  useMap,
  CircleMarker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Element } from '@/lib/types';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect } from 'react';
type Props = {
  elements: Element[];
  onMarkerClick: (id: number) => void;
};

export default function MapViewer({ elements, onMarkerClick }: Props) {
  return (
    <MapContainer
      center={{ lat: 0, lng: 0 }}
      zoom={10}
      className="h-screen w-screen rounded-b"
      minZoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={50}
        spiderfyOnMaxZoom={false}
        disableClusteringAtZoom={16}
      >
        {elements.map((point, index) => (
          <CircleMarker
            key={point.id}
            center={{ lat: point.lat, lng: point.lon }}
            radius={7}
            fillColor="#3388ff"
            color="#3388ff"
            weight={1}
            opacity={0.8}
            fillOpacity={0.8}
            eventHandlers={{
              click: () => onMarkerClick(index),
            }}
          >
            <Popup>{point.id || 'Location'}</Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
      <RecenterMap elements={elements} />
    </MapContainer>
  );
}

function RecenterMap({ elements }: { elements: Element[] }) {
  const map = useMap();

  const averageLat =
    elements.length > 0
      ? elements.reduce((sum, point) => sum + point.lat, 0) / elements.length
      : 0;

  const averageLon =
    elements.length > 0
      ? elements.reduce((sum, point) => sum + point.lon, 0) / elements.length
      : 0;

  useEffect(() => {
    const center =
      elements.length > 0
        ? { lat: averageLat, lng: averageLon }
        : { lat: 0, lng: 0 };
    map.setView(center, 10);
  }, [elements, map]);

  return null;
}
