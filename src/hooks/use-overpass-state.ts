import { useUrlState } from 'state-in-url/next';

type OverpassState = {
  query: string;
  index: number;
  source: google.maps.StreetViewSource;
  pos?: {
    lat: number;
    lng: number;
  };
};

export const defaultOverpassState: OverpassState = {
  query: '',
  index: 0,
  source: 'default' as google.maps.StreetViewSource,
  pos: undefined,
};

export const useOverpassState = () => {
  const { urlState, setUrl } = useUrlState(defaultOverpassState, {
    replace: true,
  });

  return { overpassState: urlState, setOverpassState: setUrl };
};
