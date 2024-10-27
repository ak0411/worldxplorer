import { getStreetViewable } from '@/utils/getStreetViewable';
import { Element } from '@/lib/types';
import { create } from 'zustand';

type ElementStore = {
  elements: Element[] | null;
  currentIndex: number;
  loadingQuery: boolean;
  fetchElements: (elements: Element[]) => void;
  prev: () => void;
  next: () => void;
  random: () => void;
  access: (index: number) => void;
  setLoadingQuery: (isLoading: boolean) => void;
};

export const useElementStore = create<ElementStore>((set) => ({
  elements: null,
  currentIndex: 0,
  loadingQuery: false,
  fetchElements: (elements) => set({ elements, currentIndex: 0 }),
  prev: () =>
    set((state) => {
      if (state.elements) {
        return {
          currentIndex:
            (state.currentIndex - 1 + state.elements.length) %
            state.elements.length,
        };
      }
      return state;
    }),
  next: () =>
    set((state) => {
      if (state.elements) {
        return {
          currentIndex: (state.currentIndex + 1) % state.elements.length,
        };
      }
      return state;
    }),
  random: () =>
    set((state) => {
      if (state.elements) {
        return {
          currentIndex: Math.floor(Math.random() * state.elements.length),
        };
      }
      return state;
    }),
  access: (index) =>
    set((state) => {
      if (state.elements) {
        return { currentIndex: index % state.elements.length };
      }
      return state;
    }),
  setLoadingQuery: (loading) => set({ loadingQuery: loading }),
}));

type StreetViewerStore = {
  streetViewer: google.maps.LatLngLiteral | null;
  streetViewSource: google.maps.StreetViewSource | null;
  currentPlace: google.maps.LatLngLiteral | null;
  setStreetViewer: (pos: google.maps.LatLngLiteral) => void;
  setStreetViewSource: (source: google.maps.StreetViewSource) => void;
  setCurrentPlace: (latLng: google.maps.LatLngLiteral) => void;
};

export const useStreetViewerStore = create<StreetViewerStore>((set, get) => ({
  streetViewer: null,
  streetViewSource: null,
  currentPlace: null,
  setStreetViewer: async (pos) => {
    const currentSource = get().streetViewSource;
    const location = await getStreetViewable(pos.lat, pos.lng, currentSource);
    set({ streetViewer: location });
  },
  setStreetViewSource: async (source) => {
    const { currentPlace } = get();
    set({ streetViewSource: source });
    if (currentPlace) {
      const location = await getStreetViewable(
        currentPlace.lat,
        currentPlace.lng,
        source
      );
      set({ streetViewer: location });
    }
  },
  setCurrentPlace: async (latLng) => {
    set({ currentPlace: latLng });
    get().setStreetViewer(latLng);
  },
}));
