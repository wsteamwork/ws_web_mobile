import { ReducersList } from '@/store/Redux/Reducers';
import '@/styles/pages/book/bookingCalendar/LTDatePicker.scss';
import { LTRoomAvailableRes } from '@/types/Requests/Rooms/RoomResponses';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import * as _ from 'lodash';
import moment, { Moment } from 'moment';
import React, { FC, memo,useState } from 'react';
import {
  FocusedInputShape,
  DayPickerSingleDateController
} from 'react-dates';
import 'react-dates/initialize';
import {useSelector } from 'react-redux';
import { LTBookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
interface IProps {
  date?: Moment;
  setDate?: any;
  focusedInput?: FocusedInputShape | null;
  setFocusedInput?: any;
  booking: LTBookingIndexRes;
  dataBlock: any;
}
const DateRangeMoveout: FC<IProps> = (props) => {
  const { date, setDate} = props;
  const availableDates = useSelector<ReducersList, LTRoomAvailableRes>(
    (state) => state.ltroomPage.availableDates
  );
  const isDayBlocked = (day: Moment) => {
    let arrayBlockedDates = availableDates.move_in.map((dateBlock) => dateBlock.date);
    let isBlocked = _.indexOf(arrayBlockedDates, day.format(DEFAULT_DATE_FORMAT)) !== -1;
    return isBlocked;
  };
  const isOutsideRange = (day: Moment) => day.diff(moment(), 'days') < 0;
  const [focused, setFocused] = useState<boolean>(true);
  return (
    <DayPickerSingleDateController
      numberOfMonths={1}
      onDateChange={(date) => setDate(date)}
      onFocusChange={({ focused }) => setFocused(focused)}
      focused={focused}
      date={date}
      isDayBlocked={isDayBlocked}
      isOutsideRange={isOutsideRange}
    />
  );
};

export default memo(DateRangeMoveout);
