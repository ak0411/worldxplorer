'use client';

import { getStreetViewable } from '@/utils/getStreetViewable';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Dices, Map } from 'lucide-react';
import useElementStore from '@/store/store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type StreetViewerProps = {
  toggleMapPanel: () => void;
};

const StreetViewButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-[2px] bg-[#444] text-[#b3b3b3] transition-all hover:bg-[#444] hover:text-[#ffffff]"
    >
      {children}
    </Button>
  );
};

export default function StreetViewer({ toggleMapPanel }: StreetViewerProps) {
  const { elements, currentIndex, prev, next, random } = useElementStore();

  const [streetView, setStreetView] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [streetViewSource, setStreetViewSource] =
    useState<google.maps.StreetViewSource | null>(null);

  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      if (typeof window !== 'undefined' && !isGoogleMapsLoaded) {
        const { Loader } = await import('@googlemaps/js-api-loader');
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          version: 'weekly',
          libraries: ['places'],
        });
        await loader.importLibrary('core');
        setIsGoogleMapsLoaded(true);
        setStreetViewSource(google.maps.StreetViewSource.DEFAULT);
      }
    };
    loadGoogleMaps();
  }, [isGoogleMapsLoaded]);

  useEffect(() => {
    const fetchStreetViewable = async () => {
      if (elements && elements.length > 0 && streetViewSource) {
        const location = await getStreetViewable(
          elements[currentIndex].lat,
          elements[currentIndex].lng,
          streetViewSource
        );
        setStreetView(location);
      }
    };
    fetchStreetViewable();
  }, [currentIndex, elements, streetViewSource, isGoogleMapsLoaded]);

  return (
    <div className="relative h-full w-full">
      {elements ? (
        <>
          {elements.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded bg-secondary">
              <p className="text-xl">No locations available.</p>
            </div>
          ) : (
            <>
              <div className="absolute bottom-2 left-2 rounded bg-primary/80 p-2 text-xs text-green-500">
                <p>total locations: {elements.length}</p>
                <p>index: {currentIndex}</p>
                {currentIndex < elements.length && (
                  <p>
                    old: {elements[currentIndex].lat},{' '}
                    {elements[currentIndex].lng}
                  </p>
                )}
                {streetView && (
                  <p>
                    new: {streetView.lat}, {streetView.lng}
                  </p>
                )}
              </div>
              {streetView ? (
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  className="rounded"
                  src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${streetView.lat},${streetView.lng}&fov=100`}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-transparent">
                  <p className="text-xl">Unable to view the location...</p>
                </div>
              )}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
                <StreetViewButton onClick={prev}>
                  <ChevronLeft />
                </StreetViewButton>
                <StreetViewButton onClick={random}>
                  <Dices />
                </StreetViewButton>
                <StreetViewButton onClick={toggleMapPanel}>
                  <Map />
                </StreetViewButton>
                <StreetViewButton onClick={next}>
                  <ChevronRight />
                </StreetViewButton>
              </div>
              <div className="absolute left-0 top-0 flex w-full justify-center">
                <Select
                  value={
                    streetViewSource || google.maps.StreetViewSource.DEFAULT
                  }
                  onValueChange={(value) =>
                    setStreetViewSource(value as google.maps.StreetViewSource)
                  }
                >
                  <SelectTrigger className="mt-2 w-fit rounded-[2px] border-none bg-primary/75 text-muted">
                    <SelectValue placeholder="Select a Street View Source" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[2px] border-none bg-primary/75 text-muted">
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
            </>
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center rounded bg-secondary">
          <p className="text-xl">Run a query to Street View</p>
        </div>
      )}
    </div>
  );
}
