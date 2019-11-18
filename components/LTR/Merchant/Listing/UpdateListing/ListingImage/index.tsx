import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import AvatarImage from '../ListingImage/AvatarImage';
import CoverPhoto from '../ListingImage/CoverPhoto';
import Furnitures from '../ListingImage/Furnitures';
import Kitchens from '../ListingImage/Kitchens';
import LivingRooms from '../ListingImage/LivingRooms';
import Outdoors from '../ListingImage/Outdoors';
import BathImage from './BathImage';
import BedImage from './BedImage';

interface IProps {
  classes?: any;
}

const ListingImage: FC<IProps> = (props) => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={10} lg={9} style={{ marginTop: 10 }}>
        <Typography variant="subtitle2">
          Việc cập nhật ảnh thường xuyên và chính xác, đầy đủ sẽ giúp căn hộ của bạn thu hút khách hàng nhiều hơn
        </Typography>
      </Grid>
      <Grid item xs={12} sm={10} lg={9}>
        <AvatarImage />
        <CoverPhoto />
        <LivingRooms />
        <BedImage />
        <BathImage />
        <Kitchens />
        <Furnitures />
        <Outdoors />
      </Grid>
    </Grid>
  );
};
export default ListingImage;
