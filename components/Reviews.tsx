'use client';
// import { useState } from 'react';
import styles from './Reviews.module.css';
import type { Camper } from '@/types/camper';
import StarRating from './UI/Rating';

interface ReviewsProps {
  camper: Camper;
}

export default function Reviews({ camper }: ReviewsProps) {
  return (
    <div className={styles.content}>
      {camper?.reviews?.length ? (
        camper.reviews.map((review, idx) => (
          <div key={idx} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.avatar}>{review.reviewer_name[0]}</div>
              <div className={styles.reviewerInfo}>
                <strong className={styles.reviewerName}>
                  {review.reviewer_name}
                </strong>
                <StarRating rating={review.reviewer_rating} />
              </div>
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
}
