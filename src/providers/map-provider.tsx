//Since the map will be laoded and displayed on client side
'use client';

import Loading from '@/components/shared/Loading';
// Import necessary modules and functions from external libraries and our own project
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

// Define a list of libraries to load from the Google Maps API
const libraries = ['marker'];

// Define a function component called MapProvider that takes a children prop
export function MapProvider({ children }: { children: ReactNode }) {
  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
  });

  if (loadError || !scriptLoaded) {
    return (
      <div className="flex size-full items-center justify-center">
        {loadError && <p>Encountered error while loading google maps</p>}
        {!scriptLoaded && <Loading />}
      </div>
    );
  }

  // Return the children prop wrapped by this MapProvider component
  return children;
}
