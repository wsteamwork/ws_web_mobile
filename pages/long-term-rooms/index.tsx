import GridContainer from '@/components/Layout/Grid/Container';
import SearchHomeLT from '@/components/LTR/LTHome/SearchHomeLT';
import SelectLeaseTypeGlobal from '@/components/LTR/ReusableComponents/SelectLeaseTypeGlobal';
import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import FilterActions from '@/components/Rooms/FilterActions';
import MapAndListing from '@/components/Rooms/MapAndListing';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';
import { RoomIndexContext, RoomIndexReducer, RoomIndexStateInit } from '@/store/Context/Room/RoomListContext';
import { NextContextPage } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { getCookieFromReq } from '@/utils/mixins';
import { Grid, Hidden } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useReducer, useState } from 'react';
import HeadRoom from 'react-headroom';
// import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';
import { Sticky, StickyContainer } from 'react-sticky';
import { Dispatch } from 'redux';
const LongtermRooms: NextPage = () => {
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { isMapOpen } = state;
  const [hideSearchBar, setHideSearchBar] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  const dispatchLeaseType = useDispatch<Dispatch<SearchFilterAction>>();

  if (router.pathname.includes('/long-term-rooms')) {
    dispatchLeaseType({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: 1,
      leaseTypePathName: router.pathname.includes('/long-term-rooms') ? '/long-term-rooms' : '/rooms'
    });
  }
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Thuê phòng trực tuyến"
        title="Căn hộ, biệt thự cho thuê dài hạn - Westay - Westay.vn"
        description="Căn hộ, biệt thự cho thuê dài hạn - Westay - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/long-term-rooms" />

      <NavHeader isSticky={isMapOpen} />
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <div className="roomListing">
            <Hidden smDown implementation="css">
              <StickyContainer>
                {!isMapOpen ? (
                  <Sticky>
                    {({ style }) => (
                      <header style={{ ...style, zIndex: 99, transform: 'none' }}>
                        <HeadRoom
                          onPin={() => {
                            setHideSearchBar(false);
                          }}
                          onUnpin={() => {
                            setHideSearchBar(true);
                          }}>
                          <GridContainer
                            xs={11}
                            md={11}
                            lg={10}
                            classNameItem="searchRooms__overlay"
                            className="searchRooms">
                            <Grid container spacing={1}>
                              <Grid item>
                                <SelectLeaseTypeGlobal />
                              </Grid>
                              <Grid item xs>
                                <SearchHomeLT showPlaces={false} />
                              </Grid>
                            </Grid>
                          </GridContainer>
                        </HeadRoom>

                        <FilterActions hideSearchBar={hideSearchBar} showBookByHour={false} />
                      </header>
                    )}
                  </Sticky>
                ) : (
                    <FilterActions hideSearchBar={hideSearchBar} showBookByHour={false} />
                  )}

                <MapAndListing />
              </StickyContainer>
            </Hidden>
            <Hidden mdUp implementation="css">
              <GridContainer
                xs={11}
                md={11}
                lg={10}
                classNameItem="searchRooms__overlay"
                className="searchRooms">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={3}>
                    <SelectLeaseTypeGlobal />
                  </Grid>
                  <Grid item xs sm={9}>
                    <SearchHomeLT showPlaces={false} />
                  </Grid>
                </Grid>
              </GridContainer>
              <FilterActions showBookByHour={false} />
              {/* <LazyLoad offset={100}> */}
              <MapAndListing />
              {/* </LazyLoad> */}
              <BottomNav />
            </Hidden>
          </div>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

LongtermRooms.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  return {};
};

export default LongtermRooms;
