'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Camera, Star } from 'lucide-react';
import getRandomStreetViewable from '@/utils/getStreetViewable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import countries from '@/public/countries.json';

export default function ExplorePage() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const currentPositionRef = useRef<google.maps.LatLngLiteral | null>(null);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (initialLoadRef.current) {
      getRandomLocation();
      initialLoadRef.current = false;
    }
  }, []);

  const getRandomLocation = async (country?: string) => {
    setLoading(true);
    const location = await getRandomStreetViewable(country);
    if (location) {
      currentPositionRef.current = {
        lat: location.lat,
        lng: location.lng,
      };
      const embedUrl = `//www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${location.lat},${location.lng}`;
      setEmbedUrl(embedUrl);
    }
    setLoading(false);
  };

  const handleCountrySelect = (value: string | null) => {
    setSelectedCountry(value as string);
  };

  const handleEnter = () => {
    getRandomLocation(selectedCountry);
  };

  return (
    <div className="relative flex h-full items-center justify-center">
      {!loading ? (
        <>
          {embedUrl && <iframe className="h-full w-full" src={embedUrl} />}
          <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transform">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Select
                value={selectedCountry}
                onValueChange={handleCountrySelect}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" defaultChecked>
                    Any country
                  </SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleEnter}>Go</Button>
              <Button variant="outline">
                <Camera className="size-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading...
        </Button>
      )}
    </div>
  );
}
