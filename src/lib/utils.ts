'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getRandomLatLng = (): google.maps.LatLngLiteral => {
  const lat = Math.random() * 180 - 90;
  const lng = Math.random() * 360 - 180;
  return { lat, lng };
};

export const getStreetViewableLocation =
  async (): Promise<google.maps.LatLngLiteral | null> => {
    const randomPosition = getRandomLatLng();
    const streetViewService = new google.maps.StreetViewService();

    return new Promise((resolve) => {
      if (randomPosition) {
        streetViewService.getPanorama(
          { location: randomPosition, radius: 500 },
          (data, status) => {
            if (
              status === google.maps.StreetViewStatus.OK &&
              data &&
              data.location
            ) {
              resolve(data.location.latLng?.toJSON() || null);
            } else {
              resolve(null);
            }
          }
        );
      } else {
        resolve(null);
      }
    });
  };
