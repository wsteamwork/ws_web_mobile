import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import { getCookieFromReq } from '@/utils/mixins';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import LTHome from './homepage/LTHome';

const Home: NextPage = () => {
  // const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
  //   (state) => state.roomHomepage.roomsHot
  // );
  // const renderRoom = (room) => <RoomCard city={room.city.data.name}
  //   district={room.district.data.name}
  //   instantbook={room.instant_book}
  //   roomID={room.id}
  //   roomName={room.room_name}
  //   roomNumber={room.number_room}
  //   roomType={room.room_type_txt}
  //   roomImage={room.avatar_image}
  //   price_day={room.price_day}
  //   price_hour={room.price_hour}
  //   total_review={room.total_review}
  //   avg_rating={room.avg_rating}
  //   isHomepage={true} />;
  // const { t } = useTranslation();
  // // const { width } = useContext<IGlobalContext>(GlobalContext);
  // forceCheck();
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay cùng với nhiều ưu đãi hấp dẫn"
        url="https://westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg" />

      <Grid container justify="center" style={{ marginBottom: 100 }}>
        <Grid item xs={12} md={10}>
          <LTHome />
          <BottomNav />
        </Grid>
      </Grid>
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
