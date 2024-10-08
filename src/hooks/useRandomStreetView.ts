'use client';

import { useState, useCallback } from 'react';
import { getStreetViewableLocation } from '@/lib/utils';

const useRandomStreetView = () => {
  const defaultPos = { lat: 36.626351358441276, lng: 137.2001619237242 };
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
    defaultPos
  );
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    let newPos = null;
    while (!newPos) {
      newPos = await getStreetViewableLocation();
    }
    setPosition(newPos);
    setLoading(false);
  }, []);

  return { position, loading, refetch };
};

export default useRandomStreetView;
