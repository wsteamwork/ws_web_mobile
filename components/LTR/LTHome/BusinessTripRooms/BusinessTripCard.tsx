import { Grid, Paper, Theme, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { cleanAccents, formatPrice } from '@/utils/mixins';
import Cookies from 'universal-cookie';
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

const BusinessTripCard: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room } = props;
  const { t } = useTranslation();
  const cookies = new Cookies();
  const imgRoom =
    room.avatar.images && room.avatar.images.length
      ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}`
      : './static/ms-icon-310x310.png';
  return (
    <Grid container item xs={12} className={classes.boxWrapper}>
      <Grid item xs={12}>
        <Paper elevation={0} className="RoomCardBusinessTrip">
          <Grid container className="__wrapper">
            <Grid item xs={12} className="boxImg">
              <LazyLoad>
                <img src={imgRoom} className="imgSize" />
              </LazyLoad>
              <Grid item xs={12} className="boxPrice">
              {formatPrice(room.price_display)}&nbsp;<span className="unitPrice">/{t('home:month')}</span>
              </Grid>
            </Grid>
            <Grid item xs={12} className="boxCard">
              <Grid className="cardWrapper">
                <Grid container className="cardContainer">
                  <Link href={`/long-term-room/${room.id}`} target="_blank" className="boxLink">
                    <Grid container className="boxTitle">
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
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" className="roomName">
                          {room.about_room.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} container className="marginRoomName">
                        <Grid item xs={12} className="roomType">
                          <span>{room.accommodation_type_txt}</span>
                        </Grid>
                      </Grid>
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
