'use client';

import MapPanorama from '@/components/overpass/v2/map';
import QueryEditor from '@/components/overpass/v2/query-editor';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useOverpassState } from '@/hooks/use-overpass-state';
import { Element } from '@/lib/types';
import { getStreetViewable } from '@/utils/getStreetViewable';
import { useEffect, useRef, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';
import { z } from 'zod';

export default function Overpass() {
  const [elements, setElements] = useState<Element[] | null>(null);
  const queryEditorPanelRef = useRef<ImperativePanelHandle>(null);
  const { overpassState, setOverpassState } = useOverpassState();

  const collapseQueryEditorPanel = () =>
    queryEditorPanelRef.current?.collapse();

  useEffect(() => {
    if (!elements || elements.length === 0) return;

    const overpassStateSchema = z.object({
      query: z.string().optional(),
      index: z
        .number()
        .min(0)
        .max(elements.length - 1)
        .default(0)
        .catch(0),
      source: z
        .enum([
          google.maps.StreetViewSource.DEFAULT,
          google.maps.StreetViewSource.OUTDOOR,
          google.maps.StreetViewSource.GOOGLE,
        ])
        .default(google.maps.StreetViewSource.DEFAULT)
        .catch(google.maps.StreetViewSource.DEFAULT),
      pos: z
        .object({
          lat: z.number(),
          lng: z.number(),
        })
        .optional(),
    });

    const updateUrl = async () => {
      const { index, source } = overpassStateSchema.parse(overpassState);

      const validPos = await getStreetViewable(
        elements[index].lat,
        elements[index].lng,
        source as google.maps.StreetViewSource
      );

      setOverpassState({
        index,
        source,
        pos: validPos || undefined,
      });
    };

    updateUrl();
  }, [elements, overpassState, setOverpassState]);

  return (
    <div className="h-screen p-2">
      <ResizablePanelGroup direction="horizontal" className="flex gap-2">
        <ResizablePanel
          collapsible
          minSize={15}
          defaultSize={30}
          ref={queryEditorPanelRef}
        >
          <QueryEditor
            setElements={setElements}
            collapseQueryEditorPanel={collapseQueryEditorPanel}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20} defaultSize={70}>
          {!elements ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-xl">Run a query to Street View</p>
            </div>
          ) : elements.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-xl">No locations found</p>
            </div>
          ) : (
            <MapPanorama elements={elements} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
