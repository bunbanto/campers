'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Camper } from '../types/camper';
import { formatPrice } from '../utils/format';
import { useStore } from '../store/useStore';
import styles from './CamperCard.module.css';
import Button from './UI/Button/button';
import StarRating from './UI/Rating';
import { TAGS } from '@/app/constants/camper';

export default function CamperCard({ camper }: { camper: Camper }) {
  const { favorites, toggleFavorite } = useStore();
  const fav = favorites.includes(camper.id.toString());

  const imageCamp = camper.gallery?.[0]?.thumb || '/no-image.png';

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageCamp}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
          priority
        />
      </div>
      <div className={styles.info}>
        <div className={styles.namePrice}>
          <h3>{camper.name}</h3>
          <p className={styles.price}>
            {formatPrice(camper.price)} €{' '}
            <button
              className={styles.favoriteBtn}
              onClick={() => toggleFavorite(camper.id.toString())}
              aria-label="Toggle Favorite"
            >
              <Image
                src={fav ? 'img/heart.svg' : 'img/heartred.svg'}
                alt="favorite"
                width={20}
                height={20}
              />
            </button>
          </p>
        </div>
        <div className={styles.rating}>
          <div className={styles.ratingWrapper}>
            <StarRating rating={camper.rating} single />

            {camper.rating ? camper.rating.toFixed(1) : 'N/A'}
            {camper.reviews ? ` (${camper.reviews.length} Reviews)` : 'Reviews'}
          </div>
          <Image
            src={'/img/map.svg'}
            alt="map"
            width={16}
            height={16}
            className={styles.map}
          />
          <p>{camper.location}</p>
        </div>
        <p className={styles.description}>
          {camper.description.slice(0, 64)}...
        </p>
        <div className={styles.tags}>
          {TAGS.map(({ key, label, icon }) => {
            if (!camper[key as keyof typeof camper]) return null;
            return (
              <span key={key} className={styles.tag}>
                <Image
                  src={icon}
                  alt={label}
                  width={16}
                  height={16}
                  className={styles.tagIcon}
                />
                {label}
              </span>
            );
          })}
        </div>
        <div>
          <Link href={`/catalog/${camper.id}`}>
            <Button text="Show more" />
          </Link>
        </div>
      </div>
    </div>
  );
}
