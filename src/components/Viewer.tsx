'use client';

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

  useEffect(() => {
    setIndex(0);
    if (streetviewRef.current && mapRef.current && elements.length > 0) {
      streetviewRef.current.resize(60);
      mapRef.current.resize(40);
    }
  }, [elements]);

  return (
    <PanelGroup direction="vertical">
      <Panel collapsible minSize={10} defaultSize={100} ref={streetviewRef}>
        <StreetViewer elements={elements} index={index} setIndex={setIndex} />
      </Panel>
      <PanelResizeHandle />
      <Panel collapsible minSize={10} defaultSize={0} ref={mapRef}>
        <MapViewer elements={elements} onMarkerClick={setIndex} index={index} />
      </Panel>
    </PanelGroup>
  );
}
