import GoogleButton from '@/components/shared/GoogleButton';
import { ChevronLeft, ChevronRight, Dices, Map } from 'lucide-react';
import React from 'react';
import { LocationSelector } from './location-selector';
import { Element } from '@/lib/types';
import { getRandomIndex } from '@/lib/utils';
import { useOverpassState } from '@/hooks/use-overpass-state';

type Props = {
  elements: Element[];
  className?: string;
  toggleMap: () => void;
};

export default function MapController({
  elements,
  className,
  toggleMap,
}: Props) {
  const { overpassState, setOverpassState } = useOverpassState();
  const { index } = overpassState;

  return (
    <div className={className}>
      <GoogleButton
        onClick={() =>
          setOverpassState({
            index: (elements.length + index! - 1) % elements.length,
          })
        }
      >
        <ChevronLeft />
      </GoogleButton>
      <GoogleButton onClick={toggleMap}>
        <Map />
      </GoogleButton>
      <LocationSelector elements={elements} />
      <GoogleButton
        onClick={() =>
          setOverpassState({
            index: getRandomIndex(index!, elements.length),
          })
        }
      >
        <Dices />
      </GoogleButton>
      <GoogleButton
        onClick={() =>
          setOverpassState({
            index: (elements.length + index! + 1) % elements.length,
          })
        }
      >
        <ChevronRight />
      </GoogleButton>
    </div>
  );
}
