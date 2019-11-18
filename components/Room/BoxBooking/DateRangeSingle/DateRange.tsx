import { ReducersList } from '@/store/Redux/Reducers';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { Grid } from '@material-ui/core';
import { Moment } from 'moment';
import React, { FC, memo, useMemo } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import { useSelector } from 'react-redux';
import { useDateRange } from './context';
import RenderDay from './RenderDay';

const DateRange: FC = (props) => {
  const {
    date,
    onClose,
    onDatesChange,
    onFocusChange,
    isOutsideRange,
    isDayBlocked,
    onNextMonthClick,
    focused
  } = useDateRange();
  const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
    (state) => state.roomPage.priceByDay
  );
  const _renderDayContents = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay} />;

  const _renderMonthText = (day: Moment) => (
    <p className="datePickerBooking__monthText">{day.format('MMMM YYYY')}</p>
  );

  return useMemo(
    () => (
      <Grid className="datePickerBooking">
        <DateRangePicker
          transitionDuration={300}
          numberOfMonths={1}
          startDateId="startDate"
          endDateId="endDate"
          startDate={date.startDate}
          endDate={date.endDate}
          onDatesChange={onDatesChange}
          // onClose={onClose}
          focusedInput={focused}
          onFocusChange={onFocusChange}
          isDayBlocked={isDayBlocked}
          isOutsideRange={isOutsideRange}
          // renderMonthText={_renderMonthText}
          onNextMonthClick={onNextMonthClick}
          renderDayContents={_renderDayContents}
          hideKeyboardShortcutsPanel
          minimumNights={0}
          noBorder={true}
          displayFormat="ddd, DD/MM/YYYY"
          readOnly
        />
      </Grid>
    ),
    [date, focused, isDayBlocked]
  );
};

export default memo(DateRange);
