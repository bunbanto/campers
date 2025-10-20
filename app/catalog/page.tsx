'use client';
import { useEffect } from 'react';
import { Filters, useStore } from '@/store/useStore';
import CamperCard from '@/components/CamperCard';
import styles from './page.module.css';

import CatalogSidebar from '@/components/CatalogSidebar';
import Button from '@/components/UI/Button/button';
// import CatalogList from '@/components/CatalogList';

export default function CatalogPage() {
  const { campers, loadCampers, loading } = useStore();

  useEffect(() => {
    if (campers.length === 0) loadCampers();
  }, [campers.length, loadCampers]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.filters}>
          <CatalogSidebar
            onApply={(filters: Filters) => {
              console.log('Applying filters from CatalogPage:', filters);
            }}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {loading && campers.length === 0 && <p>Loading...</p>}

          {campers.map(camper => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
          <Button
            onClick={() => loadCampers(true)}
            disabled={loading}
            text="Load More"
            className={styles.loadMoreButton}
          />
          {loading ? 'Loading...' : ''}
        </div>
      </div>
    </main>
  );
}
