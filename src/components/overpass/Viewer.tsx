import { useEffect, useRef } from 'react';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import dynamic from 'next/dynamic';
import { useElementStore } from '@/store/index';
import { Loader2 } from 'lucide-react';
import StreetViewer from '@/components/overpass/StreetViewer';
import { Button } from '@/components/ui/button';

const MapViewer = dynamic(() => import('@/components/overpass/MapViewer'), {
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
  const { loadingQuery } = useElementStore();

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
      <Button disabled>
        <Loader2 className="mr-2 size-4 animate-spin" />
        Loading...
      </Button>
    </div>
  ) : (
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
