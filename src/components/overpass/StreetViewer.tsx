import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Dices, Map } from 'lucide-react';
import { useElementStore, useStreetViewerStore } from '@/store/index';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GoogleButton from '@/components/shared/GoogleButton';
import { loader } from '@/utils/googleMapsApiLoader';
import { Combobox } from './Combobox';

type StreetViewerProps = {
  toggleMapPanel: () => void;
};

export default function StreetViewer({ toggleMapPanel }: StreetViewerProps) {
  const { elements, currentIndex, prev, next, random } = useElementStore();
  const {
    streetViewer,
    setCurrentPlace,
    streetViewSource,
    setStreetViewSource,
  } = useStreetViewerStore();

  useEffect(() => {
    loader.importLibrary('streetView').then(() => {
      setStreetViewSource(google.maps.StreetViewSource.DEFAULT);
    });
  }, []);

  const handleStreetViewSource = (source: string) => {
    setStreetViewSource(source as google.maps.StreetViewSource);
  };

  useEffect(() => {
    if (elements && elements.length > 0) {
      setCurrentPlace({
        lat: elements[currentIndex].lat,
        lng: elements[currentIndex].lng,
      });
    }
  }, [elements, currentIndex]);

  return (
    <div className="relative h-full w-full rounded bg-transparent">
      {elements ? (
        <>
          {elements.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-xl">No locations available.</p>
            </div>
          ) : (
            <>
              <div className="absolute bottom-2 left-2 rounded bg-[#222]/80 p-2 text-xs text-green-500">
                <p>Total Locations: {elements.length}</p>
                <p>Current Location: {currentIndex + 1}</p>
              </div>
              {streetViewer ? (
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  className="rounded"
                  src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${streetViewer.lat},${streetViewer.lng}&fov=100`}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-transparent">
                  <p className="text-xl">Unable to view the location...</p>
                </div>
              )}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
                <GoogleButton onClick={prev}>
                  <ChevronLeft />
                </GoogleButton>
                <GoogleButton onClick={random}>
                  <Dices />
                </GoogleButton>
                <Combobox placeholder="Select Location" />
                <GoogleButton onClick={toggleMapPanel}>
                  <Map />
                </GoogleButton>
                <GoogleButton onClick={next}>
                  <ChevronRight />
                </GoogleButton>
              </div>
              <div className="absolute left-0 top-0 flex w-full justify-center">
                <Select
                  value={
                    streetViewSource || google.maps.StreetViewSource.DEFAULT
                  }
                  onValueChange={handleStreetViewSource}
                >
                  <SelectTrigger className="mt-2 w-fit rounded-[2px] border-none bg-[#222]/80 text-white">
                    <SelectValue placeholder="Select a Street View Source" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[2px] border-none bg-[#222]/80 text-white">
                    <SelectGroup>
                      <SelectLabel>Street View Source</SelectLabel>
                      <SelectItem value={google.maps.StreetViewSource.DEFAULT}>
                        Default
                      </SelectItem>
                      <SelectItem value={google.maps.StreetViewSource.GOOGLE}>
                        Google
                      </SelectItem>
                      <SelectItem value={google.maps.StreetViewSource.OUTDOOR}>
                        Outdoor
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-xl">Run a query to Street View</p>
        </div>
      )}
    </div>
  );
}
