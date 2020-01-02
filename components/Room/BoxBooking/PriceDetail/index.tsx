import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Grid, Typography } from '@material-ui/core';
import numeral from 'numeral';
import React, { FC, memo, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const PriceDetail: FC = () => {
  const { state } = useContext(RoomDetailsContext);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const { dataCalculate } = state;
  const { t } = useTranslation();

  return useMemo(
    () =>
      room && (
        <Grid container className="priceDetail">
          {!!dataCalculate && dataCalculate.days >= 5 ? (
            <Grid className="priceDetail__avg">
              <p>
                {t('room:boxBooking:average')} {t('room:currency')}{numeral(dataCalculate.avg_price).format('0,0')}/{t('room:boxBooking:day')}
              </p>
            </Grid>
          ) : (
              <Grid container>
                <Grid item xs={room.price_hour !== 0 && room.rent_type !== 2 ? 4 : 6} className="priceDetail__priceDay flex_center">
                  <p>
                    {t('room:currency')}{numeral(
                      room.is_discount === 1 ? room.price_day_discount : room.price_day
                    ).format('0,0')}{' '}
                    /{t('room:boxBooking:day')}
                  </p>
                </Grid>

                {room.price_hour !== 0 && room.rent_type !== 2 && (
                  <Grid item xs={4} className="priceDetail__priceHour flex_center">
                    <p>
                      {t('room:currency')}{numeral(
                        room.is_discount === 1 ? room.price_hour_discount : room.price_hour
                      ).format('0,0')}{' '}/4{t('room:boxBooking:hours')}
                    </p>
                  </Grid>
                )}
                <Grid item xs={room.price_hour !== 0 && room.rent_type !== 2 ? 4 : 6} className="priceDetail__priceDay flex_center">
                  <Typography variant="subtitle2">
                    <a target="_blank" href={`/long-term-room/${room.id}`}>
                      {t('shared:viewMonthlyPrice')}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            )}
        </Grid>
      ),
    [t, room, dataCalculate]
  );
};

export default memo(PriceDetail);
