import React, { Fragment, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, Link, Tooltip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ButtonGlobal from '@/components/ButtonGlobal';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import Cookies from 'universal-cookie';
import { cleanAccents } from '@/utils/mixins';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
  city: string;
  district: string;
  roomID: number;
  roomName: string;
  roomImage: string;
  roomType: string;
  roomNumber: number;
  avg_rating?: number;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
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
    txtPrice: {
      fontSize: 22,
      lineHeight: '28px',
      textAlign: 'right',
      letterSpacing: 0.32,
      fontWeight: 'bold',
      color: '#252529'
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
      // letterSpacing: -0.08,
      color: '#252529'
      // textAlign: 'center'
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
    }
  })
);

const CardRoom2: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { roomID, roomName, city, district, roomImage, roomType, roomNumber, avg_rating } = props;
  const { t } = useTranslation();
  const cookies = new Cookies();

  return (
    <Grid className="roomCard2">
      <Grid container className="roomCard2__wrapper" spacing={0}>
        <Grid item xs={5} className="boxImg">
          {/* <LazyLoad> */}
          <img
            src={!!roomImage ? IMAGE_STORAGE_SM + roomImage : './static/images/westay-avatar.jpg'}
            className="imgSize swiper-lazy"
            alt={``}
          />
          {/* </LazyLoad> */}
        </Grid>
        <Grid item xs={7} className="boxCard">
          <Grid className="cardWrapper">
            <Grid container className="cardContainer">
              <Link href={`/long-term-room/${roomID}`} target="_blank" className="boxLink">
                <Grid className="boxTitle">
                  <Grid>
                    <Typography variant="subtitle2" className="roomName">
                      {/* {room.instant_book === 1 && (
                        
                      )}
                      {room.details ? room.details.data[0].name : room.room_name} */}
                      {/* <Tooltip
                        classes={{ tooltip: 'tooltip' }}
                        title={'Đặt phòng nhanh'}
                        placement="top">
                        <QuickBookIcon color="primary" style={{ marginRight: 5 }} />
                      </Tooltip> */}
                      {roomName}
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
                  <Rating
                    name="customized-empty"
                    readOnly
                    size="small"
                    value={avg_rating}
                    precision={0.5}
                    classes={{ root: classes.colorStar }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.iconEmpty} />}
                  />
                </Grid>

                <Grid className="boxPrice">
                  <Grid className="priceContainer">
                    <Typography variant="subtitle1" className={classes.txtPrice}>
                      123tr
                    </Typography>
                    <Typography variant="subtitle2" className={classes.txtPer}>
                      {cookies.get('initLanguage') == 'en'
                        ? 'usd/' + t('home:month')
                        : 'vnd/' + t('home:month')}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // <Grid container>
    //   <Grid item xs={9}>
    //     <Typography variant='h1' className={classes.txtName}>
    //       Grand Royale Park Hotel Royale Park Hotel
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={3} container justify='flex-end' alignItems='flex-end'>
    //     <Grid item>
    //       <Typography variant='subtitle1' className={classes.txtPrice}>
    //         $123
    //       </Typography>
    //     </Grid>
    //   </Grid>
    //   <Grid item xs={9} className={classes.rowMarginTop}>
    //     <Typography variant='subtitle2' className={classes.txtAddress}>
    //       Thanh Xuân, Hà Nội
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={3} container justify='flex-end' alignItems='flex-end'>
    //     <Grid item>
    //       <Typography variant='subtitle2' className={classes.txtPer}>
    //         vnd / tháng
    //       </Typography>
    //     </Grid>
    //   </Grid>
    //   {showRating && (
    //     <Grid item xs={12} className={classes.rowMarginTop} container alignItems='center'>
    //       <Rating
    //         name="customized-empty"
    //         readOnly
    //         size="small"
    //         value={2}
    //         precision={0.5}
    //         classes={{ root: classes.colorStar }}
    //         emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.iconEmpty} />}
    //       />
    //       <span className={classes.txtReview}>
    //         80 Đánh giá
    //       </span>
    //     </Grid>
    //   )}

    //   {showButtonBook && (
    //     <Grid item xs={12} className={classes.rowMarginTop}>
    //     <ButtonGlobal
    //       width='100%'
    //       textColor='#fff'
    //       background='#54D3C2'
    //       onClick={() => { alert('ok') }}
    //     >
    //       Đặt phòng
    //         </ButtonGlobal>
    //   </Grid>
    //   )}
    // </Grid>
  );
};

export default CardRoom2;
