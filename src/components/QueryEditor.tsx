'use client';

import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';
import { cn } from '@/lib/utils';
import useElementStore from '@/store/store';

export default function QueryEditor({
  className,
  ...props
}: ComponentProps<'div'>) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const { fetch: init } = useElementStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('queryValue') || '';
      setValue(storedValue);
    }
  }, []);

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
      const elements = data.elements
        .filter((element: any) => element.type === 'node')
        .map((element: any) => ({
          id: element.id,
          lat: element.lat,
          lng: element.lon,
        })) as Element[];
      init(elements);
    } catch (error) {
      console.error('Error fetching Overpass data:', error);
    } finally {
      setLoading(false);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    if (e.key === 'Tab') {
      e.preventDefault();

      const cursorPosition = e.currentTarget.selectionStart;
      const tab = '\t';

      e.currentTarget.value =
        value.substring(0, cursorPosition) +
        tab +
        value.substring(e.currentTarget.selectionEnd);

      e.currentTarget.selectionStart = cursorPosition + 1;
      e.currentTarget.selectionEnd = cursorPosition + 1;
    }
  };

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
