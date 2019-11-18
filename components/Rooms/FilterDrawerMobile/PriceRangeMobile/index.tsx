import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useContext, useState, useEffect } from 'react';
import { RoomFilterContext, IRoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import _ from 'lodash';
import { Theme, makeStyles, Typography } from '@material-ui/core';
import InputRange, {Range} from 'react-input-range';
import numeral from 'numeral';
import {
    MIN_PRICE,
    MAX_PRICE,
    STEP_PRICE
  } from '@/store/Context/Room/RoomFilterContext';

  interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    
  })
);

const PriceRangeMobile: FC<IProps> = (props) => {
  const { state, dispatch } = useContext<IRoomFilterContext>(RoomFilterContext);
  const { price_day_from, price_day_to } = state;
  const [price, setPrice] = useState<Range>({
    min: price_day_from,
    max: price_day_to
  });
  const setPriceEnhancement = (value: Range) => {
    if (value.min < MIN_PRICE) {
      value.min = MIN_PRICE;
    } else if (value.max > MAX_PRICE) {
      value.max = MAX_PRICE;
    }
    setPrice(value);
  };

  useEffect(() => {
    hanldeChange();
  }, [price])

  const hanldeChange = () => {
    dispatch({ type: 'setPrices', price_day_from: price.min, price_day_to: price.max });
  };
  return (
    <Fragment>
      <InputRange
        allowSameValues = {false}
        minValue = {MIN_PRICE}
        maxValue = {MAX_PRICE}
        step = {STEP_PRICE}
        onChange = {setPriceEnhancement}
        value = {price} />
        <Typography variant = 'subtitle2'>{`đ ${numeral(price.min).format('0,0')} - đ ${numeral(price.max).format('0,0')}`}</Typography>
    </Fragment>
  );
};

export default PriceRangeMobile;
