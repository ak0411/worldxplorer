'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Viewer from '@/components/overpass/Viewer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const QueryEditor = dynamic(() => import('@/components/overpass/QueryEditor'), {
  ssr: false,
});

export default function Overpass() {
  const [isQueryEditorCollapsed, setIsQueryEditorCollapsed] = useState(false);

  return (
    <div className={`h-screen ${isQueryEditorCollapsed ? 'py-2 pr-2' : 'p-2'}`}>
      <ResizablePanelGroup direction="horizontal" className="flex gap-2">
        <ResizablePanel
          collapsible
          minSize={15}
          onCollapse={() => setIsQueryEditorCollapsed(true)}
          onExpand={() => setIsQueryEditorCollapsed(false)}
          defaultSize={30}
        >
          <QueryEditor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel collapsible minSize={30} defaultSize={70}>
          <Viewer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
