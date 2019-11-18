import SearchHome from '@/components/Home/SearchComponent/SearchHome';
import FooterComponent from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import ListRoom from '@/components/ListRoom';
import NextHead from '@/components/NextHead';
import RoomCard from '@/components/RoomCard';
import SliderTypeApartment from '@/components/Slider/HomePage/SliderTypeApartment';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getCookieFromReq } from '@/utils/mixins';
import { Hidden } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { useSelector } from 'react-redux';

const Home: NextPage = () => {
  const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.roomHomepage.roomsHot
  );
  const renderRoom = (room) => <RoomCard city={room.city.data.name}
    district={room.district.data.name}
    instantbook={room.instant_book}
    roomID={room.id}
    roomName={room.room_name}
    roomNumber={room.number_room}
    roomType={room.room_type_txt}
    roomImage={room.avatar_image}
    price_day={room.price_day}
    price_hour={room.price_hour}
    total_review={room.total_review}
    avg_rating={room.avg_rating}
    isHomepage={true} />;
  const { t } = useTranslation();
  // const { width } = useContext<IGlobalContext>(GlobalContext);
  forceCheck();
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay cùng với nhiều ưu đãi hấp dẫn"
        url="https://westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg" />

      <GridContainer xs={12}>
        <LazyLoad>
          <SearchHome />
        </LazyLoad>
        {/* {width === 'lg' || width === 'xl' || width === 'md' ? ( */}
        <Hidden smDown implementation="css">
          <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
            <LazyLoad offset="150">
              <SliderTypeApartment />
            </LazyLoad>
            <LazyLoad offset="150">
              <MetroGridImage />
            </LazyLoad>
            <LazyLoad offset="150">
              <ListRoom
                roomData={roomsHot}
                usingSlider={true}
                title={t('home:editorChoice')}
                render={renderRoom}
              />

            </LazyLoad>
          </GridContainer>
        </Hidden>
        {/* ) : ''} */}
        {/* <HostBecome /> */}

        {/* <GridContainer xs={11} sm={11} md={11} lg={10} xl={10}>
          <BlogContainer />
        </GridContainer> */}
      </GridContainer>
      <LazyLoad offset="150">
        <FooterComponent />
      </LazyLoad>
    </Fragment>
  );
};

Home.getInitialProps = async ({ store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  if (store.getState().roomHomepage.roomsHot.length === 0) {
    const res = await getRoomsHomepage(store.dispatch, initLanguage);
  }

  return {};
};

export default Home;
