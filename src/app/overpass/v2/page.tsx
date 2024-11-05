'use client';

import QueryEditor from '@/components/overpass/v2/QueryEditor';
import StreetViewer from '@/components/overpass/v2/StreetViewer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Element } from '@/lib/types';
import { getStreetViewable } from '@/utils/getStreetViewable';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Overpass() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams.get('query') ?? '');
  const index = parseInt(searchParams.get('index') ?? '0');
  const streetViewSource = (searchParams.get('streetViewSource') ??
    'default') as google.maps.StreetViewSource;
  const pos = searchParams.get('pos');

  const [elements, setElements] = useState<Element[]>([]);

  const updatePosition = async (elementIndex: number) => {
    if (elements.length > 0) {
      const validPos = await getStreetViewable(
        elements[elementIndex].lat,
        elements[elementIndex].lng,
        streetViewSource
      );

      const params = new URLSearchParams(searchParams.toString());
      if (validPos) {
        const posString = `${validPos.lat},${validPos.lng}`;
        params.set('index', elementIndex.toString());
        params.set('streetViewSource', streetViewSource as string);
        params.set('pos', posString as string);
      } else {
        params.delete('pos');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (elements[index]) {
      updatePosition(index);
    } else if (elements.length > 0) {
      updatePosition(0);
    }
  }, [index, streetViewSource, elements]);

  return (
    <div className="h-screen p-2">
      <ResizablePanelGroup direction="horizontal" className="flex gap-2">
        <ResizablePanel collapsible minSize={15} defaultSize={30}>
          <QueryEditor setElements={setElements} initialQuery={query} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel collapsible minSize={30} defaultSize={70}>
          <StreetViewer
            elements={elements}
            index={index}
            streetViewSource={streetViewSource}
            pos={pos}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
