'use client';
import { useState } from 'react';
import { Filters } from '../store/useStore';
import styles from './CatalogSidebar.module.css';
import Image from 'next/image';
import Button from './UI/Button/button';

export default function CatalogSidebar({
  onApply,
}: {
  onApply: (f: Filters) => void;
}) {
  const [location, setLocation] = useState('');
  const [form, setForm] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [transmission, setTransmission] = useState('');

  const toggleFeature = (name: string) => {
    setFeatures(prev =>
      prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    );
  };

  const toggleForm = (name: string) => {
    setForm(prev => (prev === name ? '' : name));
  };

  const handleSearch = () => {
    onApply({ location, form, features });
  };

  return (
    <aside className={styles.sidebar}>
      {/* Location */}
      <div className={styles.block}>
        <h2 className={styles.labelloc}>Location</h2>
        <div className={styles.locationInput}>
          <Image src={'/img/map.svg'} alt="Map" width={20} height={20} />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Kyiv, Ukraine"
          />
        </div>
      </div>
      {/* Filters */}
      <h3 className={styles.subtitle}>Filters</h3>
      <div className={styles.block}>
        <h3 className={styles.label}>Vehicle equipment</h3>
        <div className={styles.grid}>
          <button
            className={`${styles.iconButton} ${
              features.includes('AC') ? styles.active : ''
            }`}
            onClick={() => toggleFeature('AC')}
          >
            <Image src={'/img/ac.svg'} alt="AC" width={32} height={32} />
            <span>AC</span>
          </button>

          <button
            className={`${styles.iconButton} ${
              features.includes('TV') ? styles.active : ''
            }`}
            onClick={() => toggleFeature('TV')}
          >
            <Image src={'/img/tv.svg'} alt="TV" width={32} height={32} />
            <span>TV</span>
          </button>

          <button
            className={`${styles.iconButton} ${
              transmission === 'automatic' ? styles.active : ''
            }`}
            onClick={() =>
              setTransmission(prev => (prev === 'automatic' ? '' : 'automatic'))
            }
          >
            <Image src={'/img/auto.svg'} alt="Auto" width={32} height={32} />
            <span>Automatic</span>
          </button>

          <button
            className={`${styles.iconButton} ${
              features.includes('kitchen') ? styles.active : ''
            }`}
            onClick={() => toggleFeature('kitchen')}
          >
            <Image
              src={'/img/cup-hot.svg'}
              alt="Kitchen"
              width={32}
              height={32}
            />
            <span>Kitchen</span>
          </button>

          <button
            className={`${styles.iconButton} ${
              features.includes('bathroom') ? styles.active : ''
            }`}
            onClick={() => toggleFeature('bathroom')}
          >
            <Image
              src={'/img/bath.svg'}
              alt="Bathroom"
              width={32}
              height={32}
            />
            <span>Bathroom</span>
          </button>
        </div>
      </div>
      {/* Vehicle type */}
      <div className={styles.block}>
        <h3 className={styles.label}>Vehicle type</h3>
        <div className={styles.grid}>
          <button
            className={`${styles.iconButton} ${
              form === 'panelTruck' ? styles.active : ''
            }`}
            onClick={() => toggleForm('panelTruck')}
          >
            <Image src="/img/van.svg" alt="Van" width={32} height={32} />
            <span>Van</span>
          </button>

          <button
            className={`${styles.iconButton} ${
              form === 'fullyIntegrated' ? styles.active : ''
            }`}
            onClick={() => toggleForm('fullyIntegrated')}
          >
            <Image
              src="/img/full.svg"
              alt="Fully Integrated"
              width={32}
              height={32}
            />
            <span>Fully Integrated</span>
          </button>

          <button
            className={`${styles.iconButton} ${
              form === 'alcove' ? styles.active : ''
            }`}
            onClick={() => toggleForm('alcove')}
          >
            <Image src="/img/alcove.svg" alt="Alcove" width={32} height={32} />
            <span>Alcove</span>
          </button>
        </div>
      </div>
      <div className={styles.search}>
        <Button onClick={handleSearch} text="Search" />
      </div>
    </aside>
  );
}
