'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';

interface StreetViewExplorerProps {
  position: google.maps.LatLngLiteral;
  onPositionChange: (position: google.maps.LatLngLiteral) => void;
}

const StreetViewExplorer: React.FC<StreetViewExplorerProps> = ({
  position,
  onPositionChange,
}) => {
  const [panorama, setPanorama] =
    useState<google.maps.StreetViewPanorama | null>(null);

  const handlePositionChange = useCallback(() => {
    if (panorama) {
      const newPosition = panorama.getPosition();
      if (newPosition) {
        onPositionChange({ lat: newPosition.lat(), lng: newPosition.lng() });
      }
    }
  }, [panorama, onPositionChange]);

  useEffect(() => {
    if (panorama) {
      panorama.setPosition(position);
      const listener = panorama.addListener(
        'position_changed',
        handlePositionChange
      );
      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [position, panorama, handlePositionChange]);

  const streetViewOptions = useMemo<google.maps.StreetViewPanoramaOptions>(
    () => ({
      position,
      visible: true,
      enableCloseButton: false,
      addressControl: false,
      fullscreenControl: false,
      showRoadLabels: false,
      zoomControl: false,
    }),
    [position]
  );

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={position}
      zoom={14}
    >
      <StreetViewPanorama options={streetViewOptions} onLoad={setPanorama} />
    </GoogleMap>
  );
};

export default StreetViewExplorer;
