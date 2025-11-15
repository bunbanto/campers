import React from 'react';
import css from './banner.module.css';
import Button from './UI/Button/button';

export default function Banner() {
  return (
    <section className={css.banner}>
      <div className={css.hero} />

      <div className={css.content}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <h2 className={css.text}>
          You can find everything you want in our catalog.
        </h2>

        <Button text="View Now" route="/catalog" />
      </div>
    </section>
  );
}
