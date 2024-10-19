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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen ${isCollapsed ? 'py-2 pr-2' : 'p-2'}`}>
      <PanelGroup direction="horizontal" className="flex gap-2">
        <Panel
          collapsible
          minSize={10}
          defaultSize={35}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
        >
          <QueryEditor setElements={setElements} />
        </Panel>
        <PanelResizeHandle className="flex items-center">
          <Separator orientation="vertical" className="h-[400px]" />
        </PanelResizeHandle>
        <Panel minSize={30} defaultSize={65}>
          <Viewer elements={elements} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
