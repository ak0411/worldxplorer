'use client';

import StreetViewExplorer from '@/components/StreetViewExplorer';
import { Button } from '@/components/ui/button';
import { Location } from '@/lib/types';
import getRandomStreetViewable from '@/utils/getStreetViewable';
import { useLoadScript } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import countries from '@/public/countries.json';
import { Input } from '@/components/ui/input';

export default function ExplorePage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded) {
      getRandomLocation();
    }
  }, [isLoaded]);

  const getRandomLocation = async () => {
    const location = await getRandomStreetViewable(selectedCountry);
    setLocation(location);
  };

  if (loadError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <h1>Error Loading Maps</h1>
        <Button>
          <Link href="/explore">Retry</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative flex h-full items-center justify-center">
      {location && isLoaded ? (
        <>
          <StreetViewExplorer
            position={{ lat: location.lat, lng: location.lng }}
          />
          <div className="absolute bottom-10 z-10 mx-auto flex flex-col gap-4 rounded bg-transparent">
            <Input
              placeholder="Search for a country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />
            <Button onClick={getRandomLocation}>New Location</Button>
          </div>
        </>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
      )}
    </div>
  );
}
