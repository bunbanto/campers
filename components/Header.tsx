'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/img/TravelTrucks.svg"
          alt="Camper Logo"
          width={136}
          height={15}
        />
      </Link>

      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.textLink} ${
            pathname === '/' ? styles.active : ''
          }`}
        >
          Home
        </Link>

        <Link
          href="/catalog"
          className={`${styles.textLink} ${
            pathname === '/catalog' ? styles.active : ''
          }`}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}
