import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { formatMoney } from '@/utils/mixins';
import { Button, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  dataBooking: BookingIndexRes;
}

const CardBooking: FC<IProps> = (props) => {
  const { dataBooking } = props;
  const room = useMemo<RoomIndexRes>(() => dataBooking.room.data, [dataBooking]);

  const { t } = useTranslation();

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12}>
        <Typography className={'titleMargin'}>
          <span className={'titleDetails'}>{t('profile:bookingProfile:roomInfo')}</span>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={4} lg={4}>
            <img
              alt="image room"
              src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${room.media.data[0].image}`}
              className={'imageRoom'}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            lg={6}
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start">
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">{room.details.data[0].name}</Typography>
              </Grid>
              <Grid item className={'rowMargin'}>
                <Rating value={room.avg_rating} color="#FFC412" readOnly size="small"></Rating>

                <span className={'spanViews'}>{room!.total_review} views</span>
              </Grid>
              <Grid item className={'rowMargin'}>
                <span className={'txtAddress'}>
                  <LocationOnOutlined className={'iconLocation'} />
                  {room.details.data[0].address}
                </span>
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item className={'rowMargin'}>
                {dataBooking.status_txt === '' ? (
                  ''
                ) : (
                    <Button variant="outlined" size="small" className={'btStatus'}>
                      {dataBooking.status_txt}
                    </Button>
                  )}
                {dataBooking.coupon_txt === '' ? (
                  ''
                ) : (
                    <Button variant="outlined" size="small" className={'btStatus'}>
                      {dataBooking.coupon_txt}
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography className={'titleMargin'}>
          <span className={'titleDetails'}>{t('profile:bookingProfile:customInfo')}</span>
        </Typography>
        <Grid container>
          <Grid item xs={12} sm>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:guestBook')} </span>
              <span>{dataBooking.name}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:guestPhone')} </span>
              <span>{dataBooking.phone}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:guestEmail')} </span>
              <span>{dataBooking.email}</span>
            </Typography>
            <Hidden smUp implementation="css">
              <Divider />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:guestReceived')} </span>
              <span>{dataBooking.name_received}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>
                {t('profile:bookingProfile:checkinGuestPhone')}{' '}
              </span>
              <span>{dataBooking.phone_received}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>
                {t('profile:bookingProfile:guestEmailReceived')}{' '}
              </span>
              <span>{dataBooking.email_received}</span>
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:note')} </span>
              <span>{dataBooking.note}</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography className={'titleMargin'}>
          <span className={'titleDetails'}>{t('profile:bookingProfile:billInfo')}</span>
        </Typography>
        <Grid container>
          <Grid item xs={12} sm>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:checkinDate')} </span>
              <span>{moment(dataBooking.checkin).format('DD-MM-YYYY, HH:mm A')}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:checkoutDate')} </span>
              <span>{moment(dataBooking.checkout).format('DD-MM-YYYY, HH:mm A')}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:paymentMethod')} </span>
              <span>{dataBooking.payment_method_txt}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:paymentStatus')} </span>
              <span>{dataBooking.payment_status_txt}</span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:guestNumber')} </span>
              <span>{dataBooking.number_of_guests}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:price')} </span>
              <span>{formatMoney(dataBooking.price_original)} </span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:serviceFee')} </span>
              <span>{formatMoney(dataBooking.service_fee)} </span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:reducedPrice')} </span>
              <span>{formatMoney(dataBooking.price_discount)} </span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:surcharge')} </span>
              <span>{formatMoney(dataBooking.additional_fee)} </span>
            </Typography>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:codeDiscount')} </span>
              <span>{formatMoney(dataBooking.coupon_discount)} </span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={'rowMargin'}>
              <span className={'contentDetails'}>{t('profile:bookingProfile:statusBooking')} </span>
              <span style={{ fontWeight: 700 }}>{dataBooking.total_txt}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider className={'rowMargin'} />
            <Typography variant="h5" align="right">
              {t('profile:bookingProfile:totalMoney')} {formatMoney(dataBooking.total_fee)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardBooking;
