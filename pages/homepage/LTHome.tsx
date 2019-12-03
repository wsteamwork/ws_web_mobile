import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { NextPage } from 'next';
import React, { Fragment, useEffect, useState, useContext } from 'react';
import Antd_SearchInput from '@/components/LTR/ReusableComponents/SearchInput';
import SearchInput from '@/components/LTR/ReusableComponents/SearchInput';
import PropertyListHorizontalScroll from './PropertyListHorizontalScroll';
import MetroGridImage from '@/components/Layout/MetroGridImage';
import { getRoomType } from '@/components/Rooms/FilterActions/RoomType/context';
import { Grid, Typography, Dialog, Slide } from '@material-ui/core';
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
import { getRoomsHomepage } from '@/store/Redux/Reducers/Home/roomHomepage';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useTranslation } from 'react-i18next';
import SearchDialog from '@/components/SearchDialog';
import BookingCalendar from '@/components/LTR/LTBook/BookingCalendar';
import { TransitionProps } from '@material-ui/core/transitions';

const LTHome: NextPage = () => {
  const { router, width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const [roomTypesData, setRoomTypesData] = useState<any[]>([]);
  const roomsCity = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.roomHomepage.roomsHot
  );
  const [openSearchDialog, setOpenSearchDialog] = React.useState<boolean>(false);
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

  const renderRoomTypeItem = (item, size) => (
    <Grid>
      <Grid className="propery-item-icon">
        <img className="item-icon" style={{ width: size, height: size }} src={item.img}></img>
      </Grid>
      <Typography style={{ textAlign: 'center' }}>{item.value}</Typography>
    </Grid>
  );

  const renderCity = (city: NumberRoomCity) => (
    <div>
      <CardItem
        title={city.name_city}
        imgSrc={city.image}
        subTitle={t('home:fromPrice')}
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
        subTitle={t('home:fromPrice')}
        recommendedPrice={numeral(city.average_price).format('0,0')}
        onClickCard={() => locationRoom(city.name_city)}
      />
    </div>
  );
  const renderRoomsHot = (room) => (
    <CardRoom2
      city={room.city}
      district={room.district}
      // instantbook={room.instant_book}
      roomID={room.id}
      roomName={room.about_room.name}
      roomType={room.accommodation_type_txt}
      roomImage={room.avatar.images[0].name}
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

  const handleOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
  };

  const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
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
          <SearchInput displayOnlyForModal onClick={handleOpenSearchDialog} />
        </Grid>

        <PropertyListHorizontalScroll
          itemWidth={width == 'sm' ? '20%' : '25%'}
          gutter={6}
          listData={roomTypesData}
          itemRender={renderRoomTypeItem}
          sizeIcon={width == 'sm' ? 100 : 65}
        />

        <PropertyListHorizontalScroll
          itemWidth={width == 'sm' || width == 'md' ? '50%' : '95%'}
          gutter={6}
          listData={roomsCity}
          itemRender={renderCity}
        />

        <PropertyListHorizontalScroll
          itemWidth={width == 'sm' || width == 'md' ? '33.3%' : '66%'}
          gutter={6}
          headTitle={t('home:topDestinations')}
          listData={roomsCity}
          itemRender={renderDestinations}
        />
        <Grid style={{ padding: '14px 2px' }}>
          <PropertyListHorizontalScroll
            itemWidth={'90%'}
            itemHeight={width == 'xs' ? 170 : 230}
            paddingItem={'0 0 20px'}
            gutter={6}
            headTitle={t('home:topHomestay')}
            listData={roomsHot}
            itemRender={renderRoomsHot}
          />
        </Grid>

        <BottomNav />
      </Grid>

      <SearchDialog handleClose={handleCloseSearchDialog} open={openSearchDialog} />
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
