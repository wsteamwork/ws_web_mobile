import { ReducersList } from '@/store/Redux/Reducers';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DateRange from './DateRange';
import DateSingle from './DateSingle';

const DateRangeSingle = () => {
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);

  return useMemo(() => (bookingType === 2 ? <DateRange></DateRange> : <DateSingle></DateSingle>), [
    bookingType
  ]);
};

export default DateRangeSingle;
