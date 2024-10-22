import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import useElementStore from '@/store/store';

export default function MapViewer() {
  const { elements, change } = useElementStore();
  const center =
    elements.length > 0
      ? { lat: elements[0].lat, lng: elements[0].lng }
      : { lat: 59.64371849536629, lng: 17.08158297797216 };
  const zoom = 15;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
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
        {elements.map((point, idx) => (
          <CircleMarker
            key={point.id}
            center={{ lat: point.lat, lng: point.lng }}
            radius={5}
            fillColor="#3388ff"
            color="#3388ff"
            weight={1}
            opacity={0.8}
            fillOpacity={0.8}
            eventHandlers={{
              click: () => change(idx),
            }}
          >
            <Popup>{idx}</Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
      <MapController />
    </MapContainer>
  );
}

function MapController() {
  const map = useMap();
  const { elements, index } = useElementStore();

  // Recenter map
  useEffect(() => {
    const center =
      elements.length > 0 && index < elements.length
        ? { lat: elements[index].lat, lng: elements[index].lng }
        : { lat: 59.64371849536629, lng: 17.08158297797216 };

    const currentZoom = map.getZoom();
    map.setView(center, currentZoom);
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
