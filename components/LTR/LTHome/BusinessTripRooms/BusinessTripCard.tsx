import { cleanAccents, formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM, IMAGE_STORAGE_XS } from '@/utils/store/global';
import { Grid, Paper, Theme, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import ProgressiveImage from 'react-progressive-image';
import Cookies from 'universal-cookie';

interface IProps {
  classes?: any;
  room?: any;
  imgHeight?: number;
  lineClamp?: number;
  isRoomSameBulding?: boolean;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imgSize: {
      height: (props) => (props.imgHeight ? props.imgHeight : 220)
    },
    roomName: {
      WebkitLineClamp: (props) => (props.lineClamp ? props.lineClamp : 1)
    }
  })
);

const BusinessTripCard: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room, imgHeight, isRoomSameBulding } = props;
  const { t } = useTranslation();
  const cookies = new Cookies();
  const imgRoomSM =
    room.avatar && room.avatar.images.length
      ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}`
      : './static/ms-icon-310x310.png';
  const imgRoomXS =
    room.avatar && room.avatar.images.length
      ? `${IMAGE_STORAGE_XS + room.avatar.images[0].name}`
      : './static/ms-icon-310x310.png';
  return (
    <Grid container item xs={12} className={classes.boxWrapper}>
      <Grid item xs={12}>
        <Paper elevation={0} className="RoomCardBusinessTrip">
          <Grid container className="RoomCardBusinessTrip__wrapper">
            <Grid item xs={12} className="RoomCardBusinessTrip__boxImg">
              <ProgressiveImage src={imgRoomSM} placeholder={imgRoomXS}>
                {(src, loading) => (
                  <img
                    style={{ opacity: loading ? 0.5 : 1 }}
                    src={src}
                    alt="Westay"
                    className={classNames('imgSize', classes.imgSize)}
                  />
                )}
              </ProgressiveImage>
            </Grid>
            <Grid item xs={12} className="RoomCardBusinessTrip__boxCard">
              <Grid className="cardWrapper">
                <Grid container className="cardContainer">
                  <Link href={`/long-term-room/${room.id}`} target="_blank" className="boxLink">
                    <Grid container className="boxTitle">
                      {!isRoomSameBulding && (
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" className="address">
                            <span>
                              {cookies.get('initLanguage') == 'en'
                                ? cleanAccents(room.district)
                                : room.district}
                            </span>
                            <span className="dotAmenties">.</span>
                            <span>
                              {cookies.get('initLanguage') == 'en'
                                ? cleanAccents(room.city)
                                : room.city}
                            </span>
                          </Typography>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          className={classNames('roomName', classes.roomName)}>
                          {t('room:room_number')} {isRoomSameBulding && room.room_number != null
                            ? room.room_number
                            : room.about_room.name}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        {room.total_area && room.total_area > 0 ? (
                          <span>
                            {room.total_area ? room.total_area : '69'} m<sup>2</sup>
                          </span>
                        ) : (
                            <span>
                              ? m<sup>2</sup>
                            </span>
                          )}
                      </Grid>
                      {!isRoomSameBulding && (
                        <Fragment>
                          <Grid item xs={12} className="RoomCardBusinessTrip__boxPrice">
                            {formatPrice(room.price_display)}&nbsp;
                            <span className="unitPrice">/{t('home:month')}</span>
                          </Grid>
                          <Grid item xs={12} container className="marginRoomName">
                            <Grid item xs={12} className="roomType">
                              <span>{room.accommodation_type_txt}</span>
                            </Grid>
                          </Grid>
                        </Fragment>
                      )}
                    </Grid>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BusinessTripCard;
