'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Star, Camera, Dices } from 'lucide-react';
import getRandomStreetViewable from '@/utils/getStreetViewable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import countries from '@/public/countries.json';
import Link from 'next/link';
import GoogleButton from '@/components/shared/GoogleButton';
import Loading from '@/components/shared/Loading';

export default function Explore() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [streetViewUrl, setStreetViewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

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
      setStreetViewUrl(
        `//www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${location.lat},${location.lng}&fov=100`
      );
    }
    setLoading(false);
  };

  const handleCountrySelect = (value: string | null) => {
    setSelectedCountry(value as string);
    getRandomLocation(value as string);
  };

  const handleEnter = () => {
    getRandomLocation(selectedCountry);
  };

  return (
    <div className="relative flex h-full items-center justify-center">
      {!loading ? (
        <>
          {streetViewUrl && (
            <iframe className="h-full w-full" src={streetViewUrl} />
          )}
          <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transform">
            <div className="flex items-center gap-2">
              <Link href="/">
                <GoogleButton>
                  <ArrowLeft className="mr-2 size-4" />
                  Back
                </GoogleButton>
              </Link>
              <GoogleButton onClick={handleEnter}>
                <Dices />
              </GoogleButton>
              <Select
                value={selectedCountry}
                onValueChange={handleCountrySelect}
              >
                <SelectTrigger className="w-[200px] rounded-[2px] border-none bg-[#222]/80 font-semibold text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[2px] border-none bg-[#222]/80 font-semibold text-white">
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
              <GoogleButton disabled>
                <Camera className="size-4" />
              </GoogleButton>
              <GoogleButton disabled>
                <Star className="size-4" />
              </GoogleButton>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
