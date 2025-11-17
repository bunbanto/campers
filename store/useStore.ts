import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper } from '../types/camper';
import { getCampers } from '../lib/api'; // ← функція для запиту з бекенда

export type Filters = {
  location?: string;
  form?: string; // тип кузова
  features?: string[]; // ['AC','kitchen']
};

type State = {
  campers: Camper[];
  page: number;
  limit: number;
  totalLoaded: number;
  filters: Filters;
  favorites: string[];
  loading: boolean;
  setFilters: (f: Filters) => void;
  resetCampersAndSetFilters: (f: Filters) => void;
  appendCampers: (items: Camper[]) => void;
  setCampers: (items: Camper[]) => void;
  incrementPage: () => void;
  setLoading: (v: boolean) => void;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  loadCampers: (loadMore?: boolean) => Promise<void>; // ✅ новий метод
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      campers: [],
      page: 1,
      limit: 4,
      totalLoaded: 0,
      filters: {},
      favorites: [],
      loading: false,

      setFilters: f => set({ filters: { ...get().filters, ...f } }),
      resetCampersAndSetFilters: f =>
        set({ filters: { ...f }, campers: [], page: 1, totalLoaded: 0 }),
      appendCampers: items =>
        set(s => ({
          campers: [...s.campers, ...items],
          totalLoaded: s.totalLoaded + items.length,
        })),
      setCampers: items => set({ campers: items, totalLoaded: items.length }),
      incrementPage: () => set(s => ({ page: s.page + 1 })),
      setLoading: v => set({ loading: v }),
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

      // ✅ Додаємо логіку завантаження кемперів
      loadCampers: async (loadMore = false) => {
        const { page, limit, filters, campers } = get();

        set({ loading: true });

        try {
          const nextPage = loadMore ? page + 1 : 1;
          const featureParams: any = {};
          if (filters.features && Array.isArray(filters.features)) {
            filters.features.forEach(f => {
              featureParams[f] = true;
            });
          }
          const newCampers = await getCampers({
            page: nextPage,
            limit,
            location: filters.location,
            form: filters.form,
            ...featureParams,
          });

          set({
            campers: loadMore ? [...campers, ...newCampers] : newCampers,
            page: nextPage,
            totalLoaded: loadMore
              ? campers.length + newCampers.length
              : newCampers.length,
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
