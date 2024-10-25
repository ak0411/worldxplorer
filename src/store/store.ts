import { Element } from '@/lib/types';
import { create } from 'zustand';

export type ElementStore = {
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

const useElementStore = create<ElementStore>((set) => ({
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

export default useElementStore;
