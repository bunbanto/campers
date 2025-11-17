'use client';
import { useEffect } from 'react';
import { Filters, useStore } from '@/store/useStore';
import CamperCard from '@/components/CamperCard';
import styles from './page.module.css';

import CatalogSidebar from '@/components/CatalogSidebar';
import Loader from '@/components/Loader';

export default function CatalogPage() {
  const { campers, loadCampers, loading, resetCampersAndSetFilters, hasMore } =
    useStore();

  useEffect(() => {
    if (campers.length === 0) loadCampers();
  }, [campers.length, loadCampers]);

  return (
    <main>
      <div className={styles.container}>
        <CatalogSidebar
          onApply={(filters: Filters) => {
            resetCampersAndSetFilters(filters);
            loadCampers(false);
          }}
        />

        <div className={styles.cards}>
          {/* Перший лоадер */}
          {loading && campers.length === 0 && <p>Loading...</p>}

          {/* Список кемперів */}
          {campers.map(camper => (
            <CamperCard key={camper.id} camper={camper} />
          ))}

          {/* Кнопка Load More */}
          {hasMore && !loading && (
            <div className={styles.loadMoreBtn}>
              <button
                onClick={() => loadCampers(true)}
                className={styles.loadMoreButton}
              >
                Load More
              </button>
            </div>
          )}

          {/* Loader під час дозавантаження */}
          {loading && campers.length > 0 && <Loader />}
        </div>
      </div>
    </main>
  );
}
