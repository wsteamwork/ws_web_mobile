import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import DangerZoneSetting from './DangerZoneSetting';

interface IProps {
  classes?: any;
}

const ListingPrice: FC<IProps> = (props) => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={11} lg={11}>
        <DangerZoneSetting />
      </Grid>
    </Grid>
  );
};
export default ListingPrice;
