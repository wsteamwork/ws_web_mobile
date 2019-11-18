import CustomPopper from '@/components/CustomPopper';
import mainColor from '@/styles/constants/colors';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import numeral from 'numeral';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  dataCalculate: BookingPriceCalculatorRes;
  numberDay: number;
}

const DetailsPriceDay: FC<IProps> = (props) => {
  const { dataCalculate, numberDay } = props;
  const { t } = useTranslation();

  return (
    numberDay !== 0 && (
      <CustomPopper
        arrow
        placement="top"
        content={
          <Grid
            className={classNames('totalPriceRoom', { totalPriceRoom__widthBig: numberDay > 5 })}>
            <Grid className="totalPriceRoom__title">
              <p>{t('room:boxBooking:basePrice')}</p>
            </Grid>

            {numberDay <= 5 ? (
              dataCalculate.each_day_price.map((item, index) => (
                <Grid container key={index} className="totalPriceRoom__priceDay">
                  <Grid item xs={7} className="totalPriceRoom__textLeft">
                    <p>{item.date}</p>
                  </Grid>
                  <Grid item xs={5} className="totalPriceRoom__textRight">
                    <p>{numeral(item.price_day).format('0,0')}đ</p>
                  </Grid>
                </Grid>
              ))
            ) : (
                <Grid className="totalPriceRoom__priceDay" container>
                  <Grid item xs={8} className="totalPriceRoom__textLeft">
                    <p>{t('room:boxBooking:avgDay')}</p>
                  </Grid>
                  <Grid item xs={4} className="totalPriceRoom__textRight">
                    <p>{numeral(dataCalculate.avg_price).format('0,0')}đ</p>
                  </Grid>
                </Grid>
              )}
          </Grid>
        }>
        <span>
          <FontAwesomeIcon
            icon={faQuestionCircle}
            size="1x"
            color={mainColor.primary}></FontAwesomeIcon>
        </span>
      </CustomPopper>
    )
  );
};

export default DetailsPriceDay;
