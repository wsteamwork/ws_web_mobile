import ButtonGlobal from '@/components/ButtonGlobal';
import GridContainer from '@/components/Layout/Grid/Container';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList, ReducresActions } from '@/store/Redux/Reducers';
import { getUserBookingList } from '@/store/Redux/Reducers/Profile/profile';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { Pagination } from '@/types/Requests/ResponseTemplate';
import { formatMoney } from '@/utils/mixins';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Button, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import InsertDriveFileOutlined from '@material-ui/icons/InsertDriveFileOutlined';
import Rating from '@material-ui/lab/Rating';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import Link from 'next/link';
import PaginationS from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import React, { Dispatch, FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DialogBookingDetails from './DialogBookingDetails';
import DialogReviewDetails from './DialogReviewDetails';

interface IBookingList {
  status: number;
}

const BookingList: FC<IBookingList> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<ReducresActions>>();
  const { status } = props;
  const [openDialog, setOpenDialog] = useState<number>(0);
  const [openDialogReview, setOpenDialogReview] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);

  const bookings = useSelector<ReducersList, BookingIndexRes[]>((state) => state.iProfile.bookings);
  const metaBookings = useSelector<ReducersList, Pagination>(
    (state) => state.iProfile.metaBookings
  );

  if (bookings == null) {
    return <SimpleLoader />;
  }

  const getDataBooking = async () => {
    setLoading(true);

    try {
      const res = await getUserBookingList(props.status, currentPage);
      dispatch({ type: 'SET_DATA_STATUS_BOOKING', payload: res.data });
      dispatch({ type: 'SET_META_BOOKING', payload: res.meta });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataBooking();
  }, [currentPage]);

  const handleClick = (id: number) => {
    setOpenDialog(id);
  };

  const handleBookAgain = (id: number) => {
    router.push(`/room/${id}`);
  };

  const CancelBooking = (id: number) => {
    router.push(`/booking-cancel/${id}`);
  };

  const ChangePage = (current: number) => {
    setCurrentPage(current);
  };

  const toReview = (id: number) => {
    router.push(`/reviews/${id}`);
  };

  const ShowReview = (id: number) => {
    setOpenDialogReview(id);
  };

  const mapBookings = _.map(bookings, (i) => {
    const room = i.room.data;
    return (
      <GridContainer xs={12} lg={11} key={i.id} classNameItem="bookingListItem">
        <Paper elevation={0} classes={{ root: 'boxBooking' }}>
          <Grid container spacing={2} direction="row" justify="center">
            <Grid item xs={12} sm={4} md={4} lg={3} className={'boxImg'}>
              <img
                alt="image room"
                src={`${IMAGE_STORAGE_LG}${room.media.data[0].image}`}
                className={'imageRoom'}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              lg={6}
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start">
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6" className={'typoName'}>
                    {room!.details.data[0].name}
                  </Typography>
                </Grid>
                <Grid item className={'rowMargin ratingPro'}>
                  <Rating value={room.avg_rating} size="small" readOnly color="#FFC412"></Rating>

                  <span className={'spanViews'}>
                    {room!.total_review} {t('profile:bookingProfile:evaluate')}
                  </span>
                </Grid>
                <Grid item className={'rowMargin'}>
                  <span className={'txtAddress'}>
                    {/* <Location className={iconLocation} /> */}
                    {room!.details.data[0].address}
                  </span>
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Hidden
                  implementation="css"
                  lgDown={status == 2 || status == 5 || status == 1}
                  lgUp={status == 2 || status == 5 || status == 1}>
                  <Grid item className={'rowMargin'}>
                    {i.status_reviews == 1 ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => ShowReview(i.id)}>
                        {t('profile:bookingProfile:seeReview')}
                      </Button>
                    ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => toReview(i.id)}>
                          {t('profile:bookingProfile:review')}
                        </Button>
                      )}
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3} container direction="row" justify="space-around">
              <Grid item sm={12} container spacing={0}>
                <Grid item xs={6} sm>
                  <Grid item className={'timeBooking'}>
                    <Typography variant="button" style={{ fontWeight: 600 }}>
                      {t('profile:bookingProfile:From')}
                      <Hidden smUp implementation="css">
                        <span>: {moment(i.checkin).format('DD-MM-YYYY')}</span>
                      </Hidden>
                    </Typography>
                  </Grid>
                  <Hidden implementation="css" xsDown>
                    <Grid item container className={'timeBooking'}>
                      <Grid item>
                        <Typography className={'fontTime'}>
                          {moment(i.checkin).format('DD')} / {moment(i.checkin).format('MM')} /{' '}
                          {moment(i.checkin).format('Y')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item xs={6} sm>
                  <Grid item className={'borLeft'}>
                    <Typography variant="button" style={{ fontWeight: 600 }}>
                      {t('profile:bookingProfile:To')}
                      <Hidden implementation="css" smUp>
                        <span>: {moment(i.checkout).format('DD-MM-YYYY')}</span>
                      </Hidden>
                    </Typography>
                  </Grid>
                  <Hidden implementation="css" xsDown>
                    <Grid item container className={'borLeft'}>
                      <Grid item>
                        <Typography className={'fontTime'}>
                          {moment(i.checkout).format('DD')} / {moment(i.checkout).format('MM')} /{' '}
                          {moment(i.checkout).format('Y')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item sm={12} className={'typoTotal'}>
                <Typography variant="h6" align="right" className={'typoTotalFee'}>
                  <span>Total: </span>
                  <span> {formatMoney(i.total_fee)} </span>
                  <span> {t('shared:currency')} </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item container justify="space-around" xs={8} sm={4} md={4} lg={3}>
              <div className={'rowBottom'}>
                <Hidden
                  implementation="css"
                  lgDown={status == 2 || status == 1}
                  lgUp={status == 2 || status == 1}>
                  <Link href={`/room/${room.id}`}>
                    <a>
                      <Button color="primary">{t('profile:bookingProfile:reset')}</Button>
                    </a>
                  </Link>
                </Hidden>
                <Hidden
                  implementation="css"
                  lgDown={status == 4 || status == 5}
                  lgUp={status == 4 || status == 5}>
                  <Button color="inherit" onClick={() => CancelBooking(i.id)}>
                    {t('profile:bookingProfile:cancel')}
                  </Button>
                </Hidden>
              </div>
            </Grid>
            <Grid item container justify="flex-end" xs={4} sm={4} md={4} lg={3}>
              <div className={'rowBottom'}>
                <ButtonGlobal variant="contained" color="primary" onClick={() => handleClick(i.id)}>
                  {t('profile:bookingProfile:detail')}
                </ButtonGlobal>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <DialogBookingDetails stateOpen={openDialog} setStateOpen={setOpenDialog} dataBooking={i} />
        <DialogReviewDetails
          stateOpen={openDialogReview}
          setStateOpen={setOpenDialogReview}
          id_review={i.id}
          room_id={i.room_id}
        />
      </GridContainer>
    );
  });

  return (
    <Grid className="bookingList">
      {bookings.length > 0 && (
        <Fragment>
          {mapBookings}
          <div className={'boxPagination'}>
            <PaginationS
              className="rooms-pagination"
              locale={localeInfo}
              total={metaBookings!.pagination.total}
              pageSize={metaBookings!.pagination.per_page}
              current={currentPage}
              onChange={ChangePage}
            />
          </div>
        </Fragment>
      )}

      {isLoading && (
        <div className={'fakeData'}>
          <SimpleLoader width={100} height={100} />
        </div>
      )}

      {bookings.length === 0 && (
        <div className={'fakeData'}>
          <div style={{ textAlign: 'center' }}>
            <InsertDriveFileOutlined color="primary" className={'iconNote'} />
          </div>
          <Typography align="center" variant="h5" color="textSecondary">
            {t('profile:bookingProfile:listEmpty')}
          </Typography>
        </div>
      )}
    </Grid>
  );
};

export default BookingList;
