import { Collapse, Grid } from '@material-ui/core';
import React, { FC, memo, useMemo } from 'react';
import { useCheckBookingTypeHour } from './context';
import SelectTimeCheckin from './SelectTimeCheckin';
import SelectTimeCheckout from './SelectTimeCheckout';

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '300px',
      width: 'auto'
    }
  }
};

const SelectTime: FC = () => {
  const [check] = useCheckBookingTypeHour();

  return useMemo(
    () => (
      <Collapse in={!!check}>
        <Grid container spacing={1} className="selectHours">
          <Grid item xs={6}>
            <SelectTimeCheckin></SelectTimeCheckin>
          </Grid>
          <Grid item xs={6}>
            <SelectTimeCheckout></SelectTimeCheckout>
          </Grid>
        </Grid>
      </Collapse>
    ),
    [check]
  );
};

export default memo(SelectTime);
