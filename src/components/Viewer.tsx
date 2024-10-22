import { useEffect, useRef, useState } from 'react';
import StreetViewer from './StreetViewer';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { Element } from '@/lib/types';
import MapViewer from './MapViewer';

type Props = {
  elements: Element[];
};

export default function Viewer({ elements }: Props) {
  const [index, setIndex] = useState(0);
  const streetviewRef = useRef<ImperativePanelHandle>(null);
  const mapRef = useRef<ImperativePanelHandle>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [elements]);

  useEffect(() => {
    const checkMapSize = () => {
      if (mapRef.current && mapRef.current.getSize() === 0) {
        setIsMapExpanded(false);
      }
    };

    if (mapRef.current) {
      mapRef.current.collapse();

      const panelId = mapRef.current.getId();
      const panelElement = document.querySelector(
        `[data-panel-id="${panelId}"]`
      );

      const resizeObserver = new ResizeObserver(checkMapSize);
      if (panelElement) {
        resizeObserver.observe(panelElement);
      }

      return () => {
        if (panelElement) {
          resizeObserver.unobserve(panelElement);
        }
      };
    }
  }, [mapRef.current]);

  const collapseMapPanel = () => {
    const panel = mapRef.current;
    if (panel && (panel.isExpanded() || panel.getSize() > 0)) {
      panel.collapse();
      setIsMapExpanded(false);
    }
  };

  const expandMapPanel = () => {
    const panel = mapRef.current;
    if (panel && (panel.getSize() === 0 || panel.isCollapsed())) {
      panel.expand(10);
      setIsMapExpanded(true);
    }
  };

  const toggleMapPanel = () => {
    if (isMapExpanded) {
      collapseMapPanel();
    } else {
      expandMapPanel();
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
        <StreetViewer
          elements={elements}
          index={index}
          setIndex={setIndex}
          toggleMap={toggleMapPanel}
        />
      </Panel>
      <PanelResizeHandle />
      <Panel collapsible minSize={10} ref={mapRef}>
        <MapViewer elements={elements} onMarkerClick={setIndex} index={index} />
      </Panel>
    </PanelGroup>
  );
}
