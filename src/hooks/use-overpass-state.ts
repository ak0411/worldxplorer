import { useUrlState } from 'state-in-url/next';

type OverpassState = {
  query?: string;
  index?: number;
  source?: google.maps.StreetViewSource;
  pos?: {
    lat: number;
    lng: number;
  };
};
const defaultOverpassState: OverpassState = {
  query: undefined,
  index: undefined,
  source: undefined,
  pos: undefined,
};

export const useOverpassState = () => {
  const { urlState, setUrl } = useUrlState(defaultOverpassState, {
    replace: true,
  });

  return { overpassState: urlState, setOverpassState: setUrl };
};
