import React from 'react';
import css from './banner.module.css';
import Button from './UI/Button/button';

export default function Banner() {
  return (
    <section className={css.hero}>
      <div className="bg-black/40 absolute inset-0" />

      <div className={css.title}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Explore the World with Comfort
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Choose your perfect camper and start your adventure today.
        </p>

        <Button text="View Now" route="/catalog" />
      </div>
    </section>
  );
}
