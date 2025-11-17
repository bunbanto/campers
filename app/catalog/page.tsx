'use client';
import { useEffect } from 'react';
import { Filters, useStore } from '@/store/useStore';
import CamperCard from '@/components/CamperCard';
import styles from './page.module.css';

import CatalogSidebar from '@/components/CatalogSidebar';
// import Button from '@/components/UI/Button/button';
// import CatalogList from '@/components/CatalogList';

export default function CatalogPage() {
  const { campers, loadCampers, loading, resetCampersAndSetFilters } =
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
          {loading && campers.length === 0 && <p>Loading...</p>}

          {campers.map(camper => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
          <div className={styles.loadMoreBtn}>
            <button
              onClick={() => loadCampers(true)}
              className={styles.loadMoreButton}
            >
              Load More
            </button>
          </div>
          {loading ? 'Loading...' : ''}
        </div>
      </div>
    </main>
  );
}
