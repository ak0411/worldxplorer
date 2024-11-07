'use client';

import GoogleButton from '@/components/shared/GoogleButton';
import { Element } from '@/lib/types';
import { getStreetViewable } from '@/utils/getStreetViewable';
import { GoogleMap, Marker, StreetViewPanorama } from '@react-google-maps/api';
import { ChevronLeft, ChevronRight, Dices } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { LocationSelector } from './location-selector';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type MapComponentProps = {
  elements: Element[];
};

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100%',
};

const convertPosToLatLngLiteral = (pos: string | null) => {
  if (!pos) return null;

  const [lat, lng] = pos.split(',').map(Number);
  if (!isNaN(lat) && !isNaN(lng)) {
    return { lat, lng };
  }
  return null;
};

const MapComponent = ({ elements }: MapComponentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const index = parseInt(searchParams.get('index') ?? '0');
  const streetViewSource = (searchParams.get('streetViewSource') ??
    google.maps.StreetViewSource.DEFAULT) as google.maps.StreetViewSource;
  const pos = searchParams.get('pos');

  useEffect(() => {
    if (elements.length > 0) {
      const updatePosition = async () => {
        const validPos = await getStreetViewable(
          elements[index].lat,
          elements[index].lng,
          streetViewSource
        );

        const params = new URLSearchParams(searchParams.toString());
        if (validPos) {
          const posString = `${validPos.lat},${validPos.lng}`;
          params.set('pos', posString);
          params.set('index', index.toString());
          params.set('streetViewSource', streetViewSource);
        } else {
          params.delete('pos');
        }
        router.replace(`?${params.toString()}`, { scroll: false });
      };

      updatePosition();
    }
  }, [elements, index, streetViewSource, pos]);

  const setIndexQueryString = (newIndex: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('index', newIndex.toString());
    return params.toString();
  };

  const handleStreetViewSource = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('streetViewSource', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return randomIndex === index
      ? (randomIndex + 1) % elements.length
      : randomIndex;
  };

  const latLng = convertPosToLatLngLiteral(pos);

  if (elements.length === 0) return <></>;

  const poi = { lat: elements[index].lat, lng: elements[index].lng };
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={poi}
        zoom={18}
      >
        <Marker position={poi} />
        {/* {latLng ? (
          <StreetViewPanorama
            options={{
              showRoadLabels: false,
              visible: true,
              position: latLng,
              pov: {
                heading: 0,
                pitch: 0,
              },
            }}
          />
        ) : (
          <p>No Street View available</p>
        )} */}
      </GoogleMap>
      {/* Controllers */}
      <div className="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 gap-2">
        <Link
          href={`?${setIndexQueryString((elements.length + index - 1) % elements.length)}`}
          scroll={false}
        >
          <GoogleButton>
            <ChevronLeft />
          </GoogleButton>
        </Link>
        <Link href={`?${setIndexQueryString(getRandomIndex())}`} scroll={false}>
          <GoogleButton>
            <Dices />
          </GoogleButton>
        </Link>
        <LocationSelector elements={elements} index={index} />
        <Link
          href={`?${setIndexQueryString((elements.length + index + 1) % elements.length)}`}
          scroll={false}
        >
          <GoogleButton>
            <ChevronRight />
          </GoogleButton>
        </Link>
      </div>
      <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2">
        <Select value={streetViewSource} onValueChange={handleStreetViewSource}>
          <SelectTrigger className="mt-2 w-fit rounded-[2px] border-none bg-[#222]/80 font-semibold text-white focus-visible:ring-transparent">
            <SelectValue placeholder="Select a Street View Source" />
          </SelectTrigger>
          <SelectContent className="rounded-[2px] border-none bg-[#222]/80 text-white">
            <SelectGroup>
              <SelectLabel>Street View Source</SelectLabel>
              <SelectItem value={google.maps.StreetViewSource.DEFAULT}>
                Default
              </SelectItem>
              <SelectItem value={google.maps.StreetViewSource.GOOGLE}>
                Google
              </SelectItem>
              <SelectItem value={google.maps.StreetViewSource.OUTDOOR}>
                Outdoor
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { MapComponent };
