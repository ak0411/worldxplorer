import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { useElementStore, useStreetViewerStore } from '@/store/index';

export default function MapViewer() {
  const { elements, access } = useElementStore();
  const { streetViewer, setCurrentPlace } = useStreetViewerStore();

  useEffect(() => {
    if (elements && elements.length > 0) {
      setCurrentPlace({ lat: elements[0].lat, lng: elements[0].lng });
    }
  }, [elements]);

  const zoom = 15;

  return (
    elements && (
      <MapContainer
        center={streetViewer || [0, 0]}
        zoom={zoom}
        className="h-full w-full rounded-b"
        minZoom={3}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {streetViewer && (
          <CircleMarker
            center={streetViewer}
            radius={5}
            fillColor="#ff3333"
            color="#ff3333"
            weight={1}
            opacity={0.8}
            fillOpacity={0.8}
          />
        )}
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
                click: () => access(idx),
              }}
            >
              <Popup>Location #{idx + 1}</Popup>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>
        <MapController />
        <LocationFinder />
      </MapContainer>
    )
  );
}

function MapController() {
  const map = useMap();
  const { elements, currentIndex } = useElementStore();
  const { setStreetViewer } = useStreetViewerStore();

  if (!elements) return null;

  // Recenter map
  useEffect(() => {
    const center =
      elements.length > 0
        ? { lat: elements[currentIndex].lat, lng: elements[currentIndex].lng }
        : { lat: 0, lng: 0 };

    const currentZoom = map.getZoom();
    map.setView(center, currentZoom);
    setStreetViewer(center);
  }, [elements, currentIndex, map]);

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

const LocationFinder = () => {
  const { setStreetViewer } = useStreetViewerStore();
  useMapEvents({
    click(e) {
      console.log(e.latlng);
      setStreetViewer(e.latlng);
    },
  });
  return null;
};
