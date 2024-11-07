'use client';

import { MapComponent } from '@/components/overpass/v2/map';
import MapPanorama from '@/components/overpass/v2/map-panorama';
import QueryEditor from '@/components/overpass/v2/query-editor';
import StreetViewer from '@/components/overpass/v2/streetviewer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Element } from '@/lib/types';
import { useState } from 'react';

export default function Overpass() {
  const [elements, setElements] = useState<Element[]>([]);

  return (
    <div className="h-screen p-2">
      <ResizablePanelGroup direction="horizontal" className="flex gap-2">
        <ResizablePanel collapsible minSize={15} defaultSize={30}>
          <QueryEditor setElements={setElements} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20} defaultSize={70}>
          {/* <StreetViewer elements={elements} /> */}
          {/* <MapComponent elements={elements} /> */}
          <MapPanorama elements={elements} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
