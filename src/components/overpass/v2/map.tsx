/* eslint-disable react-hooks/exhaustive-deps */
import { Element } from '@/lib/types';
import { convertPosToLatLngLiteral } from '@/lib/utils';
import { getStreetViewable } from '@/utils/getStreetViewable';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import StreetViewSourceSelector from './source-selector';
import MapController from './map-controller';
import { Button } from '@/components/ui/button';
import { Expand, Shrink } from 'lucide-react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

type Props = {
  elements: Element[];
  collapseQueryEditor: () => void;
};

export default function MapPanorama({ elements, collapseQueryEditor }: Props) {
  const mapInstance = useRef<google.maps.Map>(null);
  const panoramaInstance = useRef<google.maps.StreetViewPanorama>(null);
  const markerClustererInstance = useRef<MarkerClusterer>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const index = parseInt(searchParams.get('index') ?? '0');
  const validIndex = elements[index] ? index : 0;
  const streetViewSource = (searchParams.get('streetViewSource') ??
    google.maps.StreetViewSource.DEFAULT) as google.maps.StreetViewSource;
  const pos = searchParams.get('pos');

  const position = useMemo(() => convertPosToLatLngLiteral(pos), [pos]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleMapSize = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleMap = () => {
    setIsHidden((prev) => !prev);
  };

  const initStreetView = () => {
    return new google.maps.StreetViewPanorama(
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
  };

  const initMap = (center: google.maps.LatLngLiteral) => {
    return new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: 15,
      disableDefaultUI: true,
      streetViewControl: true,
      zoomControl: true,
      mapId: 'eec759fc5f43c7c',
    });
  };

  const populateMarkers = () => {
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

        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('index', i.toString());
        router.replace(`?${currentParams.toString()}`, { scroll: false });
      });

      return marker;
    });

    markerClustererInstance.current?.clearMarkers();
    markerClustererInstance.current = new MarkerClusterer({
      map: mapInstance.current,
      markers,
    });
  };

  useEffect(() => {
    populateMarkers();
    collapseQueryEditor();
  }, [elements, mapInstance.current]);

  useEffect(() => {
    if (!panoramaInstance.current) {
      panoramaInstance.current = initStreetView();
    } else {
      panoramaInstance.current.setPosition(position);
    }

    const center = {
      lat: elements[validIndex].lat,
      lng: elements[validIndex].lng,
    };
    if (!mapInstance.current) {
      mapInstance.current = initMap(center);
      mapInstance.current.setStreetView(panoramaInstance.current);
    } else {
      mapInstance.current.setCenter(center);
    }
  }, [pos, index]);

  useEffect(() => {
    const updatePosition = async () => {
      const validPos = await getStreetViewable(
        elements[validIndex].lat,
        elements[validIndex].lng,
        streetViewSource
      );

      const params = new URLSearchParams(searchParams.toString());
      if (validPos) {
        const posString = `${validPos.lat},${validPos.lng}`;
        params.set('pos', posString);
      } else {
        params.delete('pos');
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    };

    updatePosition();
  }, [elements, index, streetViewSource, pos]);

  return (
    <div id="streetview" className="relative size-full">
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
      <StreetViewSourceSelector
        streetViewSource={streetViewSource}
        className="absolute left-1/2 top-[10px] z-10 -translate-x-1/2"
      />
      <MapController
        elements={elements}
        index={index}
        className="absolute bottom-[25px] left-1/2 z-20 flex -translate-x-1/2 gap-2"
        toggleMap={toggleMap}
      />
    </div>
  );
}
