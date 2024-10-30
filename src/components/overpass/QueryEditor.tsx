import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/index';
import Link from 'next/link';
import { ThemeToggle } from '../shared/ThemeToggle';
import { Resources } from './Resources';
import { Examples } from './Examples';

export default function QueryEditor({
  className,
  ...props
}: ComponentProps<'div'>) {
  const [value, setValue] = useState('');
  const { loadingQuery, setLoadingQuery } = useStore();

  const { setElements } = useStore();

  useEffect(() => {
    setValue(localStorage.getItem('queryValue') || '');
  }, []);

  const handleQuery = useCallback(async () => {
    localStorage.setItem('queryValue', value);
    const query = '[out:json][timeout:300];' + value + 'out center;';
    setLoadingQuery(true);
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
        .filter(
          (element: any) => element.type === 'node' || element.type === 'way'
        )
        .map((element: any) => ({
          id: element.id,
          lat: element.type === 'way' ? element.center.lat : element.lat,
          lng: element.type === 'way' ? element.center.lon : element.lon,
        })) as Element[];
      setElements(elements);
    } catch (error) {
      console.error('Error fetching Overpass data:', error);
      setElements([]);
    } finally {
      setLoadingQuery(false);
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
      <div className="flex flex-wrap justify-between">
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Button>
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex gap-2">
          <Resources />
          <Examples />
        </div>
      </div>
      <Textarea
        className="flex-grow bg-secondary p-2 text-lg"
        placeholder="Enter your query here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleQuery} variant="outline">
        {loadingQuery ? (
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
