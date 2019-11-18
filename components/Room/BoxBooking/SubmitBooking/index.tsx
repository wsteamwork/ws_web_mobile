import ButtonGlobal from '@/components/ButtonGlobal';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import { Grid } from '@material-ui/core';
import { OfflineBoltRounded } from '@material-ui/icons';
import moment from 'moment';
import Router from 'next/router';
import React, { FC, memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const SubmitBooking: FC = () => {
  const { state } = useContext(RoomDetailsContext);
  const { error, dataCalculate } = state;
  const { t } = useTranslation();

  const handleSubmit = () => {
    const query = {
      booking_type: dataCalculate.booking_type,
      checkin: moment.unix(dataCalculate.checkin).format(DEFAULT_DATE_TIME_FORMAT),
      checkout: moment.unix(dataCalculate.checkout).format(DEFAULT_DATE_TIME_FORMAT),
      coupon: '',
      number_of_guests: dataCalculate.number_of_guests,
      room_id: dataCalculate.room_id
    };

    Router.push({
      pathname: '/book',
      query
    });
  };

  return (
    <Grid className="boxBooking__buttonSubmit">
      <ButtonGlobal onClick={handleSubmit} disabled={!!error} padding="0px" width="100%">
        <p className="flex_center" style={{ color: '#ffffff' }}>
          <OfflineBoltRounded></OfflineBoltRounded>&nbsp;&nbsp;{t('room:boxBooking:bookNow')}
        </p>
      </ButtonGlobal>
    </Grid>
  );
};

export default memo(SubmitBooking);
