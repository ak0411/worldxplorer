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

const MapViewer = () => {
  const { elements, streetViewer, access, currentIndex } = useStore();
  const zoom = 15;

  const handleMarkerClick = (idx: number) => () => {
    if (idx !== currentIndex) {
      access(idx);
    }
  };

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
        {elements.length > 0 && (
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
                  click: handleMarkerClick(idx),
                }}
              >
                <Popup>
                  <div className="space-y-2">
                    <strong className="underline">Location #{idx + 1}</strong>
                    <ul>
                      {Object.entries(point.tags).map(([key, value]) => (
                        <li key={key}>
                          <strong>[{key}]</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MarkerClusterGroup>
        )}
        <MapController />
        <LocationFinder />
      </MapContainer>
    )
  );
};

function MapController() {
  const map = useMap();
  const { streetViewer, elements, currentIndex, streetViewSource } = useStore();

  if (!elements) return null;

  // Recenter map
  useEffect(() => {
    const center = streetViewer
      ? { lat: streetViewer.lat, lng: streetViewer.lng }
      : elements[currentIndex]
        ? { lat: elements[currentIndex].lat, lng: elements[currentIndex].lng }
        : { lat: 0, lng: 0 };
    const currentZoom = map.getZoom();
    map.setView(center, currentZoom);
  }, [streetViewer, elements, currentIndex, map, streetViewSource]);

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

export default MapViewer;
