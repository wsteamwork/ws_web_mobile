import { ReducersList } from '@/store/Redux/Reducers';
import '@/styles/Airbnb/date-picker-single.scss';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { Grid } from '@material-ui/core';
import { Moment } from 'moment';
import React, { memo, useMemo, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { useSelector } from 'react-redux';
import { useDateRange } from './context';
import RenderDay from './RenderDay';

const DateSingle = () => {
  const [focused, setFocused] = useState(false);
  const { isOutsideRange, isDayBlocked, onChangeDateSingle, dateSingle } = useDateRange();
  const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
    (state) => state.roomPage.priceByDay
  );
  const _renderDayContents = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay} />;

  const _renderMonthText = (day: Moment) => (
    <p className="dateSingle__monthText">{day.format('MMMM YYYY')}</p>
  );

  const onFocusChange = ({ focused }: { focused: boolean | null }) => {
    setFocused(focused);
  };

  return useMemo(
    () => (
      <Grid className="dateSingle">
        <SingleDatePicker
          date={dateSingle}
          numberOfMonths={1}
          isOutsideRange={isOutsideRange}
          // renderMonthText={_renderMonthText}
          isDayBlocked={isDayBlocked}
          renderDayContents={_renderDayContents}
          transitionDuration={300}
          onDateChange={onChangeDateSingle}
          focused={focused}
          onFocusChange={onFocusChange}
          displayFormat="ddd, DD/MM/YYYY"
          hideKeyboardShortcutsPanel
          readOnly
          id="your_unique_id" />
      </Grid>
    ),
    [focused, dateSingle]
  );
};

export default memo(DateSingle);
