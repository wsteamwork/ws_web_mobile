import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import CancellationPolicy from './CancellationPolicy';
import ChooseBookingType from './ChooseBookingType';
import DateRangeSingle from './DateRangeSingle';
import PriceDetail from './PriceDetail';
import SelectGuest from './SelectGuest';
import SelectTime from './SelectTime';
import SubmitBooking from './SubmitBooking';
import TotalPrice from './TotalPrice';

const BoxBooking: FC = () => {
  return (
    <Grid className="boxBooking">
      <PriceDetail></PriceDetail>
      <Grid className="boxBooking__padding">
        <ChooseBookingType></ChooseBookingType>
        <DateRangeSingle></DateRangeSingle>
        <SelectGuest></SelectGuest>
        <SelectTime></SelectTime>
        <TotalPrice></TotalPrice>
        <SubmitBooking></SubmitBooking>
      </Grid>
      <CancellationPolicy></CancellationPolicy>
    </Grid>
  );
};

export default BoxBooking;
