'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from './UI/Button/button';
import styles from './BookingForm.module.css';
import { CustomDatePicker } from './UI/DatePicker/DatePicker';

export default function BookingForm({
  camperId,
  camperName,
}: {
  camperId: number;
  camperName: string;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date | null>(null);
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
    setDate(null as Date | null);
    setComment('');
  };

  return (
    <div className={styles.container}>
      <h3>Book your campervan now</h3>
      <p className={styles.text}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name*"
          required
          className={styles.orderForm}
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email*"
          required
          className={styles.orderForm}
        />
        <CustomDatePicker
          selectedDate={date}
          onChange={(date: Date | null) => setDate(date)}
          // placeholder="Booking date*"
          // className={styles.orderForm}
          // dateFormat="yyyy-MM-dd"
        />
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={5}
          placeholder="Comment"
          className={styles.orderForm}
        />

        <Button text="Send" />
      </form>
    </div>
  );
}
