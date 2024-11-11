import { Element } from '@/lib/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import StreetViewSourceSelector from './source-selector';
import MapController from './map-controller';
import { Button } from '@/components/ui/button';
import { Expand, Shrink } from 'lucide-react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useOverpassState } from '@/hooks/use-overpass-state';

type Props = {
  elements: Element[];
};

export default function MapPanorama({ elements }: Props) {
  const mapInstance = useRef<google.maps.Map>(null);
  const panoramaInstance = useRef<google.maps.StreetViewPanorama>(null);
  const markerClustererInstance = useRef<MarkerClusterer>(null);

  const { overpassState } = useOverpassState();
  const { pos: position, index } = overpassState;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleMapSize = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleMap = () => {
    setIsHidden((prev) => !prev);
  };

  const center = useMemo(
    () => ({
      lat: elements[index!].lat,
      lng: elements[index!].lng,
    }),
    [elements, index]
  );

  useEffect(() => {
    panoramaInstance.current = new google.maps.StreetViewPanorama(
      document.getElementById('streetview') as HTMLElement,
      {
        position,
        pov: {
          heading: 0,
          pitch: 0,
        },
        zoomControl: false,
        fullscreenControl: false,
      }
    );

    mapInstance.current = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center,
        zoom: 15,
        disableDefaultUI: true,
        streetViewControl: true,
        zoomControl: true,
        mapId: 'eec759fc5f43c7c',
      }
    );
    mapInstance.current.setStreetView(panoramaInstance.current);
  }, []);

  useEffect(() => {
    if (panoramaInstance.current) {
      panoramaInstance.current.setPosition(position || null);
    }
  }, [position]);

  useEffect(() => {
    if (mapInstance.current && center) {
      mapInstance.current.setCenter(center);
    }
  }, [center, index]);

  useEffect(() => {
    if (!mapInstance.current) return;

    const infoWindow = new google.maps.InfoWindow({
      disableAutoPan: true,
    });

    const markers = elements.map((element, i) => {
      const latLng = new google.maps.LatLng(element.lat, element.lng);

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: latLng,
        gmpClickable: true,
      });

      const content = `
        <div class="space-y-2 text-secondary">
          <strong class="underline">
            Location Index #${i}
          </strong>
          <ul>
            ${Object.entries(element.tags)
              .map(
                ([key, value]) => `
              <li key="${key}">
                <strong>[${key}]</strong> ${value}
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
        `;

      marker.addListener('click', () => {
        infoWindow.setContent(content);
        infoWindow.open(mapInstance.current, marker);

        /* const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('index', i.toString());
        router.replace(`?${currentParams.toString()}`, { scroll: false }); */
      });

      return marker;
    });

    if (markerClustererInstance.current)
      markerClustererInstance.current.clearMarkers();
    markerClustererInstance.current = new MarkerClusterer({
      map: mapInstance.current,
      markers,
    });
  }, [elements]);

  return (
    <div className="relative size-full">
      <div id="streetview" className="size-full" />
      <div
        className={`absolute z-20 ${isHidden && 'hidden'} ${isExpanded ? 'bottom-0 left-0 right-0 h-1/2' : 'bottom-[25px] left-[25px] h-1/3 w-[350px]'} rounded border`}
      >
        <div id="map" className="size-full" />
        <Button
          onClick={toggleMapSize}
          className="absolute right-2 top-2 bg-white text-gray-300 shadow-md hover:bg-white hover:text-gray-100"
          size="icon"
        >
          {isExpanded ? <Shrink /> : <Expand />}
        </Button>
      </div>
      <StreetViewSourceSelector className="absolute left-1/2 top-[10px] z-10 -translate-x-1/2" />
      <MapController
        elements={elements}
        className="absolute bottom-[25px] left-1/2 z-20 flex -translate-x-1/2 gap-2"
        toggleMap={toggleMap}
      />
    </div>
  );
}
