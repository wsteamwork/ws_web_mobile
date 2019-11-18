import React, { FC, useMemo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import moment from 'moment';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

const DirectPayment: FC = () => {
  const { t } = useTranslation();
  const dataInvoice = useSelector<ReducersList, PaymentBankListRes>(
    (state) => state.book.dataInvoice
  );
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.dataInvoice.room.data);

  const numberDay = useMemo<number>(() => {
    const number = moment(dataInvoice.checkout).diff(moment(dataInvoice.checkin), 'day');
    if (number == 0) {
      return 1;
    }

    return number;
  }, [dataInvoice]);

  return (
    <Grid>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">{t('payment:directPayment:bookingInfo')}</Typography>

          <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:codeBooking')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>
                <span style={{ textTransform: 'uppercase' }}>#{dataInvoice.uuid}</span>
              </p>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <p>{t('payment:directPayment:dateCreated')}</p>
            </Grid>
            <Grid item xs={9} className="textRight">
              <p>{moment(dataInvoice.created_at).format('MMMM Do YYYY, h:mm (dddd)')}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Grid item xs={12} md={3} className="margintop">
          <Grid container spacing={1}>
            <Typography variant="h6">{t('payment:directPayment:customerInfo')}</Typography>

            <Grid item container>
              <Grid item xs={6}>
                <p>{t('payment:directPayment:guestName')}</p>
              </Grid>
              <Grid item xs={6} className="textRight">
                <p>{dataInvoice.name}</p>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <p>Email:</p>
              </Grid>
              <Grid item xs={6} className="textRight">
                <p>{dataInvoice.email}</p>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <p>{t('payment:directPayment:phoneNumber')}</p>
              </Grid>
              <Grid item xs={6} className="textRight">
                <p>{dataInvoice.phone.substr(0, 7)}xxx</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} className="margintop">
          <Grid container spacing={1}>
            <Typography variant="h6">{t('payment:directPayment:billInfo')}</Typography>

            <Grid item container>
              <Grid item xs={6}>
                <p>{t('payment:directPayment:payment')}</p>
              </Grid>
              <Grid item xs={6} className="textRight">
                <p>{t('payment:directPayment:transfer')}</p>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <p>{t('payment:directPayment:transferInfo')}</p>
              </Grid>
              <Grid item xs={6} className="textRight">
                <p>{t('payment:directPayment:details')}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className="margintop">
        <Grid item xs={12} md={4}>
          <Typography variant="h6">{t('payment:directPayment:bookingInfo1')}</Typography>

          <Grid item container>
            <Grid item xs={6}>
              <p>{t('payment:directPayment:guestNumber')}</p>
            </Grid>
            <Grid item xs={6} className="textRight">
              <p>
                {dataInvoice.number_of_guests} {t('payment:directPayment:guest')}
              </p>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              <p>{t('payment:directPayment:checkIn')}</p>
            </Grid>
            <Grid item xs={6} className="textRight">
              <p>{dataInvoice.checkin}</p>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={6}>
              <p>{t('payment:directPayment:checkOut')}</p>
            </Grid>
            <Grid item xs={6} className="textRight">
              <p>{dataInvoice.checkout}</p>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={6}>
              <p>{t('payment:directPayment:numberOfNight')}</p>
            </Grid>
            <Grid item xs={6} className="textRight">
              <p>
                {numberDay} {t('payment:directPayment:night')}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className="margintop">
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t('payment:directPayment:apartmentInfo')}</Typography>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <img
                className="image"
                src={`${IMAGE_STORAGE_LG}${room.media.data[0].image}`}
                alt={room.details.data[0].name}
              />
            </Grid>
            <Grid item xs={8}>
              <Grid>
                <p className="nameRoom">{room.details.data[0].name}</p>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="1x"></FontAwesomeIcon>{' '}
                  {room.district.data.name}, {room.city.data.name}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className="margintop">
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t('payment:directPayment:transferMoneyInfo')}</Typography>

          <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:accountNumber')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>19033679869996</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:bank')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>Teckcombank</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:branch')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>Hà Nội</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:accountHolder')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>Lưu Thị Linh Trang</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:contentMoney')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>
                Thanh toán mã booking{' '}
                <span style={{ textTransform: 'uppercase' }}>#{dataInvoice.uuid}</span> số tiền:{' '}
                {numeral(dataInvoice.total_fee).format('0,0')}đ
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className="margintop">
        <Grid item xs={12} md={6}></Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t('payment:directPayment:roomRateBook')}</Typography>

          <Grid container>
            <Grid item xs={5}>
              <p>
                {t('payment:directPayment:roomRate')} {numberDay} {t('payment:directPayment:night')}
                :
              </p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>{numeral(dataInvoice.price_original).format('0,0')}đ</p>
            </Grid>
          </Grid>
          {/* <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:surcharge')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>{numeral(dataInvoice.service_fee).format('0,0')}đ</p>
            </Grid>
          </Grid> */}
          <Grid container>
            <Grid item xs={5}>
              <p>{t('payment:directPayment:totalRevenue')}</p>
            </Grid>
            <Grid item xs={7} className="textRight">
              <p>{numeral(dataInvoice.total_fee).format('0,0')}đ</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" className="margintop">
        <b>{t('payment:directPayment:desfooter')}</b>
      </Grid>
    </Grid>
  );
};

export default DirectPayment;
