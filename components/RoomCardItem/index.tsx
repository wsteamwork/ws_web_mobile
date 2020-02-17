import { Divider, Grid, Paper, Theme, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import FavoriteAnimation from '../Rooms/Lotte/FavoriteAnimation';

interface IProps {
  classes?: any;
  room?: any;
  roomImage?: string;
  roomPrice?: string | number;
  room_id?: number;
  roomName?: string;
  roomType?: string;
  district?: string;
  city?: string;
  number_bedroom?: number;
  number_bathroom?: number;
  total_area?: number;
  numberRoomSameBuilding?: number;
  isBuilding?: boolean;
  apartment?: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    apartmentContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '0.3rem',
      paddingBottom: '0.3rem'
    },
    apartmentName: {
      overflow: 'hidden',
      overflowWrap: 'break-word',
      WebkitLineClamp: 1,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      fontWeight: 500,
      color: 'tomato',
      fontSize: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      right: 0,
      display: 'flex',
    }
  })
);

const RoomCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {
    room,
    roomImage,
    roomPrice,
    room_id,
    roomName,
    roomType,
    district,
    city,
    number_bedroom,
    number_bathroom,
    total_area,
    numberRoomSameBuilding,
    isBuilding,
    apartment
  } = props;
  const { t } = useTranslation();
  return (
    <Grid container item xs={12} justify="center" className={classes.boxWrapper}>
      <Grid item xs={11}>
        <Paper elevation={0} className="RoomCardMobile">
          <Grid container className="__wrapper">
            <Grid item xs={12} className="boxImg">
              <LazyLoad>
                <img src={roomImage} className="imgSize" />
              </LazyLoad>
            </Grid>
            <Grid item xs={12} className="boxCard">
              <Grid className="cardWrapper">
                <Grid container className="cardContainer">
                  <Link href={`/long-term-room/${room_id}`} target="_blank" className="boxLink">
                    <Grid container className="boxTitle">
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" className="roomName">
                          {roomName}
                        </Typography>
                      </Grid>
                      <Grid item xs={10} md={9} container className="marginRoomName">
                        <Grid item xs={12} className="roomSubtitle">
                          <span className="roomType">{roomType}</span>
                          <span className="dotAmenties">.</span>&nbsp;
                          <span className="address">
                            {district}, {city}
                          </span>
                        </Grid>
                        <Grid item xs={12} className="collectionAmenities">
                          <span className="address">
                            {number_bedroom} {t('rooms:rooms')}
                          </span>
                          &nbsp;
                          <span className="dotAmenties">.</span>&nbsp;
                          <span className="address">
                            {number_bathroom} {t('rooms:bathrooms')}
                          </span>
                          &nbsp;
                          <span className="dotAmenties">.</span>&nbsp;
                          <span className="address">
                            {total_area && total_area > 0 ? (
                              <span>
                                {total_area} m<sup>2</sup>
                              </span>
                            ) : (
                                <span>
                                  ? m<sup>2</sup>
                                </span>
                              )}
                          </span>
                        </Grid>
                        {numberRoomSameBuilding ? (
                          <Grid item xs={12}>
                            {numberRoomSameBuilding} {t('longtermroom:room_same_building')}
                          </Grid>
                        ) : (
                            ''
                          )}
                      </Grid>
                      <Grid item xs={2} md={3} className="boxPriceContainer">
                        <Grid className="boxPrice">
                          <Typography variant="subtitle1" className="priceBasic">
                            {roomPrice}
                          </Typography>
                          <Typography variant="subtitle2" className="priceUnit">
                            /{t('rooms:month')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                  <Divider style={{ marginTop: '0.6rem', height: 1 }} />
                  <Grid item xs={12} className={classes.apartmentContainer}>
                    {apartment && <Grid item xs={12} className={classes.apartmentName}>
                      {apartment}
                    </Grid>}
                  </Grid>
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
