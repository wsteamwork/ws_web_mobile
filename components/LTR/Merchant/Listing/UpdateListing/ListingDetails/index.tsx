import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import Amenities from './Amenities';
import BathRooms from './BathRooms';
import BedRooms from './BedRooms';
import Guests from './Guests';
import Location from './Location';
import NameAndDescription from './NameAndDescription';
import NameAndDescriptionEN from './NameAndDescriptionEN';
import RentAndRoomType from './RentAndRoomType';
import StatusRoom from './StatusRoom';
import GuideBook from './GuideBook';

interface IProps {
  classes?: any;
}
const ListingDetails: FC<IProps> = (props) => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={10} lg={9}>
        <NameAndDescription />
        <NameAndDescriptionEN />
        <RentAndRoomType />
        <Guests />
        <Amenities />
        <BedRooms />
        <BathRooms />
        <Location />
        <GuideBook />
        <StatusRoom />
      </Grid>
    </Grid>
  );
};
export default ListingDetails;
