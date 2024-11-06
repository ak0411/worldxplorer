'use client';

import { useEffect, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Element } from '@/lib/types';
import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Resources } from '@/components/overpass/Resources';
import { Examples } from '@/components/overpass/Examples';
import { getElements } from '@/app/overpass/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

type QueryEditorProps = {
  setElements: (elements: Element[]) => void;
  initialQuery: string;
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

export default function QueryEditor({
  setElements,
  initialQuery,
}: QueryEditorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction] = useFormState(getElements, initialState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state.elements) {
      setElements(state.elements);
    }
  }, [state.elements, setElements]);

  useEffect(() => {
    if (initialQuery) {
      startTransition(() => {
        const formData = new FormData();
        formData.set('query', initialQuery);
        formAction(formData);
      });
    }
  }, []);

  const handleFormAction = (formData: FormData) => {
    setElements([]);
    const params = new URLSearchParams(searchParams.toString());
    const query = formData.get('query') as string;
    if (!query.trim()) {
      router.replace('/overpass/v2');
    } else {
      formAction(formData);
      params.set('query', encodeURIComponent(query));
      params.set('index', '0');
      router.push(`?${params.toString()}`, { scroll: false });
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
          defaultValue={initialQuery}
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