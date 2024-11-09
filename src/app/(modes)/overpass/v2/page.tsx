'use client';

import MapPanorama from '@/components/overpass/v2/map';
import QueryEditor from '@/components/overpass/v2/query-editor';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Element } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

export default function Overpass() {
  const [elements, setElements] = useState<Element[] | null>(null);
  const queryEditorPanelRef = useRef<ImperativePanelHandle>(null);

  const collapseQueryEditor = () => queryEditorPanelRef.current?.collapse();

  useEffect(() => {
    console.log(elements);
  }, [elements]);

  return (
    <div className="h-screen p-2">
      <ResizablePanelGroup direction="horizontal" className="flex gap-2">
        <ResizablePanel
          collapsible
          minSize={15}
          defaultSize={30}
          ref={queryEditorPanelRef}
        >
          <QueryEditor setElements={setElements} />
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
            <MapPanorama
              collapseQueryEditor={collapseQueryEditor}
              elements={elements}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
