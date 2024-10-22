'use client';

import QueryEditor from '@/components/QueryEditor';
import { Separator } from '@/components/ui/separator';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useState } from 'react';
import Viewer from '@/components/Viewer';

export default function Overpass() {
  const [isQueryEditorCollapsed, setIsQueryEditorCollapsed] = useState(false);

  return (
    <div className={`h-screen ${isQueryEditorCollapsed ? 'py-2 pr-2' : 'p-2'}`}>
      <PanelGroup direction="horizontal" className="flex gap-2">
        <Panel
          collapsible
          minSize={10}
          onCollapse={() => setIsQueryEditorCollapsed(true)}
          onExpand={() => setIsQueryEditorCollapsed(false)}
          defaultSize={30}
        >
          <QueryEditor />
        </Panel>
        <PanelResizeHandle className="flex items-center">
          <Separator orientation="vertical" className="h-[400px]" />
        </PanelResizeHandle>
        <Panel minSize={30} defaultSize={70}>
          <Viewer />
        </Panel>
      </PanelGroup>
    </div>
  );
}
