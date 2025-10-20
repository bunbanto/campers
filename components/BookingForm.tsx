'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from './UI/Button/button';
import styles from './BookingForm.module.css';

export default function BookingForm({
  camperId,
  camperName,
}: {
  camperId: number;
  camperName: string;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ТУТ: відправити запит на бекенд бронювання (якщо є). Ми симулюємо.
    await new Promise(res => setTimeout(res, 700));
    console.log('Booking data:', {
      camperId,
      camperName,
      name,
      email,
      date,
      comment,
    });
    toast.success(`${camperId} Booking ${camperName} successful!`);
    setName('');
    setEmail('');
    setDate('');
    setComment('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        required
        className={styles.orderForm}
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        className={styles.orderForm}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
        className={styles.orderForm}
      />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Comment"
        className={styles.orderForm}
      />
      <Button text="Submit" />
    </form>
  );
}
