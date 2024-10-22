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
  const streetviewRef = useRef<ImperativePanelHandle>(null);
  const mapRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.collapse();
    }
  }, []);

  const toggleMapPanel = () => {
    const panel = mapRef.current;
    if (panel) {
      if (panel.isCollapsed()) {
        panel.expand();
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
        ref={streetviewRef}
        className="relative"
      >
        <StreetViewer toggleMapPanel={toggleMapPanel} />
      </Panel>
      <PanelResizeHandle />
      <Panel collapsible minSize={10} ref={mapRef}>
        <MapViewer />
      </Panel>
    </PanelGroup>
  );
}
