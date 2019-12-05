import { ReducersList } from '@/store/Redux/Reducers';
import { LTBookingReducerState } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import { LTBookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { formatMoney } from '@/utils/mixins';
import { Grid, Collapse, Typography, IconButton } from '@material-ui/core';
import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import InfoRoom from './InfoRoom';
import SettingRoom from './SettingRoom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';

const BookingInfoDetail: FC = () => {
  const { t } = useTranslation();
  const LTBookingPriceCalculate = useSelector<ReducersList, LTBookingPriceCalculatorRes>(
    (state) => state.ltBooking.LTBookingPriceCalculate
  );
  const { movein, moveout, numberOfGuests } = useSelector<ReducersList, LTBookingReducerState>(
    (state) => state.ltBooking
  );
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    LTBookingPriceCalculate && (
      <div className="bookingInfoDetail">
        <InfoRoom/>

        {!!LTBookingPriceCalculate && (
          <Grid>
            <Grid container spacing={1} className={'boxInfoCus'}>
              <Grid item xs={4}>
                <Typography variant='subtitle2' align={'left'} gutterBottom className={'titleInfo'}>
                  {t('book:bookingInfoDetail:checkInDate')}
                </Typography>
                <Typography align={'left'} variant='subtitle1'>
                  {movein}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' align={'center'} gutterBottom className={'titleInfo'}>
                  {t('book:bookingInfoDetail:checkOutDate')}
                </Typography>
                <Typography align={'center'} variant='subtitle1'>
                  {moveout}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' align={'right'} gutterBottom className={'titleInfo'}>
                  {t('book:bookingInfoDetail:guestNumber')}
                </Typography>
                <Typography align={'right'} variant='subtitle1'>
                  {numberOfGuests} khách
                </Typography>
              </Grid>
            </Grid>

            <Collapse in={expanded}>
              <Grid container spacing={2} className={'spaceTop'}>
                <Grid item xs={6} className={'fontLowTitle'}>
                   {t('book:bookingInfoDetail:priceOriginal')}
                </Grid>
                <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                  {`${formatMoney(LTBookingPriceCalculate.price_original)}`}
                </Grid>
                <Grid item xs={6} className={'fontLowTitle'}>
                   {t('book:bookingInfoDetail:priceDeposit')}
                </Grid>
                <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                  {`${formatMoney(LTBookingPriceCalculate.deposit)}`}
                </Grid>
              </Grid>
            </Collapse>

            <Grid container spacing={1} justify='space-between' alignItems='center' onClick={()=>setExpanded(!expanded)} className={'spaceTop'}>
              <Grid item>
                <Typography variant="subtitle1">
                  {t('book:bookingInfoDetail:total')}&nbsp;
                  {`${formatMoney(LTBookingPriceCalculate.price_with_fee)}`}&nbsp;{t('home:currency')}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton>
                  {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid className="spaceTop timeCheck">
          <Typography className="spaceTop" variant="subtitle2">
            <SettingRoom/>
          </Typography>
        </Grid>
      </div>
    )
  );
};

export default memo(BookingInfoDetail);
