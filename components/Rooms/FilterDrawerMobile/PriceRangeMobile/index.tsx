import { IRoomFilterContext, MAX_PRICE, MIN_PRICE, RoomFilterContext, STEP_PRICE } from '@/store/Context/Room/RoomFilterContext';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import numeral from 'numeral';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputRange, { Range } from 'react-input-range';
import Cookies from 'universal-cookie';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    customColor: {
      color: '#484848'
    },
    price: {
      marginTop: 8
    }
  })
);

const PriceRangeMobile: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { state, dispatch } = useContext<IRoomFilterContext>(RoomFilterContext);
  const { price_day_from, price_day_to } = state;
  const [price, setPrice] = useState<Range>({
    min: price_day_from,
    max: price_day_to
  });
  const { t } = useTranslation();
  const cookies = new Cookies();
  const lang = cookies.get('initLanguage');
  const setPriceEnhancement = (value: Range) => {
    if (value.min < MIN_PRICE) {
      value.min = MIN_PRICE;
    } else if (value.max > MAX_PRICE) {
      value.max = MAX_PRICE;
    }
    setPrice(value);
  };

  useEffect(() => {
    // console.log(price.max);
    if (lang && lang === 'en') {
      if (price.max >= 5000) {
        hanldeChange(5000)
      }
    } else {
      hanldeChange();
    }
  }, [price]);

  const hanldeChange = (defaultMaxPrice?: number) => {
    if (defaultMaxPrice) {
      dispatch({ type: 'setPrices', price_day_from: lang && lang === 'vi' ? price.min : price.min * 23500, price_day_to: lang && lang === 'vi' ? defaultMaxPrice : defaultMaxPrice * 23500 });
    } else {
      dispatch({ type: 'setPrices', price_day_from: lang && lang === 'vi' ? price.min : price.min * 23500, price_day_to: lang && lang === 'vi' ? price.max : price.max * 23500 });
    }
  };
  return (
    <Fragment>
      <InputRange
        allowSameValues={false}
        minValue={MIN_PRICE}
        maxValue={MAX_PRICE}
        step={STEP_PRICE}
        onChange={setPriceEnhancement}
        value={price}
      />
      <Typography variant='subtitle2'>{`${t('shared:currency')}${numeral(price.min).format('0,0')} - ${t('shared:currency')}${numeral(price.max).format('0,0')}`}</Typography>
    </Fragment>
  );
};

export default PriceRangeMobile;
