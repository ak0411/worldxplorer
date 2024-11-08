'use client';

import MapPanorama from '@/components/overpass/v2/map';
import QueryEditor from '@/components/overpass/v2/query-editor';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Element } from '@/lib/types';
import { useState } from 'react';

export default function Overpass() {
  const [elements, setElements] = useState<Element[] | null>(null);

  return (
    <div className="h-screen p-2">
      <ResizablePanelGroup direction="horizontal" className="flex gap-2">
        <ResizablePanel collapsible minSize={15} defaultSize={30}>
          <QueryEditor setElements={setElements} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20} defaultSize={70}>
          {elements ? (
            <MapPanorama elements={elements} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-xl">Run a query to Street View</p>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
