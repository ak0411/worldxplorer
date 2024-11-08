'use server';

import { Element } from '@/lib/types';

type State = {
  error: string | null;
  elements: Element[] | null;
};

export async function getElements(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const query =
      '[out:json][timeout:300];\n' + formData.get('query') + '\nout center;';
    console.info(query);
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: 'data=' + encodeURIComponent(query),
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

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return {
        error: `Failed to parse API response: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}. Response: ${responseText.substring(0, 200)}...`,
        elements: prevState.elements,
      };
    }

    if (!data?.elements) {
      return {
        error: 'Invalid API response format: missing elements array',
        elements: prevState.elements,
      };
    }

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
