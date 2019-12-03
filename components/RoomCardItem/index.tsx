import { formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Grid, Paper, Theme, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import FavoriteAnimation from '../Rooms/Lotte/FavoriteAnimation';

interface IProps {
  classes?: any;
  room?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const RoomCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room } = props;
  const { t } = useTranslation();
  const imgRoom =
    room.avatar.images && room.avatar.images.length
      ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}`
      : './static/ms-icon-310x310.png';
  const price = room.price_display ? formatPrice(room.price_display) : t('rooms:contactForPrice');
  return (
    <Grid container item xs={12} justify="center" className={classes.boxWrapper}>
      <Grid item xs={11}>
        <Paper elevation={0} className="RoomCardMobile">
          <Grid container className="__wrapper">
            <Grid item xs={12} className="boxImg">
              <LazyLoad>
                <img src={imgRoom} className="imgSize" />
              </LazyLoad>
            </Grid>
            <Grid item xs={12} className="boxCard">
              <Grid className="cardWrapper">
                <Grid container className="cardContainer">
                  <Link href={`/long-term-room/${room.id}`} target="_blank" className="boxLink">
                    <Grid container className="boxTitle">
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" className="roomName">
                          {room.about_room.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={10} md={9} container className="marginRoomName">
                        <Grid item xs={12} className="roomSubtitle">
                          <span className="roomType">{room.accommodation_type_txt}</span>
                          <span className="dotAmenties">.</span>&nbsp;
                          <span className="address">{room.district.data.name}, {room.city.data.name}</span>
                        </Grid>
                        <Grid item xs={12} className="collectionAmenities">
                          <span className="address">
                            {room.bedrooms.number_bedroom} {t('rooms:rooms')}
                          </span>
                          &nbsp;
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">
                            {room.bathrooms.number_bathroom} {t('rooms:bathrooms')}
                          </span>
                          &nbsp;
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">
                            {room.total_area && room.total_area > 0 ? (
                              <span>
                                {room.total_area ? room.total_area : '?'} m<sup>2</sup>
                              </span>
                            ) : (
                                <span>? m<sup>2</sup></span>
                              )}
                          </span>
                        </Grid>
                      </Grid>
                      <Grid item xs={2} md={3} className="boxPriceContainer">
                        <Grid className="boxPrice">
                          <Typography variant="subtitle1" className="priceBasic">
                            {price}
                          </Typography>
                          <Typography variant="subtitle2" className="priceUnit">
                            /{t('rooms:month')}
                          </Typography>

                        </Grid>
                      </Grid>

                    </Grid>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="boxSave">
              <Grid className="boxFavorite">
                <FavoriteAnimation />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RoomCardItem;
