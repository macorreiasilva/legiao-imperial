import { create } from "zustand";

interface UIState {
  isOnboardingCompleted: boolean;
  selectedCategory: string | null;
  setOnboardingCompleted: (completed: boolean) => void;
  setSelectedCategory: (category: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isOnboardingCompleted: false,
  selectedCategory: null,
  setOnboardingCompleted: (completed) =>
    set({ isOnboardingCompleted: completed }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
