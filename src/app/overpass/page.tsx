'use client';

import QueryEditor from '@/components/QueryEditor';
import { Separator } from '@/components/ui/separator';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useState } from 'react';
import { Element } from '@/lib/types';
import Viewer from '@/components/Viewer';

type Props = {};

export default function Overpass({}: Props) {
  const [elements, setElements] = useState<Element[]>([]);

  return (
    <div className="h-screen">
      <PanelGroup
        direction="horizontal"
        className="flex gap-2"
        autoSaveId="persistance"
      >
        <Panel collapsible minSize={10}>
          <QueryEditor setElements={setElements} className="py-2 pl-2" />
        </Panel>
        <PanelResizeHandle className="flex items-center">
          <Separator orientation="vertical" className="h-[400px]" />
        </PanelResizeHandle>
        <Panel minSize={30}>
          <Viewer elements={elements} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
