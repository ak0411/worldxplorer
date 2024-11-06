'use client';

import { useEffect, useRef, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';
import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Resources } from '@/components/overpass/Resources';
import { Examples } from '@/components/overpass/Examples';
import { getElements } from '@/app/(modes)/overpass/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

type QueryEditorProps = {
  setElements: (elements: Element[]) => void;
};

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="outline" disabled={pending || disabled}>
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading...
        </>
      ) : (
        'Run Query'
      )}
    </Button>
  );
}

const initialState = {
  error: null,
  elements: [],
};

export default function QueryEditor({ setElements }: QueryEditorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction] = useFormState(getElements, initialState);
  const [isPending, startTransition] = useTransition();

  const encodedQuery = searchParams.get('encodedQuery');

  useEffect(() => {
    if (encodedQuery) {
      startTransition(() => {
        const formData = new FormData();
        formData.set('query', decodeURIComponent(encodedQuery));
        formAction(formData);
      });
    }
  }, []);

  useEffect(() => {
    setElements(state.elements);
  }, [state.elements]);

  const handleFormAction = async (formData: FormData) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = formData.get('query') as string;
    if (!query.trim()) {
      router.replace('/overpass/v2');
      setElements([]);
    } else {
      params.set('encodedQuery', encodeURIComponent(query));
      params.set('index', '0');
      router.replace(`?${params.toString()}`, { scroll: false });
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
          defaultValue={decodeURIComponent(encodedQuery ?? '')}
          name="query"
          disabled={isPending}
        />
        {state.error && (
          <div className="rounded-md bg-destructive/15 p-3 text-destructive">
            {state.error}
          </div>
        )}
        <SubmitButton disabled={isPending} />
      </form>
    </div>
  );
}
