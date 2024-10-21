'use client';

import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  setElements: Dispatch<SetStateAction<Element[]>>;
};

export default function QueryEditor({
  setElements,
  className,
  ...props
}: Props & ComponentProps<'div'>) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if window is defined to ensure we're in the browser
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('queryValue') || '';
      setValue(storedValue);
    }
  }, []);

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

        // Check if the character before the cursor is a tab or a space
        const beforeChar = value.slice(start - 1, start);
        if (beforeChar === '\t' || beforeChar === ' ') {
          let newStart = start - 1;

          // Remove leading spaces
          while (newStart > 0 && value[newStart - 1] === ' ') {
            newStart--;
          }

          const beforeTab = value.slice(0, newStart);
          const afterTab = value.slice(end);

          setValue(`${beforeTab}${afterTab}`);
          textarea.selectionStart = textarea.selectionEnd = newStart;
        }
      }
    },
    [value]
  );

  const handleQuery = useCallback(async () => {
    localStorage.setItem('queryValue', value);
    const query = '[out:json];' + value;
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
      const nodes = data.elements
        .filter((element: any) => element.type === 'node')
        .map((element: any) => ({
          id: element.id,
          lat: element.lat,
          lng: element.lon,
        }));
      setElements(nodes);
    } catch (error) {
      console.error('Error fetching Overpass data:', error);
    } finally {
      setLoading(false);
    }
  }, [value, setElements]);

  return (
    <div className={cn('flex h-full flex-col gap-2', className)} {...props}>
      <Textarea
        className="flex-grow bg-secondary p-2 text-lg"
        placeholder="Enter your Overpass QL query here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleQuery}>
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
