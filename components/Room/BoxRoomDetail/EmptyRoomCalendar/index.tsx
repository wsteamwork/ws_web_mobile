import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import moment, { Moment } from 'moment';
import React, { FC, Fragment, memo, useContext, useMemo } from 'react';
import { DayPickerRangeController } from 'react-dates';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDateRange } from '../../BoxBooking/DateRangeSingle/context';
import RenderDay from '../../BoxBooking/DateRangeSingle/RenderDay';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 700,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    }
  })
);
interface IProps {
  classes?: any;
}

const EmptyRoomCalendar: FC<IProps> = (props) => {
  const dateStart = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const dateEnd = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const { isDayBlocked, isOutsideRange, onNextMonthClick } = useDateRange();
  const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
    (state) => state.roomPage.priceByDay
  );
  const _renderDayContents = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay} />;
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const classes = useStyles(props);

  let widthCalendar: number;
  switch (width) {
    case 'xl': widthCalendar = 50;
      break;
    case 'lg': widthCalendar = 45;
      break;
    case 'md': widthCalendar = 45;
      break;
    case 'sm': widthCalendar = 45;
      break;
    default: widthCalendar = 38;
  }

  return useMemo(
    () => (
      <Fragment>
        <Typography variant="h5" className={classes.name}>
          {t('rooms:emptyCalender')}
        </Typography>
        <Grid className="EmptyRoomCalendar">
          <DayPickerRangeController
            daySize={widthCalendar}
            startDate={!!dateStart ? moment(dateStart) : moment()}
            endDate={!!dateEnd ? moment(dateEnd) : null}
            onDatesChange={() => { }}
            // onNextMonthClick={onNextMonthClick}
            focusedInput={null}
            onFocusChange={null}
            isDayBlocked={isDayBlocked}
            numberOfMonths={width === 'xs' ? 1 : 2}
            isOutsideRange={isOutsideRange}
            hideKeyboardShortcutsPanel
            renderDayContents={_renderDayContents}
            noBorder
          />
        </Grid>
      </Fragment>
    ),
    [dateEnd, dateStart, width]
  );
};

export default memo(EmptyRoomCalendar);
