import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper } from '../types/camper';
import { getCampers } from '../lib/api';

export type Filters = {
  location?: string;
  form?: string;
  features?: string[];
};

type State = {
  campers: Camper[];
  page: number;
  limit: number;
  totalLoaded: number;
  hasMore: boolean;
  filters: Filters;
  favorites: string[];
  loading: boolean;
  setFilters: (f: Filters) => void;
  resetCampersAndSetFilters: (f: Filters) => void;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  loadCampers: (loadMore?: boolean) => Promise<void>;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      campers: [],
      page: 1,
      limit: 4,
      totalLoaded: 0,
      hasMore: true,
      filters: {},
      favorites: [],
      loading: false,

      setFilters: f => set({ filters: { ...get().filters, ...f } }),

      resetCampersAndSetFilters: f =>
        set({
          filters: { ...f },
          campers: [],
          page: 1,
          totalLoaded: 0,
          hasMore: true, // ← скидаємо
        }),

      toggleFavorite: id =>
        set(s => {
          const exists = s.favorites.includes(id);
          return {
            favorites: exists
              ? s.favorites.filter(x => x !== id)
              : [...s.favorites, id],
          };
        }),

      clearFavorites: () => set({ favorites: [] }),

      // --------------------------
      // ЛОГІКА ЗАВАНТАЖЕННЯ КЕМПЕРІВ
      // --------------------------
      loadCampers: async (loadMore = false) => {
        const { page, limit, filters, campers } = get();

        set({ loading: true });

        try {
          const nextPage = loadMore ? page + 1 : 1;

          const featureParams: Record<string, boolean> = {};
          if (filters.features) {
            filters.features.forEach(f => (featureParams[f] = true));
          }

          const response = await getCampers({
            page: nextPage,
            limit,
            location: filters.location,
            form: filters.form,
            ...featureParams,
          });

          // якщо бек повертає масив newCampers
          const newCampers = response;

          const updatedCampers = loadMore
            ? [...campers, ...newCampers]
            : newCampers;

          // ❗ Важливо: якщо newCampers.length < limit → більше даних нема
          const hasMore = newCampers.length === limit;

          set({
            campers: updatedCampers,
            page: nextPage,
            // totalLoaded: updatedCampers.length,
            hasMore,
          });
        } catch (error) {
          console.error('Failed to load campers:', error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: 'traveltrucks-storage' }
  )
);
