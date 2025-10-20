'use client';
import { useEffect } from 'react';
import { getCampers } from '@/lib/api';
import { useStore } from '@/store/useStore';
import CatalogSidebar from '@/components/CatalogSidebar';
import CamperCard from '@/components/CamperCard';

export default function CatalogPage() {
  const {
    campers,
    page,
    limit,
    filters,
    appendCampers,
    setCampers,
    incrementPage,
    setLoading,
    resetCampersAndSetFilters,
  } = useStore();

  // fetch function
  const fetchCampers = async (isLoadMore = false) => {
    try {
      setLoading(true);
      // Формуємо params: бекенд повинен фільтрувати
      const params: Record<
        string,
        string | number | boolean | string[] | undefined
      > = { page, limit };
      if (filters.location) params.location = filters.location;
      if (filters.form) params.form = filters.form;
      if (filters.features?.length) {
        // кожен фіт як окремий query: AC=true, kitchen=true
        filters.features.forEach((f: string) => {
          params[f] = true;
        });
      }
      const data = await getCampers(params);
      if (isLoadMore) appendCampers(data);
      else setCampers(data);
    } finally {
      setLoading(false);
    }
  };

  // Завантаження на зміну фільтрів або першого рендера
  useEffect(() => {
    // при зміні filters ми маємо почати з page=1 і очистити попередні результати:
    // Використовуй resetCampersAndSetFilters(filters) коли фільтри змінюються з сайдбару
    fetchCampers(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]); // page змінюється при Load More

  const handleLoadMore = () => {
    incrementPage();
  };

  return (
    <div className="catalog-page">
      <CatalogSidebar
        onApply={newFilters => resetCampersAndSetFilters(newFilters)}
      />
      <div className="catalog-list">
        {campers.map(c => (
          <CamperCard key={c.id} camper={c} />
        ))}
        <button onClick={handleLoadMore}>Load more</button>
      </div>
    </div>
  );
}
