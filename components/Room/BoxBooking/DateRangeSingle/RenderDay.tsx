import { GlobalContext } from '@/store/Context/GlobalContext';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { Grid, Typography } from '@material-ui/core';
import { Moment } from 'moment';
import React, { FC, Fragment, useContext, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { changeDataPriceByDay } from './context';

interface Iprops {
  day: Moment;
  priceByDay?: PriceByDayRes[];
}

const RenderDay: FC<Iprops> = (props) => {
  // const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
  //   (state) => state.roomPage.priceByDay
  // );
  const { priceByDay } = props;
  const { width } = useContext(GlobalContext);
  const { day } = props;
  const dataPriceByDay = priceByDay
    ? useMemo(() => changeDataPriceByDay(priceByDay), [priceByDay])
    : null;
  const cookies = new Cookies();
  const lang = cookies.get('initLanguage');
  const date = day.format(DEFAULT_DATE_FORMAT);
  return (
    <Grid className="dayContents">
      <Typography style={{ fontSize: 16, fontWeight: 300 }}>
        {day.date()}
      </Typography>

      {dataPriceByDay && dataPriceByDay[date] ? (
        <Fragment>
          <span className="dayContents__price">{lang === 'vi' ? `${dataPriceByDay[date].price_day / 1000000}TR}` : `$${dataPriceByDay[date].price_day}`}</span>
        </Fragment>
      ) : (
          ''
        )}
    </Grid>
  );
};

export default RenderDay;
