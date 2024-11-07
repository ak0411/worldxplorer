import { Element } from '@/lib/types';
import { convertPosToLatLngLiteral } from '@/lib/utils';
import { getStreetViewable } from '@/utils/getStreetViewable';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import StreetViewSourceSelector from './source-selector';
import MapController from './map-controller';
import { Button } from '@/components/ui/button';
import { Expand, Shrink } from 'lucide-react';

type Props = {
  elements: Element[];
};

export default function MapPanorama({ elements }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const panoRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map>();
  const panoramaInstance = useRef<google.maps.StreetViewPanorama>();

  const searchParams = useSearchParams();
  const router = useRouter();

  const index = parseInt(searchParams.get('index') ?? '0');
  const streetViewSource = (searchParams.get('streetViewSource') ??
    google.maps.StreetViewSource.DEFAULT) as google.maps.StreetViewSource;
  const pos = searchParams.get('pos');

  const position = useMemo(() => convertPosToLatLngLiteral(pos), [pos]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMapSize = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const initialize = () => {
      if (!position) return;

      if (mapRef.current && panoRef.current) {
        // Initialize the map if it hasn't been created yet
        if (!mapInstance.current) {
          mapInstance.current = new google.maps.Map(mapRef.current, {
            center: position,
            zoom: 15,
            disableDefaultUI: true,
            streetViewControl: true,
          });
        } else {
          // Update map center if mapInstance already exists
          mapInstance.current.setCenter(position);
        }

        // Initialize the panorama if it hasn't been created yet
        if (!panoramaInstance.current) {
          panoramaInstance.current = new google.maps.StreetViewPanorama(
            panoRef.current,
            {
              position,
              pov: {
                heading: 0,
                pitch: 0,
              },
            }
          );
          mapInstance.current.setStreetView(panoramaInstance.current);
        } else {
          // Update panorama position if panoramaInstance already exists
          panoramaInstance.current.setPosition(position);
        }
      }
    };

    if (window.google && window.google.maps) {
      initialize();
    }
  }, [position]);

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

  return (
    <div className="relative size-full">
      <div className="absolute bottom-[25px] left-[25px] z-20">
        <div
          ref={mapRef}
          className={`${
            isExpanded ? 'h-[600px] w-[800px]' : 'h-[300px] w-[400px]'
          } rounded`}
        />
        <Button
          onClick={toggleMapSize}
          className="absolute right-2 top-2 bg-white text-gray-300 shadow-md"
          size="icon"
          variant="outline"
        >
          {isExpanded ? <Shrink /> : <Expand />}
        </Button>
      </div>
      <div ref={panoRef} className="relative size-full">
        <StreetViewSourceSelector
          streetViewSource={streetViewSource}
          className="absolute left-1/2 top-[10px] z-10 -translate-x-1/2"
        />
        <MapController
          elements={elements}
          index={index}
          className="absolute bottom-[25px] left-1/2 z-10 flex -translate-x-1/2 gap-2"
        />
      </div>
    </div>
  );
}
