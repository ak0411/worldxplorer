import { useEffect, useRef } from 'react';
import StreetViewer from '@/components/StreetViewer';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import MapViewer from '@/components/MapViewer';

export default function Viewer() {
  const panoPanelRef = useRef<ImperativePanelHandle>(null);
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
      <Panel
        collapsible
        minSize={10}
        defaultSize={100}
        ref={panoPanelRef}
        className="relative"
      >
        <StreetViewer toggleMapPanel={toggleMapPanel} />
      </Panel>
      <PanelResizeHandle />
      <Panel collapsible minSize={10} ref={mapPanelRef}>
        <MapViewer />
      </Panel>
    </PanelGroup>
  );
}
