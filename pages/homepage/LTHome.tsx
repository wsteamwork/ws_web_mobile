import ApartmentForRent from '@/components/LTR/LTHome/ApartmentForRent';
import BusinessTripRooms from '@/components/LTR/LTHome/BusinessTripRooms';
import EditorChoiceRooms from '@/components/LTR/LTHome/EditorChoiceRooms';
import ForFamilyRooms from '@/components/LTR/LTHome/ForFamilyRooms';
import GoodPrice from '@/components/LTR/LTHome/GoodPrice';
import HighEndRooms from '@/components/LTR/LTHome/HighEndRooms';
import NavTopSearch from '@/components/LTR/LTHome/NavTopSearch';
import RoomTypeList from '@/components/LTR/LTHome/RoomTypeList';
import StudioForRent from '@/components/LTR/LTHome/StudioForRent';
import TopDestination from '@/components/LTR/LTHome/TopDestinations';
import NextHead from '@/components/NextHead';
// import BottomNav from '@/components/Rooms/BottomNav';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import HeadRoom from 'react-headroom';
import LazyLoad from 'react-lazyload';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    }
  })
);
const LTHome: NextPage = (props) => {
  const classes = useStyles(props);

  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay cùng với nhiều ưu đãi hấp dẫn"
        url="https://westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg"
      />

      <Grid container justify="center">
        <Grid item xs={12}>
          <HeadRoom
            style={{
              WebkitTransition: 'all 0.35s ease-in-out',
              MozTransition: 'all 0.35s ease-in-out',
              OTransition: 'all 0.35s ease-in-out',
              transition: 'all 0.35s ease-in-out'
            }}>
            <Grid item xs={12} className={classes.boxWrapper}>
              <NavTopSearch />
            </Grid>
          </HeadRoom>
        </Grid>
        <Grid item xs={12}>
          <RoomTypeList />
        </Grid>
        <Grid item xs={12}>
          <TopDestination />
        </Grid>
        {/* <Grid item xs={12}>
          <LazyLoad>
            <FeatureRooms />
          </LazyLoad>
        </Grid> */}
        {/* <Grid item xs={12}>
          <LazyLoad>
            <WhyChoosingUs />
          </LazyLoad>
        </Grid> */}
        <Grid item xs={12}>
          <LazyLoad>
            <EditorChoiceRooms />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
          <LazyLoad>
            <ForFamilyRooms />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
          <LazyLoad>
            <BusinessTripRooms />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
          <LazyLoad>
            <HighEndRooms />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
          <LazyLoad>
            <ApartmentForRent />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
          <LazyLoad>
            <StudioForRent />
          </LazyLoad>
        </Grid>
        <Grid item xs={12}>
          <LazyLoad>
            <GoodPrice />
          </LazyLoad>
        </Grid>
        {/* <BottomNav /> */}
      </Grid>
    </Fragment>
  );
};

LTHome.getInitialProps = async ({ store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  // if (store.getState().roomHomepage.roomsHot.length === 0) {
  //   const res = await getRoomsHomepage(store.dispatch, initLanguage);
  // }

  return {};
};

export default LTHome;
