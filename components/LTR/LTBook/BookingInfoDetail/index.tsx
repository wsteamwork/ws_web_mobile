import { ReducersList } from '@/store/Redux/Reducers';
import { LTBookingReducerState } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import { LTBookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { formatMoney } from '@/utils/mixins';
import { Grid, Paper, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import InfoRoom from './InfoRoom';
import SettingRoom from './SettingRoom';

const BookingInfoDetail: FC = () => {
  const { t } = useTranslation();
  // const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const LTBookingPriceCalculate = useSelector<ReducersList, LTBookingPriceCalculatorRes>(
    (state) => state.ltBooking.LTBookingPriceCalculate
  );
  const { movein, moveout, numberOfGuests } = useSelector<ReducersList, LTBookingReducerState>(
    (state) => state.ltBooking
  );

  return (
    LTBookingPriceCalculate && (
      <Grid className="bookingInfoDetail">
        <Grid container spacing={2} className={'gridInfo'}>
          <Grid item xs={12}>
            <Paper className={'paperCustomOuter'}>
              <Paper className={'paperCustom'} square>
                <InfoRoom></InfoRoom>
                {!!LTBookingPriceCalculate && (
                  <Grid>
                    <Grid container spacing={2} className="timeCheck spaceTop">
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:checkInDate')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {movein}
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:checkOutDate')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {moveout}
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          Số ngày ở
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {LTBookingPriceCalculate.range_stay} ngày
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {t('book:bookingInfoDetail:guestNumber')}
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {numberOfGuests} {t('book:bookingInfoDetail:guest')}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} className={'timeCheck spaceTop'}>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {/* {t('book:bookingInfoDetail:price')} */}
                          Giá gốc
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {`${formatMoney(LTBookingPriceCalculate.price_original)}đ`}
                        </Grid>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLowTitle'}>
                          {/* {t('book:bookingInfoDetail:serviceFee')} */}
                          Giá đặt cọc
                        </Grid>
                        <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                          {/* {`${formatMoney(
                            dataCalculate.service_fee +
                              dataCalculate.charge_additional_guest +
                              dataCalculate.charge_additional_hour
                          )}đ`} */}
                          {`${formatMoney(LTBookingPriceCalculate.deposit)}đ`}
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
                            LTBookingPriceCalculate.price_with_fee
                          )}đ`}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                <Grid className="spaceTop timeCheck">
                  <Typography className="spaceTop" variant="subtitle2">
                    {/* {!!room && !!room.settings && `${room.settings.booking_cancel_text}`}{' '} */}
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
