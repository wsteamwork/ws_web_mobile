import CustomPopper from '@/components/CustomPopper';
import mainColor from '@/styles/constants/colors';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import numeral from 'numeral';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  dataCalculate: BookingPriceCalculatorRes;
}

const DetailsPriceService: FC<IProps> = (props) => {
  const { dataCalculate } = props;
  const { t } = useTranslation();

  return (
    <CustomPopper
      arrow
      placement="top"
      content={
        <Grid className="detailsFeeService">
          <Grid className="detailsFeeService__title">
            <p>{t('room:boxBooking:otherService')}</p>
          </Grid>

          <Grid container className="detailsFeeService__priceDay">
            <Grid item xs={8} className="detailsFeeService__textLeft">
              <p>{t('room:boxBooking:serviceFee')} </p>
            </Grid>
            <Grid item xs={4} className="detailsFeeService__textRight">
              <p>{numeral(dataCalculate.service_fee).format('0,0')}đ</p>
            </Grid>
          </Grid>

          <Grid container className="detailsFeeService__priceDay">
            <Grid item xs={8} className="detailsFeeService__textLeft">
              <p>{t('room:boxBooking:chargeAddGuest')} </p>
            </Grid>
            <Grid item xs={4} className="detailsFeeService__textRight">
              <p>{numeral(dataCalculate.charge_additional_guest).format('0,0')}đ</p>
            </Grid>
          </Grid>

          <Grid container className="detailsFeeService__priceDay">
            <Grid item xs={8} className="detailsFeeService__textLeft">
              <p>{t('room:boxBooking:chargeAddHour')} </p>
            </Grid>
            <Grid item xs={4} className="detailsFeeService__textRight">
              <p>{numeral(dataCalculate.charge_additional_hour).format('0,0')}đ</p>
            </Grid>
          </Grid>
        </Grid>
      }>
      <span>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          size="1x"
          color={mainColor.primary}></FontAwesomeIcon>
      </span>
    </CustomPopper>
  );
};

export default DetailsPriceService;
