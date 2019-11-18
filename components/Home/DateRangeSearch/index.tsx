/* eslint react/no-multi-comp:0, no-console:0 */

import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import { Grid, InputBase, Paper } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import moment, { Moment } from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/vi';
import Calendar from 'rc-calendar';
import enGB from 'rc-calendar/lib/locale/en_GB';
import viVN from 'rc-calendar/lib/locale/vi_VN';
import DatePicker from 'rc-calendar/lib/Picker';
import React, { Dispatch, FC, memo, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

interface IProps {
  isDisablePastDay?: boolean;
}
const cookies = new Cookies();
const format = 'YYYY-MM-DD';
type Language = 'vi' | 'en';
const vi: Language = cookies.get('initLanguage') || 'vi';
const now = moment();

if (vi === 'vi') {
  now.locale('vi').utcOffset(7);
} else {
  now.locale('en-gb').utcOffset(0);
}

type Field = 'startValue' | 'endValue';

const DateRangeSearch: FC<IProps> = (props) => {
  const { isDisablePastDay } = props;
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const startDate = useSelector<ReducersList, string | null>(
    (state) => state.searchFilter.startDate
  );
  const endDate = useSelector<ReducersList, string | null>((state) => state.searchFilter.endDate);
  const [startValue, setStartValue] = useState(startDate ? moment(startDate) : null);
  const [endValue, setEndValue] = useState(endDate ? moment(endDate) : null);
  const refEndDate = useRef(null);
  const { t } = useTranslation();

  const numberDay: number = useMemo(() => {
    if (startValue && endValue) {
      const startDate = moment(startValue);
      const endDate = moment(endValue);

      return Math.abs(startDate.diff(endDate, 'days'));
    }

    return 0;
  }, [endValue, startValue]);

  const onChange = (field: Field, value: Moment) => {
    if (field === 'startValue') {
      setStartValue(value);
      refEndDate.current.click();
    } else {
      setEndValue(value);
      dispatch({ type: 'SET_START_DATE', payload: startValue.format(DEFAULT_DATE_TIME_FORMAT) });
      dispatch({ type: 'SET_END_DATE', payload: value.format(DEFAULT_DATE_TIME_FORMAT) });
    }
  };

  const disabledEndDate = (endValue: Moment) => {
    if (!endValue) {
      return endValue.diff(moment(), 'days') <= -1;
    }
    if (!startValue) {
      return endValue.diff(moment(), 'days') <= -1;
    }
    return endValue.diff(startValue, 'days') <= 0;
  };

  const disabledStartDate = (startValue: Moment) => {
    // if (!startValue) {
    //   return startValue.diff(moment(), 'days') <= -1;
    // }
    // if (!endValue) {
    //   return startValue.diff(moment(), 'days') <= -1;
    // }
    // return endValue.diff(startValue, 'days') <= 0;
    if(isDisablePastDay) {
      return startValue.diff(moment(), 'days') <= -1;
    }
  };

  const calendarStart = (
    <Calendar
      locale={vi === 'en' ? enGB : viVN}
      showDateInput={false}
      defaultValue={now}
      disabledDate={disabledStartDate}
      showToday={false}
    />
  );

  const calendarEnd = (
    <Calendar
      locale={vi === 'en' ? enGB : viVN}
      showDateInput={false}
      defaultValue={now}
      disabledDate={disabledEndDate}
      showToday={false}
    />
  );

  return (
    <Paper elevation={0} className="dateRangeSearch">
      <Grid container>
        <Grid item xs={5} className="calendar">
          <DatePicker
            animation="slide-up"
            calendar={calendarStart}
            value={startValue}
            onChange={(value) => onChange('startValue', value)}>
            {({ value }) => {
              return (
                <Grid container>
                  <Grid item xs={3} className="icon">
                    <CalendarToday fontSize="small"></CalendarToday>
                  </Grid>

                  <Grid item xs={9}>
                    <InputBase
                      placeholder="Ngày đến"
                      fullWidth
                      className="input"
                      inputProps={{ style: { padding: 0 } }}
                      readOnly
                      value={(value && `${value.format(format)}`) || ''}
                    />
                    {value && <p className="day">{value.format('dddd')}</p>}
                  </Grid>
                </Grid>
              );
            }}
          </DatePicker>
        </Grid>

        <Grid item xs={2} className="numberDay">
          <p>{numberDay}-N</p>
        </Grid>

        <Grid item xs={5} className="calendar">
          <DatePicker
            animation="slide-up"
            calendar={calendarEnd}
            value={endValue}
            onChange={(value) => onChange('endValue', value)}>
            {({ value }) => {
              return (
                <Grid container>
                  <Grid item xs={3} className="icon">
                    <CalendarToday fontSize="small"></CalendarToday>
                  </Grid>

                  <Grid item xs={9}>
                    <InputBase
                      ref={refEndDate}
                      placeholder={t('home:checkout')}
                      fullWidth
                      className="input"
                      inputProps={{ style: { padding: 0 } }}
                      readOnly
                      value={(value && `${value.format(format)}`) || ''}
                    />
                    {value && <p className="day">{value.format('dddd')}</p>}
                  </Grid>
                </Grid>
              );
            }}
          </DatePicker>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default memo(DateRangeSearch);
