'use client';

import { GoogleMap } from '@react-google-maps/api';

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100%',
};

const MapComponent = () => {
  return <GoogleMap mapContainerStyle={defaultMapContainerStyle}></GoogleMap>;
};

export { MapComponent };
