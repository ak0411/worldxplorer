'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';

interface StreetViewExplorerProps {
  position: google.maps.LatLngLiteral;
}

const StreetViewExplorer: React.FC<StreetViewExplorerProps> = ({
  position,
}) => {
  const [panorama, setPanorama] =
    useState<google.maps.StreetViewPanorama | null>(null);

  useEffect(() => {
    if (panorama) {
      panorama.setPosition(position);
    }
  }, [position, panorama]);

  const streetViewOptions = {
    position: position,
    visible: true,
    enableCloseButton: false,
    addressControl: false,
    fullscreenControl: false,
    showRoadLabels: false,
    zoomControl: false,
  };

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
