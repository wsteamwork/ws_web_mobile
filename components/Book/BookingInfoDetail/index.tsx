import { ReducersList } from '@/store/Redux/Reducers';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { formatMoney } from '@/utils/mixins';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import { Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import InfoRoom from './InfoRoom';
import SettingRoom from './SettingRoom';

const BookingInfoDetail: FC = (props) => {
  const { t } = useTranslation();
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.book.dataCalculate
  );
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.room);

  return (
    dataCalculate && (
      <Grid className="bookingInfoDetail">
        <Grid container spacing={2} className={'gridInfo'}>
          <Grid item xs={12}>
            <Paper className={'paperCustomOuter'}>
              <Paper className={'paperCustom'} square>
                <InfoRoom></InfoRoom>
                {!!dataCalculate && (
                  <Grid>
                    <Grid container spacing={2} className="timeCheck spaceTop">
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:checkInDate')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {moment.unix(dataCalculate.checkin).format(DEFAULT_DATE_TIME_FORMAT)}
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:checkOutDate')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {moment.unix(dataCalculate.checkout).format(DEFAULT_DATE_TIME_FORMAT)}
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:guestNumber')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {dataCalculate.number_of_guests} {t('book:bookingInfoDetail:guest')}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} className={'timeCheck spaceTop'}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:price')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {`${formatMoney(dataCalculate.price_original)}đ`}
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:serviceFee')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {`${formatMoney(
                            dataCalculate.service_fee +
                            dataCalculate.charge_additional_guest +
                            dataCalculate.charge_additional_hour
                          )}đ`}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} className={'spaceTop timeCheck'}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          <Typography variant="h6">{t('book:bookingInfoDetail:total')}</Typography>
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          <Typography variant="h6">{`${formatMoney(
                            dataCalculate.total_fee
                          )}đ`}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                <Grid className="spaceTop timeCheck">
                  <Typography className="spaceTop" variant="subtitle2">
                    {!!room && !!room.settings && `${room.settings.booking_cancel_text}`}{' '}
                    <SettingRoom></SettingRoom>
                  </Typography>
                </Grid>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export default memo(BookingInfoDetail);
