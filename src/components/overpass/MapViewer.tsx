import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  useMapEvents,
  Marker,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { useStore } from '@/store/index';
import L from 'leaflet';
import customMarker from '@/public/assets/marker.png';

const markerIcon = new L.Icon({
  iconUrl: customMarker.src,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function MapViewer() {
  const { elements, streetViewer, access } = useStore();

  const zoom = 15;

  return (
    elements && (
      <MapContainer
        center={streetViewer || [0, 0]}
        zoom={zoom}
        className="z-0 h-full w-full rounded-b"
        minZoom={3}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {streetViewer && <Marker position={streetViewer} icon={markerIcon} />}
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
  const { elements, currentIndex, streetViewSource } = useStore();

  if (!elements) return null;

  // Recenter map
  useEffect(() => {
    const center = elements[currentIndex]
      ? { lat: elements[currentIndex].lat, lng: elements[currentIndex].lng }
      : { lat: 0, lng: 0 };

    const currentZoom = map.getZoom();
    map.setView(center, currentZoom);
  }, [elements, currentIndex, map, streetViewSource]);

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
  const { setStreetViewer } = useStore();
  useMapEvents({
    click(e) {
      console.log(e.latlng);
      setStreetViewer(e.latlng);
    },
  });
  return null;
};
