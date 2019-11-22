import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { NextPage } from 'next';
import React, { Fragment, useEffect, useState } from 'react';
import Antd_SearchInput from '@/components/LTR/ReusableComponents/SearchInput';
import SearchInput from '@/components/LTR/ReusableComponents/SearchInput';
import PropertyListHorizontalScroll from './PropertyListHorizontalScroll';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import { getRoomType } from '@/components/Rooms/FilterActions/RoomType/context';
import { Grid, Typography } from '@material-ui/core';
import { NumberRoomCity, RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import CardIntro from '@/components/Cards/CardIntro';
import { useSelector, useDispatch } from 'react-redux';
import { updateRouter } from '@/store/Context/utility';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { Dispatch } from 'redux';
import numeral from 'numeral';
import CardItem from '@/components/Cards/CardItem';
import BottomNav from '@/components/Rooms/BottomNav';
import CardRoom2 from '@/components/Cards/CardRoom2';

const LTHome: NextPage = () => {
  const [roomTypesData, setRoomTypesData] = useState<any[]>([]);
  const roomsCity = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.roomHomepage.roomsHot
  );
  console.log(roomsHot[0]);

  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();

  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const propertyImgs = ['house', 'apartment', 'villa', 'room', 'hotels'];

  useEffect(() => {
    getRoomType()
      .then((res) =>
        res.map((item, index) => ({
          ...item,
          img: `/static/images/property/${propertyImgs[index]}.jpg`
        }))
      )
      .then((list) => setRoomTypesData(list));
    // console.log(listing);
  }, []);

  const renderRoomTypeItem = (item) => (
    <Grid>
      <Grid className="propery-item-icon">
        <img className="item-icon" src={item.img}></img>
      </Grid>
      <Typography style={{ textAlign: 'center' }}>{item.value}</Typography>
    </Grid>
  );

  const renderCity = (city: NumberRoomCity) => (
    <div>
      <CardItem
        title={city.name_city}
        imgSrc={city.image}
        subTitle={'chỉ từ '}
        bigTitle={true}
        recommendedPrice={numeral(city.average_price).format('0,0')}
        // imgHeight={290}
        onClickCard={() => locationRoom(city.name_city)}
      />
    </div>
  );

  const renderDestinations = (city: NumberRoomCity) => (
    <div>
      <CardItem
        centerTitle={true}
        title={city.name_city}
        imgSrc={city.image}
        subTitle={'chỉ từ '}
        recommendedPrice={numeral(city.average_price).format('0,0')}
        onClickCard={() => locationRoom(city.name_city)}
      />
    </div>
  );
  const renderRoomsHot = (room) => (
    <CardRoom2
      city={room.city.data.name}
      district={room.district.data.name}
      // instantbook={room.instant_book}
      roomID={room.id}
      roomName={room.room_name}
      roomNumber={room.number_room}
      roomType={room.room_type_txt}
      roomImage={room.avatar_image}
      avg_rating={room.avg_rating}
    />
  );

  const locationRoom = (nameCity: string) => {
    updateRouter(`${leaseTypeGlobal} ? '/long-term-rooms' : '/rooms'`, true, 'name', nameCity);
    dispatch({
      type: 'SET_SEARCH_TEXT',
      searchText: nameCity
    });
  };

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

      <Grid xs={12} style={{ padding: '44px 0 100px' }}>
        <Grid style={{ padding: '14px 22px' }}>
          <SearchInput />
        </Grid>

        <PropertyListHorizontalScroll
          itemWidth={'25%'}
          gutter={11}
          listData={roomTypesData}
          itemRender={renderRoomTypeItem}
        />

        <PropertyListHorizontalScroll
          itemWidth={'100%'}
          gutter={11}
          listData={roomsCity}
          itemRender={renderCity}
        />

        <PropertyListHorizontalScroll
          itemWidth={'66%'}
          gutter={11}
          headTitle={'Popular Destinations'}
          listData={roomsCity}
          itemRender={renderDestinations}
        />
        <Grid style={{ padding: '14px 2px' }}>
          <PropertyListHorizontalScroll
            itemWidth={'100%'}
            itemHeight={200}
            gutter={11}
            headTitle={'Best Deals'}
            listData={roomsHot}
            itemRender={renderRoomsHot}
          />
          {/* <CardRoom2 /> */}
        </Grid>

        <BottomNav />
      </Grid>

      {/* <MetroGridImage /> */}
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
