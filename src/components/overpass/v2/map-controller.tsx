import GoogleButton from '@/components/shared/GoogleButton';
import { ChevronLeft, ChevronRight, Dices, Map } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { LocationSelector } from './location-selector';
import { Element } from '@/lib/types';
import { getRandomIndex } from '@/lib/utils';

type Props = {
  elements: Element[];
  index: number;
  className?: string;
  toggleMap: () => void;
};

export default function MapController({
  elements,
  index,
  className,
  toggleMap,
}: Props) {
  const searchParams = useSearchParams();

  const setIndexQueryString = (newIndex: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('index', newIndex.toString());
    return params.toString();
  };

  return (
    <div className={className}>
      <Link
        href={`?${setIndexQueryString((elements.length + index - 1) % elements.length)}`}
        scroll={false}
      >
        <GoogleButton>
          <ChevronLeft />
        </GoogleButton>
      </Link>
      <GoogleButton onClick={toggleMap}>
        <Map />
      </GoogleButton>
      <LocationSelector elements={elements} index={index} />
      <Link
        href={`?${setIndexQueryString(getRandomIndex(index, elements.length))}`}
        scroll={false}
      >
        <GoogleButton>
          <Dices />
        </GoogleButton>
      </Link>
      <Link
        href={`?${setIndexQueryString((elements.length + index + 1) % elements.length)}`}
        scroll={false}
      >
        <GoogleButton>
          <ChevronRight />
        </GoogleButton>
      </Link>
    </div>
  );
}
