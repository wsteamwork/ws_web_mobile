import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import IncludedFee from './IncludedFee';
import PriceLongTerm from './PriceLongTerm';
import PriceShortTerm from './PriceShortTerm';
import WeekdayPrice from './WeekdayPrice';

interface IProps {
  classes?: any;
}

const ListingPrice: FC<IProps> = (props) => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={10} lg={9}>
        <PriceShortTerm />
        <WeekdayPrice />
        <PriceLongTerm />
        <IncludedFee />
      </Grid>
    </Grid>
  );
};
export default ListingPrice;
