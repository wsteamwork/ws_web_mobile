import GridContainer from '@/components/Layout/Grid/Container';
import { useScheduleCompareRoom } from '@/components/Room/BoxBooking/DateRangeSingle/DateRangeCompareRoom';
import RenderDay from '@/components/Room/BoxBooking/DateRangeSingle/RenderDay';
import BoxMap from '@/components/Room/BoxMap';
import RoomAmenities from '@/components/Room/BoxRoomDetail/RoomAmenities';
import RoomBasic from '@/components/Room/BoxRoomDetail/RoomBasic';
import RoomReview from '@/components/Room/BoxRoomDetail/RoomReview';
import { TransitionCustom } from '@/components/Rooms/BottomNav';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { windowExist } from '@/store/Redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { AppBar, Dialog, Grid, IconButton, Theme, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import React, { FC, Fragment, useContext, useEffect } from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any,
  open?: boolean,
  handleClose: () => void
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    dialog: {
      zIndex: 9999,
    },
    appBar: {
      position: 'relative',
      backgroundColor: '#fff',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      textAlign: 'center',
      margin: '24px 0'
    },
    boxImage: {
      height: 300,
    },
    rowMargin: {
      marginTop: theme.spacing(4)
    },
    subTitle: {
      fontWeight: 700,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    }
  })
);

const DialogComparison: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose } = props;
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const comparisonList = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.compareRooms.compareRooms
  );
  const IDroom1 = comparisonList.length === 1 ? comparisonList[0].id : 0;
  const IDroom2 = comparisonList.length === 2 ? comparisonList[1].id : 0;

  const { isDayBlocked, isOutsideRange, priceByDay1, priceByDay2 } = useScheduleCompareRoom(IDroom1, IDroom2);
  const _renderDayContents1 = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay1} />;
  const _renderDayContents2 = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay2} />;


  const settings = {
    slidesPerView: 1,
    lazy: true,
  };

  useEffect(() => {

  }, [comparisonList]);

  return comparisonList.length === 2 ? (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={TransitionCustom} classes={{ root: classes.dialog }}>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            {t('rooms:compareRooms')}
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <GridContainer xs={11}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <div className={classNames("roomCardListing", classes.boxImage)}>
              <div className="roomCardListing__wrapper">
                <div className="boxImg">
                  <LazyLoad offset={windowExist ? window.innerHeight : 0}>
                    <Swiper {...settings}>
                      {comparisonList[0].media.data.length > 0 ? (
                        _.map(comparisonList[0].media.data, (o) => (
                          <img
                            key={o.image}
                            src={`${IMAGE_STORAGE_LG + o.image}`}
                            className="imgSize"
                            alt={`Westay - Homestay cho người việt`}
                          />
                        ))
                      ) : (
                          <img src="./static/images/background.svg" className="imgSize" />
                        )}
                    </Swiper>
                  </LazyLoad>
                </div>
              </div>
            </div>
            <div>
              <Grid container spacing={1} className={classes.wrapperBasic}>
                <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
                  <RoomBasic
                    name={comparisonList[0].details.data[0].name}
                    id={comparisonList[0].id} bathroom={comparisonList[0].bathroom}
                    max_additional_guest={comparisonList[0].max_additional_guest}
                    max_guest={comparisonList[0].max_guest}
                    number_bed={comparisonList[0].number_bed}
                    number_room={comparisonList[0].number_room}
                    totalComforts={comparisonList[0].comforts.data.length}
                    avg_rating={comparisonList[0].avg_rating}
                    avg_rating_txt={comparisonList[0].avg_rating_txt}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.wrapper}>
                <Grid item xs={12}>
                  <Grid item xs={12} sm={12} md={12} lg={11} xl={10} className={classes.rowMargin}>
                    <RoomAmenities room={comparisonList[0]} />
                  </Grid>

                  <div className="EmptyRoomCalendar">
                    <Typography variant="h5" className={classes.subTitle}>
                      {t('rooms:emptyCalender')}
                    </Typography>
                    <DayPickerRangeController
                      // daySize={widthCalendar}
                      startDate={moment()}
                      endDate={null}
                      onDatesChange={() => { }}
                      // onNextMonthClick={onNextMonthClick}
                      focusedInput={'startDate'}
                      onFocusChange={() => { }}
                      isDayBlocked={day => isDayBlocked(day, 'room1')}
                      numberOfMonths={width === 'xl' ? 2 : 1}
                      isOutsideRange={isOutsideRange}
                      hideKeyboardShortcutsPanel
                      renderDayContents={_renderDayContents1}
                      noBorder
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.wrapper}>
                <Grid item xs={12}>
                  <div className={classes.rowMargin}>
                    <RoomReview room={comparisonList[0]} />
                  </div>
                  <div className={classes.rowMargin}>
                    <BoxMap longitude={comparisonList[0].longitude}
                      latitude={comparisonList[0].latitude}
                      district={comparisonList[0].district.data.name}
                      city={comparisonList[0].city.data.name} />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classNames("roomCardListing", classes.boxImage)}>
              <div className="roomCardListing__wrapper">
                <div className="boxImg">
                  <LazyLoad offset={windowExist ? window.innerHeight : 0}>
                    <Swiper {...settings}>
                      {comparisonList[1].media.data.length > 0 ? (
                        _.map(comparisonList[1].media.data, (o) => (
                          <img
                            key={o.image}
                            src={`${IMAGE_STORAGE_LG + o.image}`}
                            className="imgSize"
                            alt={`Westay - Homestay cho người việt`}
                          />
                        ))
                      ) : (
                          <img src="./static/images/background.svg" className="imgSize" />
                        )}
                    </Swiper>
                  </LazyLoad>
                </div>
              </div>
            </div>
            <div>
              <Grid container spacing={1} className={classes.wrapperBasic}>
                <Grid item xs={12}>
                  <RoomBasic name={comparisonList[1].details.data[0].name}
                    id={comparisonList[1].id} bathroom={comparisonList[0].bathroom}
                    max_additional_guest={comparisonList[1].max_additional_guest}
                    max_guest={comparisonList[1].max_guest}
                    number_bed={comparisonList[1].number_bed}
                    number_room={comparisonList[1].number_room}
                    totalComforts={comparisonList[1].comforts.data.length}
                    avg_rating={comparisonList[1].avg_rating}
                    avg_rating_txt={comparisonList[1].avg_rating_txt} />
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.wrapper}>
                <Grid item xs={12}>
                  <div className={classes.rowMargin}>
                    <RoomAmenities room={comparisonList[1]} />
                  </div>
                  <div className="EmptyRoomCalendar">
                    <Typography variant="h5" className={classes.subTitle}>
                      {t('rooms:emptyCalender')}
                    </Typography>
                    <DayPickerRangeController
                      // daySize={widthCalendar}
                      startDate={moment()}
                      endDate={null}
                      onDatesChange={() => { }}
                      // onNextMonthClick={onNextMonthClick}
                      focusedInput={'startDate'}
                      onFocusChange={() => { }}
                      isDayBlocked={day => isDayBlocked(day, 'room2')}
                      numberOfMonths={width === 'xl' ? 2 : 1}
                      isOutsideRange={isOutsideRange}
                      hideKeyboardShortcutsPanel
                      renderDayContents={_renderDayContents2}
                      noBorder
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.wrapper}>
                <Grid item xs={12}>
                  <div className={classes.rowMargin}>
                    <RoomReview room={comparisonList[1]} showComment={false} />
                  </div>
                  <div className={classes.rowMargin}>
                    <BoxMap longitude={comparisonList[1].longitude}
                      latitude={comparisonList[1].latitude}
                      district={comparisonList[1].district.data.name}
                      city={comparisonList[1].city.data.name} />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </GridContainer>
    </Dialog>
  ) : <Fragment />;
};

export default DialogComparison;
