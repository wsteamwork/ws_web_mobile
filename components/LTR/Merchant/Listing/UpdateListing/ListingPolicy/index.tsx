import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import BookingPolicy from './BookingPolicy';
import CancelPolicy from './CancelPolicy';
import RentTypePolicy from './RentypePolicy';

interface IProps {
  classes?: any;
}

const ListingPolicy: FC<IProps> = (props) => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={10} lg={9}>
        <BookingPolicy />
        <RentTypePolicy />
        <CancelPolicy />
      </Grid>
    </Grid>
  );
};
export default ListingPolicy;
