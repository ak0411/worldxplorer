/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { Element } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const useElements = () => {
  const [isPending, setIsPending] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  const fetchElements = async (query: string) => {
    try {
      setIsPending(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const modifiedQuery =
        '[out:json][timeout:300];\n' + query + '\nout center;';
      console.info(modifiedQuery);
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data=' + encodeURIComponent(modifiedQuery),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        handleError(response.status);
        return null;
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
          tags: element.tags,
        })) as Element[];

      return elements;
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast({
          description: err.message,
        });
      } else {
        toast({
          description: 'An unexpected error occurred',
        });
      }
      return null;
    } finally {
      setIsPending(false);
    }
  };

  const handleError = (status: number) => {
    if (status === 400) {
      toast({
        description:
          'Invalid query format. Please check your syntax and try again.',
      });
    } else if (status === 429) {
      toast({
        description: 'Too many requests. Please wait a moment and try again.',
      });
    } else if (status === 504) {
      toast({
        description:
          'Query timed out. Try simplifying your query or reducing the area.',
      });
    } else {
      toast({
        description: `Server error (${status}). Please try again later.`,
      });
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsPending(false);
    }
  };

  return { fetchElements, handleCancel, isPending };
};
