import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/index';
import StreetViewer from '@/components/overpass/StreetViewer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import { ImperativePanelHandle } from 'react-resizable-panels';
import Loading from '../shared/Loading';

const MapViewer = dynamic(() => import('@/components/overpass/MapViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-muted/30">
      <Loading />
    </div>
  ),
});

export default function Viewer() {
  const mapPanelRef = useRef<ImperativePanelHandle>(null);
  const { loadingQuery } = useStore();

  useEffect(() => {
    if (mapPanelRef.current) {
      mapPanelRef.current.collapse();
    }
  }, []);

  const toggleMapPanel = () => {
    const panel = mapPanelRef.current;
    if (panel) {
      if (panel.isCollapsed()) {
        panel.expand(30);
      } else {
        panel.collapse();
      }
    }
  };

  return loadingQuery ? (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <Loading />
    </div>
  ) : (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel collapsible minSize={10} defaultSize={100}>
        <StreetViewer toggleMapPanel={toggleMapPanel} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        collapsible
        minSize={10}
        defaultSize={0}
        ref={mapPanelRef}
      >
        <MapViewer />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
