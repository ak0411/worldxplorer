import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertPosToLatLngLiteral = (pos: string | null) => {
  if (!pos) return null;

  const [lat, lng] = pos.split(',').map(Number);
  if (!isNaN(lat) && !isNaN(lng)) {
    return { lat, lng } as google.maps.LatLngLiteral;
  }
  return null;
};

export const getRandomIndex = (currentIndex: number, len: number) => {
  const randomIndex = Math.floor(Math.random() * len);
  return randomIndex === currentIndex ? (randomIndex + 1) % len : randomIndex;
};
