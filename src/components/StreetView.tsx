'use client';

import React, { CSSProperties, useCallback, useState } from 'react';
import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from '@react-google-maps/api';

type Props = {};

export default function StreetView({}: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const center = { lat: 59.64367445827783, lng: 17.081733194926297 };

  const streetViewOptions: google.maps.StreetViewPanoramaOptions = {
    position: center,
    visible: true,
    enableCloseButton: false,
    addressControl: false,
    fullscreenControl: false,
    showRoadLabels: false,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ height: '100%', width: '100%' }}
      center={center}
      zoom={10}
    >
      <StreetViewPanorama options={streetViewOptions} />
    </GoogleMap>
  ) : (
    <></>
  );
}
