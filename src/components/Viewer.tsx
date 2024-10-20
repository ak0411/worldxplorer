import React, { useEffect, useRef, useState } from 'react';
import StreetViewer from './StreetViewer';
import MapViewer from './MapViewer';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { Element } from '@/lib/types';

type Props = {
  elements: Element[];
};

export default function Viewer({ elements }: Props) {
  const [index, setIndex] = useState(0);
  const ref = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    setIndex(0);
    const panel = ref.current;
    if (panel && elements.length > 0) {
      panel.resize(40);
    }
  }, [elements]);

  return (
    <PanelGroup direction="vertical">
      <Panel collapsible minSize={10} defaultSize={60}>
        <StreetViewer elements={elements} index={index} setIndex={setIndex} />
      </Panel>
      <PanelResizeHandle />
      <Panel collapsible minSize={10} defaultSize={40}>
        <MapViewer elements={elements} onMarkerClick={setIndex} index={index} />
      </Panel>
    </PanelGroup>
  );
}
