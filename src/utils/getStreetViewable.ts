import { getRandomPointInCountry } from '@/app/api/randompoints/route';
import getCountry from './getCountry';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  version: 'weekly',
  libraries: ['places'],
});

export async function getStreetViewable(
  lat: number,
  lng: number
): Promise<google.maps.LatLngLiteral | null> {
  return new Promise((resolve) => {
    loader.importLibrary('streetView').then(() => {
      const panorama = new google.maps.StreetViewService();
      panorama.getPanorama(
        {
          preference: google.maps.StreetViewPreference.NEAREST,
          location: { lat, lng },
          radius: 1000,
          sources: [google.maps.StreetViewSource.GOOGLE],
        },
        async (data, status) => {
          if (status === 'OK' && data) {
            const latLng = data.location?.latLng;
            if (!latLng) {
              console.log(
                "Failed to get location, couldn't find latLng object"
              );
              resolve(null);
              return;
            }

            try {
              if (!data.location?.description) {
                console.log('No description, returning null');
                resolve(null);
              } else {
                resolve({
                  lat: parseFloat(latLng.lat().toFixed(7)),
                  lng: parseFloat(latLng.lng().toFixed(7)),
                });
              }
            } catch (e) {
              console.log('Failed to get country', e);
              resolve({
                lat: parseFloat(latLng.lat().toFixed(7)),
                lng: parseFloat(latLng.lng().toFixed(7)),
              });
            }
          } else {
            console.log('Failed to get panorama', status, data);
            resolve(null);
          }
        }
      );
    });
  });
}

async function generateValidLatLng(
  country?: string
): Promise<google.maps.LatLngLiteral | null> {
  const point = getRandomPointInCountry(
    country && country !== 'all' ? country.toUpperCase() : true
  );
  if (!point) {
    console.log('Failed to get a random point, returning null');
    return null;
  }

  const [lat, lng] = point;
  console.log('Trying to get panorama for', lat, lng);

  return new Promise((resolve) => {
    loader.importLibrary('streetView').then(() => {
      const panorama = new google.maps.StreetViewService();
      panorama.getPanorama(
        {
          preference: google.maps.StreetViewPreference.BEST,
          location: { lat, lng },
          radius: 1000,
          sources: [google.maps.StreetViewSource.GOOGLE],
        },
        async (data, status) => {
          if (status === 'OK' && data) {
            const latLng = data.location?.latLng;
            if (!latLng) {
              console.log(
                "Failed to get location, couldn't find latLng object"
              );
              resolve(null);
              return;
            }

            try {
              const country = await getCountry(latLng.lat(), latLng.lng());
              if (
                !['MN', 'KR'].includes(country) &&
                !data.location?.description
              ) {
                console.log('No description, returning null');
                resolve(null);
              } else {
                resolve({ lat: latLng.lat(), lng: latLng.lng() });
              }
            } catch (e) {
              console.log('Failed to get country', e);
              resolve({
                lat: latLng.lat(),
                lng: latLng.lng(),
              });
            }
          } else {
            console.log('Failed to get panorama', status, data);
            resolve(null);
          }
        }
      );
    });
  });
}

export default async function getRandomStreetViewable(
  country?: string
): Promise<google.maps.LatLngLiteral | null> {
  while (true) {
    const data = await generateValidLatLng(country);
    if (data) {
      return data;
    }
  }
}
