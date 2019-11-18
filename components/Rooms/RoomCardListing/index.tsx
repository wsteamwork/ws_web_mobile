import FavoriteAnimation from '@/components/Rooms/Lotte/FavoriteAnimation.jsx';
// import { windowExist } from '@/store/Redux';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
// import { ReducersList } from '@/store/Redux/Reducers';
// import { CompareRoomsActions } from '@/store/Redux/Reducers/Room/CompareRooms';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { cleanAccents } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper/Paper';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import numeral from 'numeral';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import LazyLoad from 'react-lazyload';
import Cookies from 'universal-cookie';

interface Iprops {
  classes?: any;
  room?: RoomIndexRes;
}

// export const handleCompareList = (
//   comparisonList: RoomIndexRes[],
//   room: RoomIndexRes,
//   dispatch: Dispatch<CompareRoomsActions>
// ) => {
//   const comparisonListId = comparisonList.map((item) => item.id);
//   if (!comparisonListId.includes(room.id)) {
//     if (comparisonList.length === 2) {
//       const data = comparisonList.slice(1);
//       dispatch({
//         type: 'SET_COMPARISON_LIST',
//         comparisonList: [...data, room]
//       });
//     } else {
//       dispatch({
//         type: 'SET_COMPARISON_LIST',
//         comparisonList: [...comparisonList, room]
//       });
//     }
//   }
// };

export const settingSliderRoomCard = {
  rebuildOnUpdate: true,
  lazy: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  renderPrevButton: () => (
    <FontAwesomeIcon
      className="swiper-button-prev"
      icon={faChevronLeft}
      size="2x"
      color="#fff" />
  ),
  renderNextButton: () => (
    <FontAwesomeIcon
      className="swiper-button-next"
      icon={faChevronRight}
      size="2x"
      color="#fff" />
  ),

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  loop: true,
  // getSwiper: (swiper: SwiperInstance) => {
  //   swiper.update();
  // }
};

const RoomCardListing: FC<Iprops> = (props) => {
  const { room } = props;
  const { t }: UseTranslationResponse = useTranslation();
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const cookies = new Cookies();
  // const dispatch = useDispatch<Dispatch<CompareRoomsActions>>();
  // const comparisonList = useSelector<ReducersList, RoomIndexRes[]>(
  //   (state) => state.compareRooms.compareRooms
  // );


  const typoVariant: ThemeStyle = width === 'sm' || width === 'xs' ? 'subtitle2' : 'h6';
  // const totalComfort = room.comforts.data.length - 4;
  // console.log(room)
  const avatarImg = room.media && room.media.data.length ? IMAGE_STORAGE_SM + room.media.data[0].image : room.avatar_image ? IMAGE_STORAGE_SM + room.avatar_image : './static/images/westay-avatar.jpg';
  return (
    <Paper elevation={0} className="roomCardListing">
      <Grid container className="roomCardListing__wrapper" spacing={0}>
        <Grid item xs={12} sm={4} md={4} lg={4} className="boxImg">
          <LazyLoad>
            <img
              src={`${avatarImg}`}
              className="imgSize swiper-lazy"
              alt={``}
            />
          </LazyLoad>
          {/* <Swiper {...settingSliderRoomCard}>
            {room.media.data.length > 0 ? (
              _.map(room.media.data, (o) => (
                <div key={o.image}>
                  <img
                    data-srcset={`${IMAGE_STORAGE_SM + o.image}`}
                    className="imgSize swiper-lazy"
                    alt={`Westay - Homestay cho người việt`}
                  />

                </div>
              ))
            ) : (
                <img src="./static/images/background.svg" className="imgSize" />
              )}
          </Swiper> */}
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} className="boxCard">
          <Grid className="cardWrapper">
            <Grid container className="cardContainer">
              <Link href={`/room/${room.id}`} target="_blank" className="boxLink">
                <Grid className="boxTitle">
                  <Grid>
                    <Typography variant="subtitle2" className="roomName">
                      {room.instant_book === 1 && (
                        <Tooltip
                          classes={{ tooltip: 'tooltip' }}
                          title={'Đặt phòng nhanh'}
                          placement="top">
                          <QuickBookIcon color="primary" style={{ marginRight: 5 }} />
                        </Tooltip>
                      )}
                      {room.details ? room.details.data[0].name : room.room_name}
                    </Typography>
                  </Grid>
                  <Grid className="roomSubtitle">
                    <span className="roomType">{room.room_type_txt}</span>
                    <Hidden xsDown>
                      <span className="dotAmenties">.</span>
                    </Hidden>

                    <span className="address">
                      {cookies.get('initLanguage') == 'en' ? cleanAccents(room.district.data.name) : room.district.data.name}
                      ,{' '}
                      {cookies.get('initLanguage') == 'en' ? cleanAccents(room.city.data.name) : room.city.data.name}
                    </span>
                  </Grid>
                  <Grid className="collectionAmenities">
                    {room!.max_guest} {t('rooms:guests')}
                    <span className="dotAmenties">.</span>
                    {room!.number_room} {t('rooms:rooms')}
                    <span className="dotAmenties">.</span>
                    {room!.number_bed} {t('rooms:beds')}
                    {room!.bathroom > 0 ? (
                      <Fragment>
                        <span className="dotAmenties">.</span>
                        {room!.bathroom} {t('rooms:bathrooms')}
                      </Fragment>
                    ) : (
                        ''
                      )}
                  </Grid>
                  {/*<Grid>*/}
                  {/*  <ul className="ul">*/}
                  {/*    {_.filter(room.comforts.data, (o, i) => {*/}
                  {/*      return (*/}
                  {/*        o.id === 20 || // air conditioner*/}
                  {/*        o.id === 9 || //wifi*/}
                  {/*        o.id === 27 || //swimming*/}
                  {/*        o.id === 10 //television*/}
                  {/*      );*/}
                  {/*    })*/}
                  {/*      .sort((a, b) => a.id - b.id)*/}
                  {/*      .map((o, i) => (*/}
                  {/*        <Tooltip*/}
                  {/*          key={i}*/}
                  {/*          title={o.details.data[0].name}*/}
                  {/*          placement="bottom"*/}
                  {/*          classes={{ tooltip: 'tooltip' }}>*/}
                  {/*          <li key={o.id} className="list">*/}
                  {/*            <SvgCustom icon={o.icon} />*/}
                  {/*          </li>*/}
                  {/*        </Tooltip>*/}
                  {/*      ))}*/}
                  {/*    {totalComfort > 0 ? (*/}
                  {/*      <Tooltip*/}
                  {/*        enterTouchDelay={300}*/}
                  {/*        classes={{ tooltip: 'tooltip' }}*/}
                  {/*        title={`${totalComfort} tiện nghi phòng khác`}*/}
                  {/*        placement="bottom">*/}
                  {/*        <li>*/}
                  {/*          <SvgCustom borderClass="borderBlue" text={`+${totalComfort}`} />*/}
                  {/*        </li>*/}
                  {/*      </Tooltip>*/}
                  {/*    ) : (*/}
                  {/*        ''*/}
                  {/*      )}*/}
                  {/*  </ul>*/}
                  {/*</Grid>*/}
                </Grid>
                {room!.total_review > 3 ? (
                  <Grid className="boxRating">
                    <Tooltip
                      classes={{ tooltip: 'tooltip' }}
                      title={room.avg_rating_txt}
                      placement="top">
                      <StarIcon className="starIcon" />
                    </Tooltip>
                    <Tooltip
                      classes={{ tooltip: 'tooltip' }}
                      title={room.avg_rating_txt}
                      placement="top">
                      <span className="avgRating">{room.avg_rating}</span>
                    </Tooltip>
                    <span className="totalReview">{`(${room.total_review} ${t(
                      'rooms:review'
                    )}) `}</span>
                  </Grid>
                ) : (
                    ''
                  )}

                <Grid className="boxPrice">
                  {room.is_discount === 1 ? (
                    <Grid className="discountPriceBadge">
                      <Grid className="discountBox">{t('rooms:discount')}</Grid>
                    </Grid>
                  ) : (
                      ''
                    )}
                  <Grid className="priceContainer">
                    {room.price_day > 0 ? (
                      <Grid className="dayPrice">
                        {room.is_discount === 1 ? (
                          <span className="discountPriceText">
                            {numeral(room.price_day).format('0,0')}
                            {t('shared:dayPrice')}
                          </span>
                        ) : (
                            ''
                          )}
                        <Typography className="priceText" variant={typoVariant}>
                          {numeral(
                            room.is_discount === 1 ? room.price_day_discount : room.price_day
                          ).format('0,0')}
                          {t('shared:dayPrice')}
                        </Typography>
                      </Grid>
                    ) : (
                        ''
                      )}

                    {(room.is_discount === 0 && room.price_hour > 0) ||
                      (room.is_discount === 1 && room.price_hour_discount > 0) ? (
                        <Grid className="hourPrice">
                          {room.is_discount === 1 ? (
                            <span className="discountPriceText">
                              {numeral(room.price_hour).format('0,0')}
                              {t('shared:hourPrice')}
                            </span>
                          ) : (
                              ''
                            )}
                          <Typography className="priceText" variant={typoVariant}>
                            {numeral(
                              room.is_discount === 1 ? room.price_hour_discount : room.price_hour
                            ).format('0,0')}
                            {t('shared:hourPrice')}
                          </Typography>
                        </Grid>
                      ) : (
                        ''
                      )}
                  </Grid>
                </Grid>
              </Link>
              <Grid className="boxSave">
                <FavoriteAnimation />
                {/* <Hidden smDown>
                  <Tooltip title={t('rooms:compareRooms')} placement="right-start">
                    <IconButton
                      aria-label="compare"
                      className="iconCompare"
                      onClick={() => handleCompareList(comparisonList, room, dispatch)}>
                      <FontAwesomeIcon size="1x" icon={faBalanceScaleRight} />
                    </IconButton>
                  </Tooltip>
                </Hidden> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoomCardListing;
