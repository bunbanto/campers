import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import { FC } from 'react';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat?: string;
  placeholder?: string;
  className?: string;
}

export const CustomDatePicker: FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder = 'Booking date*',
}) => {
  return (
    <div className={styles.datePickerContainer}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        className={styles.datePickerInput}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};
