import { ChevronLeft, ChevronRight, Dices } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GoogleButton from '@/components/shared/GoogleButton';
import { Element } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LocationSelector } from './LocationSelector';
import { useEffect } from 'react';
import { getStreetViewable } from '@/utils/getStreetViewable';

type StreetViewerProps = {
  elements: Element[];
};

export default function StreetViewer({ elements }: StreetViewerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const index = parseInt(searchParams.get('index') ?? '0');
  const streetViewSource = (searchParams.get('streetViewSource') ??
    'default') as google.maps.StreetViewSource;
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

  return (
    <div className="relative h-full w-full rounded bg-background">
      {elements.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-xl">No locations available.</p>
        </div>
      ) : (
        <>
          <div className="absolute bottom-2 left-2 rounded bg-[#222]/80 p-2 text-xs text-green-500">
            <p>Total Locations: {elements.length}</p>
            <p>Current Location: {index + 1}</p>
          </div>
          {pos ? (
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="rounded"
              src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${pos}&fov=100`}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-transparent">
              <p className="text-xl">Unable to view the location...</p>
            </div>
          )}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
            <Link
              href={`?${setIndexQueryString((elements.length + index - 1) % elements.length)}`}
              scroll={false}
            >
              <GoogleButton>
                <ChevronLeft />
              </GoogleButton>
            </Link>

            <Link
              href={`?${setIndexQueryString(getRandomIndex())}`}
              scroll={false}
            >
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
          <div className="absolute left-0 top-0 flex w-full justify-center">
            <Select
              value={streetViewSource}
              onValueChange={handleStreetViewSource}
            >
              <SelectTrigger className="mt-2 w-fit rounded-[2px] border-none bg-[#222]/80 font-semibold text-white">
                <SelectValue placeholder="Select a Street View Source" />
              </SelectTrigger>
              <SelectContent className="rounded-[2px] border-none bg-[#222]/80 text-white">
                <SelectGroup>
                  <SelectLabel>Street View Source</SelectLabel>
                  <SelectItem value={'default'}>Default</SelectItem>
                  <SelectItem value={'google'}>Google</SelectItem>
                  <SelectItem value={'outdoor'}>Outdoor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}
