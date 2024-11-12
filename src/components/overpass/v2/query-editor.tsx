'use client';

import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
} from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';
import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Resources } from '@/components/overpass/Resources';
import { Examples } from '@/components/overpass/Examples';
import { getElements } from '@/app/(modes)/overpass/actions';
import {
  defaultOverpassState,
  useOverpassState,
} from '@/hooks/use-overpass-state';

type QueryEditorProps = {
  setElements: Dispatch<SetStateAction<Element[] | null>>;
};

const initialState = {
  error: null,
  elements: null,
};

export default function QueryEditor({ setElements }: QueryEditorProps) {
  const [state, formAction, isPending] = useActionState(
    getElements,
    initialState
  );

  const { overpassState, setOverpassState } = useOverpassState();

  useEffect(() => {
    if (overpassState.query.trim()) {
      startTransition(() => {
        const formData = new FormData();
        formData.set('query', overpassState.query as string);
        formAction(formData);
      });
    }
    // Initialize when visiting the page with query is passed in the URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setElements(state.elements);
  }, [setElements, state.elements]);

  const handleFormAction = (formData: FormData) => {
    const query = formData.get('query');

    if (query && (query as string).trim()) {
      setOverpassState({ ...defaultOverpassState, query: query as string });
      formAction(formData);
    }
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
      <form action={handleFormAction} className="flex h-full flex-col gap-4">
        <Textarea
          className="flex-grow bg-secondary p-2 text-lg focus-visible:ring-transparent"
          placeholder="Enter your query here..."
          onKeyDown={handleKeyDown}
          defaultValue={overpassState.query}
          name="query"
          disabled={isPending}
        />
        {state.error && (
          <div className="rounded-md bg-destructive/15 p-3 text-destructive">
            {state.error}
          </div>
        )}
        <Button type="submit" variant="outline" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Run Query'
          )}
        </Button>
      </form>
    </div>
  );
}
