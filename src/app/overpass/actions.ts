'use server';

import { Element } from '@/lib/types';

type State = {
  error: string | null;
  elements: Element[];
};

export async function getElements(
  prevState: State,
  formData: FormData,
  signal?: AbortSignal
): Promise<State> {
  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body:
        'data=' +
        encodeURIComponent(
          '[out:json][timeout:300];' + formData.get('query') + 'out center;'
        ),
    });

    if (!response.ok) {
      if (response.status === 400) {
        return {
          error:
            'Invalid query format. Please check your syntax and try again.',
          elements: prevState.elements,
        };
      }
      if (response.status === 429) {
        return {
          error: 'Too many requests. Please wait a moment and try again.',
          elements: prevState.elements,
        };
      }
      if (response.status === 504) {
        return {
          error:
            'Query timed out. Try simplifying your query or reducing the area.',
          elements: prevState.elements,
        };
      }

      return {
        error: `Server error (${response.status}). Please try again later. Details: ${response.statusText}`,
        elements: prevState.elements,
      };
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

    return { error: null, elements };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'An unexpected error occurred',
      elements: prevState.elements,
    };
  }
}
