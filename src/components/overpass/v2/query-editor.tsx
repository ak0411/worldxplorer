'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';
import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Resources } from '@/components/overpass/Resources';
import { Examples } from '@/components/overpass/Examples';
import {
  defaultOverpassState,
  useOverpassState,
} from '@/hooks/use-overpass-state';
import { useElements } from '@/hooks/use-elements';

type QueryEditorProps = {
  setElements: Dispatch<SetStateAction<Element[] | null>>;
  collapseQueryEditorPanel: () => void;
};

export default function QueryEditor({
  setElements,
  collapseQueryEditorPanel,
}: QueryEditorProps) {
  const { overpassState, setOverpassState } = useOverpassState();
  const [query, setQuery] = useState(overpassState.query);
  const { fetchElements, handleCancel, isPending } = useElements();

  const fetchData = async () => {
    if (query.trim()) {
      const elements = await fetchElements(query);
      if (elements && elements.length > 0) {
        collapseQueryEditorPanel();
        setOverpassState({ index: overpassState.index || 0 });
      } else {
        setOverpassState(defaultOverpassState);
      }
      setElements(elements);
    } else {
      setElements(null);
      setOverpassState(defaultOverpassState);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto fetch if query is present in the URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    setOverpassState({ query });
    fetchData();
  };

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
    <div className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Button>
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-wrap gap-2">
          <Resources />
          <Examples />
        </div>
      </div>
      <Textarea
        className="flex-grow bg-secondary p-2 text-lg focus-visible:ring-transparent"
        placeholder="Enter your query here..."
        onKeyDown={handleKeyDown}
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isPending}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={isPending}
          onClick={handleClick}
          className="flex-grow"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Run Query'
          )}
        </Button>
        {isPending && (
          <Button variant="destructive" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
