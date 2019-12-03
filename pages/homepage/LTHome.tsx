import FeatureRooms from '@/components/LTR/LTHome/FeatureRooms';
import NavTopSearch from '@/components/LTR/LTHome/NavTopSearch';
import RoomTypeList from '@/components/LTR/LTHome/RoomTypeList';
import TopDestination from '@/components/LTR/LTHome/TopDestinations';
import WhyChoosingUs from '@/components/LTR/LTHome/WhyChoosingUs';
import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import { getCookieFromReq } from '@/utils/mixins';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import HeadRoom from 'react-headroom';
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
  // const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
  //   (state) => state.roomHomepage.roomsHot
  // );
  // const renderRoomsHot = (room) => (
  //   <CardRoom2
  //     city={room.city}
  //     district={room.district}
  //     // instantbook={room.instant_book}
  //     roomID={room.id}
  //     roomName={room.about_room.name}
  //     roomType={room.accommodation_type_txt}
  //     roomImage={room.avatar.images[0].name}
  //     avg_rating={room.avg_rating}
  //   />
  // );

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
            }}
          >
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
        <Grid item xs={12}>
          <FeatureRooms />
        </Grid>
        <Grid item xs={12}>
          <WhyChoosingUs />
        </Grid>
        <Grid item xs={12}>
          <TopDestination />
        </Grid>

        <Grid style={{ padding: '14px 2px' }}>
          {/* <PropertyListHorizontalScroll
            itemWidth={'90%'}
            itemHeight={width == 'xs' ? 170 : 230}
            paddingItem={'0 0 20px'}
            gutter={6}
            headTitle={t('home:topHomestay')}
            listData={roomsHot}
            itemRender={renderRoomsHot}
          /> */}
        </Grid>

        <BottomNav />
      </Grid>

    </Fragment>
  );
};

LTHome.getInitialProps = async ({ store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  if (store.getState().roomHomepage.roomsHot.length === 0) {
    const res = await getRoomsHomepage(store.dispatch, initLanguage);
  }

  return {};
};

export default LTHome;
