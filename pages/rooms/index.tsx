import SearchComponent from '@/components/Home/SearchComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import SelectLeaseTypeGlobal from '@/components/LTR/ReusableComponents/SelectLeaseTypeGlobal';
import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import FilterActions from '@/components/Rooms/FilterActions';
import MapAndListing from '@/components/Rooms/MapAndListing';
import SearchMobile from '@/components/Rooms/SearchMobile';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';
import { RoomIndexContext, RoomIndexReducer, RoomIndexStateInit } from '@/store/Context/Room/RoomListContext';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { Grid, Hidden } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, { Fragment, useContext, useReducer, useState } from 'react';
import HeadRoom from 'react-headroom';
import { useDispatch } from 'react-redux';
import { Sticky, StickyContainer } from 'react-sticky';
import { Dispatch } from 'redux';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    rowMargin: {
      marginBottom: 50
    }
  })
);

const Rooms: NextPage = (props) => {
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);

  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { isMapOpen } = state;
  const [hideSearchBar, setHideSearchBar] = useState<boolean>(false);
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const dispatchLeaseType = useDispatch<Dispatch<SearchFilterAction>>();
  // const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  if (router.pathname.includes('/rooms')) {
    dispatchLeaseType({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: 0,
      leaseTypePathName: router.pathname.includes('/rooms') ? '/rooms' : '/long-term-rooms'
    });
  }

  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/rooms" />

      <NavHeader isSticky={isMapOpen} />
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
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
                                <SearchComponent />
                              </Grid>
                            </Grid>
                          </GridContainer>
                        </HeadRoom>

                        <FilterActions hideSearchBar={hideSearchBar} />
                      </header>
                    )}
                  </Sticky>
                ) : (
                    <Fragment>
                      {/* <GridContainer
                      xs={11}
                      md={10}
                      classNameItem="searchRooms__overlay"
                      className="searchRooms">
                      <SearchComponent />
                    </GridContainer> */}

                      <FilterActions hideSearchBar={hideSearchBar} />
                    </Fragment>
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
                {/*<SearchComponent />*/}
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <SelectLeaseTypeGlobal />
                  </Grid>
                  <Grid item xs={12}>
                    <SearchMobile />
                  </Grid>
                </Grid>
              </GridContainer>
              <FilterActions />
              <MapAndListing />
              <BottomNav />
            </Hidden>
          </div>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
