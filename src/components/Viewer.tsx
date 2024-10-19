import React, { useEffect, useState } from 'react';
import StreetViewer from './StreetViewer';
import MapViewer from './MapViewer';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Element } from '@/lib/types';

type Props = {
  elements: Element[];
};

export default function Viewer({ elements }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [elements]);

  return (
    <PanelGroup direction="vertical">
      <Panel collapsible minSize={10} defaultSize={60}>
        <StreetViewer elements={elements} index={index} setIndex={setIndex} />
      </Panel>
      <PanelResizeHandle />
      <Panel collapsible minSize={10} defaultSize={40}>
        <MapViewer elements={elements} onMarkerClick={setIndex} />
      </Panel>
    </PanelGroup>
  );
}
