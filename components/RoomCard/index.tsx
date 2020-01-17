import { ReducersList } from '@/store/Redux/Reducers';
import { cleanAccents, formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Link, Theme, Tooltip, Typography } from '@material-ui/core';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import numeral from 'numeral';
import React, { FC, Fragment } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
// import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: '1.2rem !important',
      paddingRight: 5,
    }
  })
);

interface Iprops {
  isHomepage: boolean;
  showIcon?: boolean;
  showBedRoom?: boolean;
  showAddress?: boolean;
  isFormatPrice?: boolean;
  roomID: number;
  roomName: string;
  city: string;
  district: string;
  roomImage: string;
  roomType: string;
  instantbook: number;
  roomNumber: number;
  price_day: number;
  total_review?: number;
  price_hour?: number;
  avg_rating?: number;
}

const RoomCard: FC<Iprops> = (props) => {
  const { isHomepage, showIcon, showBedRoom, showAddress, isFormatPrice,
    roomID,
    roomName,
    city,
    district,
    roomImage,
    roomType,
    instantbook,
    roomNumber,
    price_day,
    total_review,
    price_hour,
    avg_rating
  } = props;
  const { t }: UseTranslationResponse = useTranslation();
  const classes = useStyles(props);
  const cookies = new Cookies();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);
  const avatarImg = !!roomImage ? IMAGE_STORAGE_SM + roomImage : './static/images/westay-avatar.jpg';
  const linkRoom = leaseTypeGlobal ? `/long-term-room/${roomID}` : `/room/${roomID}`;
  return (
    <Fragment>
      <Grid className="roomCard">
        <Grid className="roomCard__wrapper">
          <Grid className="mediaContainer">
            <Grid className="backContainer">
              <Grid className="frontContainer">
                <Link href={linkRoom} target="_blank">
                  <Grid className="mediaWrapper">
                    {/* <LazyLoad> */}
                    <div className="media" style={{ backgroundImage: `url("${avatarImg}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

                    </div>
                    {/* <img
                      src={`${avatarImg}`}
                      className="media"
                      alt={``}
                    /> */}
                    {/* </LazyLoad> */}
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="infoContainer">
            <Link href={linkRoom} target="_blank" className="infoLink">
              <Grid className="info">
                <Typography variant="subtitle1" className={leaseTypeGlobal ? "roomCard__type__LT" : "roomCard__type"}>
                  {showIcon && (
                    <FontAwesomeIcon className={classes.icon} icon={faHome} style={{ color: leaseTypeGlobal ? '#673ab7 !important' : '#fa991c' }} />
                  )}
                  {roomType}
                  {showAddress && <span> &#8226; {city}</span>}
                  {showBedRoom && <span> &#8226; {roomNumber} {t('room:rooms')}</span>}
                </Typography>
                <Typography className="roomCard__name" variant="h1">
                  {instantbook === 1 && (
                    <div className="iconWrapper">
                      <Tooltip
                        classes={{ tooltip: 'tooltip' }}
                        title={t('book:bookingForm:instantBook')}
                        placement="top">
                        <QuickBookIcon className={leaseTypeGlobal ? "instantBookIconLT" : "instantBookIcon"} />
                      </Tooltip>
                    </div>
                  )}
                  <span>{roomName}</span>
                </Typography>
                {!showAddress && (
                  <Typography className="roomCard__address" variant="h1">
                    <span>{cookies.get('initLanguage') == 'en' ? cleanAccents(district) : district}</span>
                    <span>&#44;{cookies.get('initLanguage') == 'en' ? cleanAccents(city) : city}</span>
                  </Typography>
                )}

                <Grid className="price">
                  {isFormatPrice ? t('home:currency') + formatPrice(price_day) : t('home:currency') + numeral(price_day).format('0,0')}
                  {leaseTypeGlobal ? t('longtermroom:priceBasicMobile') : t('room:pernight')}
                  {!isHomepage && price_hour > 0 ? (
                    <Typography className="hourPrice">
                      &#10072;{' '}
                      {price_hour && (
                        <span>
                          {isFormatPrice ? formatPrice(price_hour) : numeral(price_hour).format('0,0')}{t('shared:hourPrice')}
                        </span>
                      )}
                    </Typography>
                  ) : (
                      ''
                    )}
                </Grid>

                {total_review > 3 ? (
                  <Grid className="review">
                    <StarIcon className="starIcon" />
                    <Typography className="rating text">{`${avg_rating}`}</Typography>
                    <Typography variant="subtitle1" className="totalReview text">{` (${
                      total_review
                      } ${t('home:review')})`}</Typography>
                  </Grid>
                ) : (
                    ''
                  )}
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

RoomCard.defaultProps = {
  isHomepage: false,
  showIcon: false,
  showBedRoom: false,
  showAddress: true,
  isFormatPrice: false
};

export default RoomCard;
