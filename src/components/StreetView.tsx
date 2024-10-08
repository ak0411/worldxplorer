'use client';

import React from 'react';
import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useMemo } from 'react';
import { getStreetViewOptions } from '@/config/streetViewConfig';

type Props = {
  position: google.maps.LatLngLiteral;
};

const StreetView: React.FC<Props> = React.memo(({ position }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const streetViewOptions = useMemo(
    () => getStreetViewOptions(position),
    [position]
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ height: '100%', width: '100%' }}
      center={position}
      zoom={10}
    >
      <StreetViewPanorama options={streetViewOptions} />
    </GoogleMap>
  ) : null;
});

export default StreetView;
