'use client';

import QueryEditor from '@/components/QueryEditor';
import { Separator } from '@/components/ui/separator';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useState } from 'react';
import StreetViewer from '@/components/StreetViewer';
import { Element } from '@/lib/types';

type Props = {};

export default function Overpass({}: Props) {
  const [elements, setElements] = useState<Element[]>([]);
  useState<google.maps.LatLngLiteral | null>(null);

  return (
    <div className="h-screen p-2">
      <PanelGroup direction="horizontal" className="flex gap-2">
        <Panel collapsible minSize={10} defaultSize={50}>
          <QueryEditor setElements={setElements} />
        </Panel>
        <PanelResizeHandle className="flex items-center">
          <Separator orientation="vertical" className="h-[400px]" />
        </PanelResizeHandle>
        <Panel minSize={30} defaultSize={50}>
          <StreetViewer elements={elements} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
