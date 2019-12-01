import { Grid, Paper, Theme, Tooltip, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import LazyLoad from 'react-lazyload';
import FavoriteAnimation from '../Rooms/Lotte/FavoriteAnimation';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { formatMoney } from '@/utils/mixins';
import { useTranslation } from 'react-i18next';

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
  const price = room.price_display
    ? `${formatMoney(room.price_display)} ${t('rooms:currency')}/${t('rooms:month')}`
    : `${t('rooms:contactForPrice')}}`;
  return (
    <Grid container item xs={12} className={classes.boxWrapper}>
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
                    <Grid className="boxTitle">
                      <Grid>
                        <Typography variant="subtitle2" className="roomName">
                          {room.instant_book ? (
                            <Tooltip
                              classes={{ tooltip: 'tooltip' }}
                              title={room.instant_book_txt}
                              placement="top">
                              <QuickBookIcon className="svgQuick" />
                            </Tooltip>
                          ) : (
                            ''
                          )}
                          {room.about_room.name}
                        </Typography>
                      </Grid>
                      <Grid className="roomSubtitle">
                        <span className="roomType">{room.accommodation_type_txt}</span>
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">{room.district.data.name}</span>&nbsp;
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">{room.city.data.name}</span>
                      </Grid>
                      <Grid className="collectionAmenities">
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
                      <Grid className="boxPrice">
                        <Typography variant="subtitle1" className="priceBasic">
                          {price}
                        </Typography>
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
