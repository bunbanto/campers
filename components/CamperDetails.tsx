import Image from 'next/image';
import { Camper } from '../types/camper';
import { CamperGallery } from './CamperGallery';
import styles from './CamperDetails.module.css';
import { formatPrice } from '@/utils/format';
import StarRating from './UI/Rating';

export default function CamperDetails({ camper }: { camper: Camper }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.rating}>
          <div className={styles.ratingWrapper}>
            <StarRating rating={camper.rating} single />
            {camper.rating ? camper.rating.toFixed(1) : 'N/A'}
            {camper.reviews ? ` (${camper.reviews.length} Reviews)` : 'Reviews'}

            <div className={styles.location}>
              <Image
                src={'/img/map.svg'}
                alt="map"
                width={16}
                height={16}
                className={styles.map}
              />
              <p>{camper.location}</p>
            </div>
          </div>
          <p className={styles.price}> €{formatPrice(camper.price)}</p>
        </div>
        <CamperGallery images={camper.gallery || []} />

        <p className={styles.description}>{camper.description}</p>
      </div>
    </>
  );
}
