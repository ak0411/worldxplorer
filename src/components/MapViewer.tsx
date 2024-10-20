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
  index: number;
};

export default function MapViewer({ elements, onMarkerClick, index }: Props) {
  return (
    <MapContainer
      center={{ lat: 0, lng: 0 }}
      className="h-full w-full rounded-b"
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
            radius={5}
            fillColor="#3388ff"
            color="#3388ff"
            weight={1}
            opacity={0.8}
            fillOpacity={0.8}
            eventHandlers={{
              click: () => onMarkerClick(index),
            }}
          >
            <Popup>{index}</Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
      <MapComponent elements={elements} index={index} />
    </MapContainer>
  );
}

function MapComponent({
  elements,
  index,
}: {
  elements: Element[];
  index: number;
}) {
  const map = useMap();

  // Recenter map
  useEffect(() => {
    const center =
      elements.length > 0 && index < elements.length
        ? { lat: elements[index].lat, lng: elements[index].lon }
        : { lat: 0, lng: 0 };
    map.setView(center, 18);
  }, [elements, index, map]);

  // Observe size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    const mapContainer = document.querySelector('.leaflet-container');
    if (mapContainer) {
      resizeObserver.observe(mapContainer);
    }

    return () => {
      if (mapContainer) {
        resizeObserver.unobserve(mapContainer);
      }
    };
  }, [map]);

  return null;
}
