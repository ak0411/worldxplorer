'use client';

import { Element } from '@/lib/types';
import { getStreetViewable } from '@/utils/getStreetViewable';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

type Props = {
  elements: Element[];
};

export default function StreetViewer({ elements }: Props) {
  const [streetView, setStreetView] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [elements]);

  useEffect(() => {
    const fetchStreetViewable = async () => {
      if (elements.length > 0 && index < elements.length) {
        const location = await getStreetViewable(
          elements[index].lat,
          elements[index].lon
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
                old: {elements[index].lat}, {elements[index].lon}
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
              src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${streetView.lat},${streetView.lng}&fov=100`}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-transparent">
              <p className="text-xl">Unable to view the location...</p>
            </div>
          )}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
            <Button
              onClick={() =>
                setIndex(
                  (prev) => (prev - 1 + elements.length) % elements.length
                )
              }
            >
              Prev
            </Button>
            <Button
              onClick={() => setIndex((prev) => (prev + 1) % elements.length)}
            >
              Next
            </Button>
            <Button
              onClick={() =>
                setIndex(Math.floor(Math.random() * elements.length))
              }
            >
              Random
            </Button>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center bg-transparent">
          <p className="text-xl">Run a query to view Street View</p>
        </div>
      )}
    </div>
  );
}
