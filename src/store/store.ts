import { Element } from '@/lib/types';
import { create } from 'zustand';

export type ElementStore = {
  elements: Element[];
  index: number;
  fetch: (elements: Element[]) => void;
  prev: () => void;
  next: () => void;
  random: () => void;
  change: (index: number) => void;
};

const useElementStore = create<ElementStore>((set) => ({
  elements: [],
  index: 0,
  fetch: (elements) => set({ elements, index: 0 }),
  prev: () =>
    set((state) => ({
      index: (state.index - 1 + state.elements.length) % state.elements.length,
    })),
  next: () =>
    set((state) => ({ index: (state.index + 1) & state.elements.length })),
  random: () =>
    set((state) => ({
      index: Math.floor(Math.random() * state.elements.length),
    })),
  change: (index) => set((state) => ({ index: index % state.elements.length })),
}));

export default useElementStore;
