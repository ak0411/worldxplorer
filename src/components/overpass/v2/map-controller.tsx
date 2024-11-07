import GoogleButton from '@/components/shared/GoogleButton';
import { ChevronLeft, ChevronRight, Dices } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { LocationSelector } from './location-selector';
import { Element } from '@/lib/types';

type Props = {
  elements: Element[];
  index: number;
  className?: string;
};

export default function MapController({ elements, index, className }: Props) {
  const searchParams = useSearchParams();

  const setIndexQueryString = (newIndex: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('index', newIndex.toString());
    return params.toString();
  };

  const getRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return randomIndex === index
      ? (randomIndex + 1) % elements.length
      : randomIndex;
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
  );
}
