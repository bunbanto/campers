'use client';
import Image from 'next/image';
import type { CampImages } from '@/types/camper';
import styles from './CamperGallery.module.css';

interface CamperGalleryProps {
  images: CampImages[];
}

export function CamperGallery({ images }: CamperGalleryProps) {
  if (!images || images.length === 0) {
    return <p>There are no photos for this camper.</p>;
  }

  return (
    <div className={styles.gallery}>
      {images.map((img, idx) => (
        <div key={idx} className={styles.imageWrapper}>
          <Image
            src={img.thumb}
            alt={`Camper image ${idx + 1}`}
            width="280"
            height="200"
            className={styles.image}
            loading={idx === 0 ? 'eager' : 'lazy'} // first image is faster
          />
        </div>
      ))}
    </div>
  );
}
