import { Loader } from '@googlemaps/js-api-loader';
import getCountry from './getCountry';
import { getRandomPointInCountry } from '@/app/api/randomcountry/route';

const loader = new Loader({
  apiKey: '',
  version: 'weekly',
  libraries: ['places'],
});

function generateLatLng(
  country?: string
): Promise<{ lat: number; lng: number; country: string } | null> {
  return new Promise((resolve, reject) => {
    loader.importLibrary('streetView').then(() => {
      const point = getRandomPointInCountry(
        country && country !== 'all' ? country.toUpperCase() : true
      );

      if (!point) {
        console.log('Failed to get a random point, resolving null');
        resolve(null);
        return;
      }

      const panorama = new google.maps.StreetViewService();
      console.log('Trying to get panorama for ', point);
      const lat = point[0];
      const lng = point[1];

      panorama.getPanorama(
        {
          preference: google.maps.StreetViewPreference.BEST,
          location: { lat, lng },
          radius: 1000,
          sources: [google.maps.StreetViewSource.GOOGLE],
        },
        (data, status) => {
          if (status === 'OK' && data) {
            const latLng = data.location?.latLng;
            if (!latLng) {
              alert("Failed to get location, couldn't find latLng object");
            }

            getCountry(latLng?.lat(), latLng?.lng())
              .then((country) => {
                if (
                  !['MN', 'KR'].includes(country) &&
                  !data.location?.description
                ) {
                  console.log('No description, rejecting');
                  resolve(null);
                }
                resolve({ lat: latLng!.lat(), lng: latLng!.lng(), country });
              })
              .catch((e) => {
                console.log('Failed to get country', e);
                resolve({
                  lat: latLng!.lat(),
                  lng: latLng!.lng(),
                  country: 'Unknown',
                });
              });
          } else {
            console.log('Failed to get panorama', status, data);
            resolve(null);
          }
        }
      );
    });
  });
}

export default async function getRandomStreetViewable(country?: string) {
  let found = false;
  let data = null;

  while (!found) {
    data = await generateLatLng(country);
    if (data) {
      found = true;
    }
  }

  return data;
}
