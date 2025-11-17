'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCamperById } from '../../../lib/api';
import { Camper } from '../../../types/camper';
import CamperDetails from '../../../components/CamperDetails';
import BookingForm from '../../../components/BookingForm';
import Reviews from '../../../components/Reviews';
import styles from './page.module.css';
import { TAGS } from '@/app/constants/camper';
import Image from 'next/image';
import Loader from '@/components/Loader';

export default function CamperPage() {
  const params = useParams();
  const id = params.id;
  const [camper, setCamper] = useState<Camper | null>(null);
  const [tab, setTab] = useState<'features' | 'reviews'>('features');

  useEffect(() => {
    (async () => {
      const data = await getCamperById(id as string);
      setCamper(data);
    })();
  }, [id]);

  if (!camper)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{camper.name}</h1>
      <CamperDetails camper={camper} />
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'features' ? styles.active : ''}`}
          onClick={() => setTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${tab === 'reviews' ? styles.active : ''}`}
          onClick={() => setTab('reviews')}
        >
          Reviews
        </button>
      </div>
      <div className={styles.tabContent}>
        {tab === 'features' && (
          <div className={styles.features}>
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
            <div className={styles.detailsBox}>
              <h3>Vehicle details</h3>
              <ul>
                <li>
                  <span>Form</span>
                  <span>{camper.form}</span>
                </li>
                <li>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </li>
                <li>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </li>
                <li>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </li>
                <li>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </li>
                <li>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {tab === 'reviews' && <Reviews camper={camper} />}
        <BookingForm camperId={camper.id} camperName={camper.name} />
      </div>
    </div>
  );
}
