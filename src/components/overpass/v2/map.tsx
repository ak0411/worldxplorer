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
};

export default function MapPanorama({ elements }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const panoRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map>();
  const panoramaInstance = useRef<google.maps.StreetViewPanorama>();
  const markerClustererInstance = useRef<MarkerClusterer>();

  const searchParams = useSearchParams();
  const router = useRouter();

  const index = parseInt(searchParams.get('index') ?? '0');
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

  /* INITIALIZING OR UPDATING MAP */
  useEffect(() => {
    if (elements.length === 0) return;

    const poi = { lat: elements[index].lat, lng: elements[index].lng };

    if (mapRef.current) {
      // Initialize the map if it hasn't been created yet
      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: poi,
          zoom: 15,
          disableDefaultUI: true,
          streetViewControl: true,
          mapId: 'eec759fc5f43c7c',
          zoomControl: true,
        });
      } else {
        // Update map center if mapInstance already exists
        mapInstance.current.setCenter(poi);
      }
    }
  }, [elements, index]);

  useEffect(() => {
    if (mapInstance.current) {
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

          if (index !== i) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('index', i.toString());
            router.replace(`?${params.toString()}`, { scroll: false });
          }
        });

        return marker;
      });

      markerClustererInstance.current?.clearMarkers();
      markerClustererInstance.current = new MarkerClusterer({
        map: mapInstance.current,
        markers,
      });
    }
  }, [elements]);

  /* INITIALIZING OR UPDATING STREET VIEW (PANO) */
  useEffect(() => {
    if (panoRef.current && position) {
      // Initialize the panorama if it hasn't been created yet
      if (!panoramaInstance.current) {
        panoramaInstance.current = new google.maps.StreetViewPanorama(
          panoRef.current,
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
        mapInstance.current?.setStreetView(panoramaInstance.current);
      } else {
        panoramaInstance.current.setPosition(position);
        panoramaInstance.current.setVisible(true);
      }
    } else {
      panoramaInstance.current?.setVisible(false);
    }
  }, [position]);

  useEffect(() => {
    if (elements.length > 0) {
      const updatePosition = async () => {
        const validPos = await getStreetViewable(
          elements[index].lat,
          elements[index].lng,
          streetViewSource
        );

        const params = new URLSearchParams(searchParams.toString());
        if (validPos) {
          const posString = `${validPos.lat},${validPos.lng}`;
          params.set('pos', posString);
          params.set('index', index.toString());
          params.set('streetViewSource', streetViewSource);
        } else {
          params.delete('pos');
        }
        router.replace(`?${params.toString()}`, { scroll: false });
      };

      updatePosition();
    }
  }, [elements, index, streetViewSource, pos]);

  return (
    <div className="relative size-full" ref={panoRef}>
      <div
        className={`absolute z-20 ${isHidden && 'hidden'} ${isExpanded ? 'bottom-0 left-0 right-0 h-1/2' : 'bottom-[25px] left-[25px] h-1/3 w-[350px]'} rounded border`}
      >
        <div ref={mapRef} className="size-full" />
        <Button
          onClick={toggleMapSize}
          className="absolute right-2 top-2 bg-white text-gray-300 shadow-md hover:bg-white hover:text-gray-100"
          size="icon"
        >
          {isExpanded ? <Shrink /> : <Expand />}
        </Button>
      </div>
      {!position && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
          <p className="text-black">
            No nearby street view for this location...
          </p>
        </div>
      )}
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
