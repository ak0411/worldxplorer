'use client';

import { Button } from '@/components/ui/button';
import getRandomStreetViewable from '@/utils/getStreetViewable';
import { useState } from 'react';

type Location = {
  lat: number;
  lng: number;
  country: string;
};
export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);

  const handleClick = async () => {
    const newLocation = await getRandomStreetViewable('th');
    setLocation(newLocation);
    if (newLocation) {
      const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${newLocation.lat},${newLocation.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {location ? (
        <p>
          Lat: {location.lat}, Lng: {location.lng}, Country: {location.country}
        </p>
      ) : (
        <p>Click to start...</p>
      )}
      <Button onClick={handleClick}>Random Street View Location</Button>
    </div>
  );
}
