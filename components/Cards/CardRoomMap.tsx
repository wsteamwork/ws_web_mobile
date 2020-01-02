import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { cleanAccents, formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Grid, Link, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
interface IProps {
  classes?: any;
  city: string;
  district: string;
  roomID: number;
  roomName: string;
  roomImage: string;
  roomType: string;
  numberBedroom: number;
  avg_rating?: number;
  isHover: boolean;
  room: LTRoomIndexRes;
  focus(room: LTRoomIndexRes): void;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    roomInMap: {
      position: 'relative',
      width: '97%',
      margin: 'auto',
      height: 'auto'
    },
    txtName: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: '34px',
      letterSpacing: 0.36,
      color: '#252529',
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      display: '-webkit-box'
    },
    txtAddress: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0.07,
      color: '#252529'
    },
    txtPer: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13,
      lineHeight: '18px',
      color: '#252529'
    },
    rowMarginTop: {
      marginTop: '8px'
    },
    iconEmpty: {
      color: '#51ccbb'
    },
    colorStar: {
      color: '#54D3C2'
    },
    txtReview: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0.07,
      color: '#FFFFFF',
      marginLeft: 8
    },
    border: {
      border: '1px solid #54D3C2',
      borderRadius: 15
    }
  })
);

const CardRoomMap: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {
    roomID,
    roomName,
    city,
    district,
    roomImage,
    roomType,
    numberBedroom,
    avg_rating,
    room,
    isHover,
    focus
  } = props;
  const { t } = useTranslation();
  const cookies = new Cookies();
  return (
    <Grid
      className={classNames('roomCardMap', classes.roomInMap, isHover ? classes.border : '')}
      onMouseOver={() => focus(room)}>
      <Grid container className="roomCardMap__wrapper" spacing={0}>
        <Grid item xs={4} className="boxImg">
          <img
            src={!!roomImage ? IMAGE_STORAGE_SM + roomImage : './static/images/westay-avatar.jpg'}
            className="imgSize swiper-lazy"
            alt={``}
          />
        </Grid>

        <Grid item xs={8} className="boxCard">
          <Grid className="cardWrapper">
            <Grid container className="cardContainer">
              <Grid className="boxLink">
                <Grid className="boxTitle">
                  <Grid>
                    <Typography variant="subtitle2" className="roomName">
                      {roomName.length > 34 ? roomName.substr(0, 35) : roomName}
                      <Link href={`/long-term-room/${roomID}`} target="_blank" className="linkRoom">
                        <span>{t('rooms:exploreDetailsRoom')}</span>
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid className="roomSubtitle">
                    <span className="address">
                      {cookies.get('initLanguage') == 'en' ? cleanAccents(district) : district},{' '}
                      {cookies.get('initLanguage') == 'en' ? cleanAccents(city) : city}
                    </span>
                  </Grid>
                </Grid>
                <Grid className="boxRating">
                  <Typography variant="subtitle2" className="roomName">
                    {roomType}
                  </Typography>
                  {/* <Rating
                    name="customized-empty"
                    readOnly
                    size="small"
                    value={avg_rating}
                    precision={0.5}
                    classes={{ root: classes.colorStar }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.iconEmpty} />}
                  /> */}
                </Grid>

                <Grid className="boxPrice">
                  <Grid className="priceContainer">
                    <Typography variant="subtitle1" className="txtPrice">
                      {formatPrice(room.price_display)}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.txtPer}>
                      {cookies.get('initLanguage') == 'en'
                        ? '$/' + t('home:month')
                        : 'đ/' + t('home:month')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CardRoomMap;
