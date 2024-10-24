import { useEffect, useRef } from 'react';
import StreetViewer from '@/components/StreetViewer';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import dynamic from 'next/dynamic';

const MapViewer = dynamic(() => import('@/components/MapViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-muted/30">
      <div className="animate-pulse text-lg text-muted-foreground">
        Loading map...
      </div>
    </div>
  ),
});

export default function Viewer() {
  const mapPanelRef = useRef<ImperativePanelHandle>(null);

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

  return (
    <PanelGroup direction="vertical">
      <Panel collapsible minSize={10} defaultSize={100}>
        <StreetViewer toggleMapPanel={toggleMapPanel} />
      </Panel>
      <PanelResizeHandle />
      <Panel collapsible minSize={10} defaultSize={0} ref={mapPanelRef}>
        <MapViewer />
      </Panel>
    </PanelGroup>
  );
}
