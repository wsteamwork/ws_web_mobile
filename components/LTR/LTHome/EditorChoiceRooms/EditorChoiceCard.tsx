import { cleanAccents, formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM, IMAGE_STORAGE_XS } from '@/utils/store/global';
import { Grid, Paper, Theme, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ProgressiveImage from 'react-progressive-image';
import Cookies from 'universal-cookie';
interface IProps {
  classes?: any;
  room: any;
  showDetail?: boolean;
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

const EditorChoiceCard: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room, showDetail } = props;
  const { t } = useTranslation();
  const cookies = new Cookies();
  const imgRoomSM =
    room.avatar.images && room.avatar.images.length
      ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}`
      : './static/ms-icon-310x310.png';
  const imgRoomXS =
    room.avatar.images && room.avatar.images.length
      ? `${IMAGE_STORAGE_XS + room.avatar.images[0].name}`
      : './static/ms-icon-310x310.png';
  return (
    <Grid container item xs={12} className={classes.boxWrapper}>
      <Grid item xs={12}>
        <Paper elevation={0} className="RoomCardEditorChoice">
          <Grid container className="__wrapper">
            <Grid item xs={12} className="boxImg">
              <ProgressiveImage src={imgRoomSM} placeholder={imgRoomXS}>
                {(src, loading) => (
                  <img
                    style={{ opacity: loading ? 0.5 : 1 }}
                    src={src}
                    alt="Westay"
                    className="imgSize"
                  />
                )}
              </ProgressiveImage>
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
                      <Grid item xs={12} container className="marginRoomName">
                        <Grid item xs={12} className="roomSubtitle">
                          <span>{room.accommodation_type_txt}</span>
                          {/* <span className="dotAmenties">.</span>
                          <span>
                            {cookies.get('initLanguage') == 'en'
                              ? cleanAccents(room.district)
                              : room.district}
                          </span> */}
                          <span className="dotAmenties">.</span>
                          <span>
                            {cookies.get('initLanguage') == 'en'
                              ? cleanAccents(room.city)
                              : room.city}
                          </span>
                        </Grid>
                        {showDetail && (
                          <Grid item xs={12} className="roomSubtitle">
                            {room.total_area && room.total_area > 0 ? (
                              <span>
                                {room.total_area ? room.total_area : '69'} m<sup>2</sup>
                              </span>
                            ) : (
                                <span>
                                  ? m<sup>2</sup>
                                </span>
                              )}
                            <span className="dotAmenties">.</span>
                            <span>
                              {room.bathrooms.number_bathroom} {t('rooms:bathrooms')}
                            </span>
                            <span className="dotAmenties">.</span>
                            <span>
                              {room.bedrooms.number_bedroom} {t('rooms:rooms')}
                            </span>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid className="boxPrice">
                          <Typography variant="subtitle1" className="priceBasic">
                            {formatPrice(room.price_display)}&nbsp;
                            <span className="priceUnit">/{t('home:month')}</span>
                          </Typography>
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

EditorChoiceCard.defaultProps = {
  showDetail: false
};

export default EditorChoiceCard;
