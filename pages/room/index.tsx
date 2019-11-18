import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
// import SearchMobile from '@/components/Rooms/SearchMobile';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import BoxBooking from '@/components/Room/BoxBooking';
import BoxImage from '@/components/Room/BoxImage';
// import BoxRecommend from '@/components/Room/BoxRecommend';
import BoxRoomDetail from '@/components/Room/BoxRoomDetail/index';
// import BoxSearch from '@/components/Room/BoxSearch';
import NavBottomBook from '@/components/Room/NavBottomBook';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomDetailsContext, RoomDetailsReducer, RoomDetailsStateInit } from '@/store/Context/Room/RoomDetailContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getCookieFromReq } from '@/utils/mixins';
// import { useVisitedRoom } from '@/utils/shared/useVisitedRoom';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
// // import LazyLoad, { forceCheck } from 'react-lazyload';

const Room: NextPage = () => {
  // forceCheck();
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { router } = useContext(GlobalContext);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const error = useSelector<ReducersList, boolean>((state) => state.roomPage.error);
  // const [] = useVisitedRoom();
  const dispatchLeaseType = useDispatch<Dispatch<SearchFilterAction>>();
  // const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  if (router.pathname.includes('/room')) {
    dispatchLeaseType({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: 0,
      leaseTypePathName: !router.pathname.includes('/room') ? '/long-term-room' : '/room'
    });
  }

  useEffect(() => {
    if (error || !room.status) router.push('/not-found-resource');

  }, [error]);

  if (error || !room.status) {
    return (
      <div>
        <NavHeader />
        <ContentPlaceHolder />
        <Footer />
      </div>
    )
  }

  return (
    <Fragment>
      {!!room && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename="Westay - Đặt phòng homestay trực tuyến"
          title={`${room.details.data[0].name} | Westay - Đặt phòng homestay trực tuyến`}
          description={`${room.room_type_txt} ${
            room.room_type == 3 ? 'nghỉ dưỡng' : 'tiện nghi'
            } ngay tại ${room.district.data.name}, ${
            room.city.data.name
            }. Đặt phòng ngay với Westay để có trải nghiệm độc đáo và tuyệt vời nhất.`}
          url={`https://westay.vn/room/${room.id}`}
          ogImage={`${IMAGE_STORAGE_SM}${room.media && room.media.data.length ? room.media.data[0].image : room.avatar_image}`}
        />
      )}

      <NavHeader />
      {useMemo(
        () => (
          <RoomDetailsContext.Provider value={{ state, dispatch }}>
            {room ? (
              <GridContainer xs={11} lg={10} xl={9} classNameItem="roomPage">
                {/*<Hidden mdUp implementation="css">*/}
                {/*   <SearchMobile /> */}
                {/*</Hidden>*/}

                {/* <Hidden mdDown implementation="css">
                  <BoxSearch />
                </Hidden> */}
                {/* <LazyLoad> */}
                <BoxImage />
                {/* </LazyLoad> */}
                <Grid container>
                  <Grid item xs={12} lg={8} xl={9}>
                    {/* <LazyLoad> */}
                    <BoxRoomDetail room={room} />
                    {/* </LazyLoad> */}

                  </Grid>

                  <Grid item sm={12} md={11} lg={4} xl={3} className="roomPage__boxBooking">
                    <BoxBooking />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <BoxRecommend />
                  </Grid> */}
                </Grid>
                <Grid container className="roomPage__boxBookingMoblie">
                  <NavBottomBook />
                </Grid>

              </GridContainer>
            ) : ''}
          </RoomDetailsContext.Provider>
        ),
        [state]
      )}
      <Footer />
    </Fragment>
  );
};

Room.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const data = await getDataRoom(store.dispatch, query, initLanguage);
  return {};
};

export default Room;
