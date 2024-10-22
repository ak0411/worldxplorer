'use client';

import { Element } from '@/lib/types';
import { getStreetViewable } from '@/utils/getStreetViewable';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Dices, Map } from 'lucide-react';
import useElementStore from '@/store/store';

type Props = {
  toggleMapPanel: () => void;
};

export default function StreetViewer({ toggleMapPanel }: Props) {
  const { elements, index, prev, next, random } = useElementStore();

  const [streetView, setStreetView] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const fetchStreetViewable = async () => {
      if (elements.length > 0 && index < elements.length) {
        const location = await getStreetViewable(
          elements[index].lat,
          elements[index].lng
        );
        setStreetView(location);
      }
    };
    fetchStreetViewable();
  }, [index, elements]);

  return (
    <div className="relative h-full w-full">
      {elements.length > 0 ? (
        <>
          <div className="absolute bottom-2 left-2 rounded bg-primary/80 p-2 text-xs text-green-500">
            <p>total locations: {elements.length}</p>
            <p>index: {index}</p>
            {index < elements.length && (
              <p>
                old: {elements[index].lat}, {elements[index].lng}
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
            <Button onClick={prev}>
              <ChevronLeft />
            </Button>
            <Button onClick={random}>
              <Dices />
            </Button>
            <Button onClick={toggleMapPanel}>
              <Map />
            </Button>
            <Button onClick={next}>
              <ChevronRight />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center rounded bg-secondary">
          <p className="text-xl">Run a query to view Street View</p>
        </div>
      )}
    </div>
  );
}
