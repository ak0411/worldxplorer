'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';

type Props = {
  setElements: Dispatch<SetStateAction<Element[]>>;
};

export default function QueryEditor({ setElements }: Props) {
  // Update function signature
  const [value, setValue] = useState(
    'area["ISO3166-1"="TH"]->.a;\n\nnode["tourism"="viewpoint"](area.a);\n'
  );
  const [loading, setLoading] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Regular Tab insertion
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        const beforeTab = value.slice(0, start);
        const afterTab = value.slice(end);

        setValue(`${beforeTab}\t${afterTab}`);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }

      // Shift + Tab: Remove tab
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();

        // Only remove tab if there's one before the cursor
        if (value.slice(start - 1, start) === '\t') {
          const beforeTab = value.slice(0, start - 1);
          const afterTab = value.slice(end);

          setValue(`${beforeTab}${afterTab}`);
          textarea.selectionStart = textarea.selectionEnd = start - 1;
        }
      }
    },
    [value]
  );

  const handleQuery = useCallback(async () => {
    const query = '[out:json];' + value + 'out body;>;out skel qt;';
    setLoading(true);
    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.info(data);
      const nodes = data.elements.filter(
        (element: any) => element.type === 'node'
      );
      setElements(nodes);
    } catch (error) {
      console.error('Error fetching Overpass data:', error);
    } finally {
      setLoading(false);
    }
  }, [value, setElements]);

  return (
    <div className="flex h-full flex-col gap-2">
      <Textarea
        className="flex-grow bg-secondary p-2 text-lg"
        placeholder="Enter your Overpass QL query here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleQuery} className="w-fit self-center">
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Run Query'
        )}
      </Button>
    </div>
  );
}
