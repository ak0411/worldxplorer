'use client';

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
        <ResizablePanel collapsible minSize={30} defaultSize={70}>
          <StreetViewer elements={elements} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
