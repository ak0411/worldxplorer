import { getStreetViewable } from '@/utils/getStreetViewable';
import { Element } from '@/lib/types';
import { create } from 'zustand';

type Store = {
  elements: Element[] | null;
  currentIndex: number;
  loadingQuery: boolean;
  streetViewer: google.maps.LatLngLiteral | null;
  streetViewSource: google.maps.StreetViewSource | null;
  setElements: (elements: Element[]) => void;
  prev: () => void;
  next: () => void;
  random: () => void;
  access: (index: number) => void;
  setLoadingQuery: (isLoading: boolean) => void;
  setStreetViewer: (latLng: google.maps.LatLngLiteral) => void;
  setStreetViewSource: (source: google.maps.StreetViewSource) => void;
};

export const useStore = create<Store>((set, get) => ({
  elements: null,
  currentIndex: 0,
  loadingQuery: false,
  streetViewer: null,
  streetViewSource: null,
  setElements: (elements) =>
    set((state) => {
      return {
        elements,
        currentIndex: 0,
        streetViewer:
          elements.length > 0
            ? {
                lat: elements[state.currentIndex].lat,
                lng: elements[state.currentIndex].lng,
              }
            : null,
      };
    }),
  prev: () =>
    set((state) => {
      if (state.elements) {
        const newIndex =
          (state.currentIndex - 1 + state.elements.length) %
          state.elements.length;
        get().setStreetViewer({
          lat: state.elements[newIndex].lat,
          lng: state.elements[newIndex].lng,
        });
        return { currentIndex: newIndex };
      }
      return state;
    }),
  next: () =>
    set((state) => {
      if (state.elements) {
        const newIndex = (state.currentIndex + 1) % state.elements.length;
        get().setStreetViewer({
          lat: state.elements[newIndex].lat,
          lng: state.elements[newIndex].lng,
        });
        return { currentIndex: newIndex };
      }
      return state;
    }),
  random: () =>
    set((state) => {
      if (state.elements) {
        const newIndex = Math.floor(Math.random() * state.elements.length);
        get().setStreetViewer({
          lat: state.elements[newIndex].lat,
          lng: state.elements[newIndex].lng,
        });
        return { currentIndex: newIndex };
      }
      return state;
    }),
  access: (index) =>
    set((state) => {
      if (state.elements) {
        const newIndex = index % state.elements.length;
        get().setStreetViewer({
          lat: state.elements[newIndex].lat,
          lng: state.elements[newIndex].lng,
        });
        return { currentIndex: newIndex };
      }
      return state;
    }),
  setLoadingQuery: (loading) => set({ loadingQuery: loading }),
  setStreetViewer: async (latLng) => {
    const { streetViewSource } = get();
    const location = await getStreetViewable(
      latLng.lat,
      latLng.lng,
      streetViewSource
    );
    set({ streetViewer: location });
  },
  setStreetViewSource: async (source) => {
    const { elements, currentIndex } = get();
    if (elements && elements[currentIndex]) {
      const location = await getStreetViewable(
        elements[currentIndex].lat,
        elements[currentIndex].lng,
        source
      );
      set({ streetViewer: location, streetViewSource: source });
    }
  },
}));
