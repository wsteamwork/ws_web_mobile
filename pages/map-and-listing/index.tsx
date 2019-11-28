import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import { GlobalContext } from '@/store/Context/GlobalContext';
import {
  RoomFilterContext,
  RoomFilterReducer,
  RoomFilterStateInit
} from '@/store/Context/Room/RoomFilterContext';
import {
  RoomIndexContext,
  RoomIndexReducer,
  RoomIndexStateInit
} from '@/store/Context/Room/RoomListContext';
import { NextContextPage } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { getCookieFromReq } from '@/utils/mixins';
import { Grid, createStyles, Theme } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useReducer, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import NavTop from '@/components/NavTop';
import SearchRoom from '@/components/SearchRoom';
import { makeStyles } from '@material-ui/styles';
import MapRoomListing from '@/components/Rooms/MapAndListing/MapRoomListing';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    boxSearch: {
      backgroundColor: '#ffffff',
      width: '100%'
    },
    boxRoomListing: {
      marginBottom: 50
    }
  })
);
const MapListing: NextPage = (props) => {
  const classes = useStyles(props);
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const [hideNavTop, setHideNavTop] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  useEffect(() => {
    setHideNavTop(false);
  }, [router]);
  const dispatchLeaseType = useDispatch<Dispatch<SearchFilterAction>>();

    if (router.pathname.includes('/long-term-rooms')) {
      dispatchLeaseType({
        type: 'setLeaseTypeGlobal',
        leaseTypeGlobal: 1,
        leaseTypePathName: router.pathname.includes('/long-term-rooms')
          ? '/long-term-rooms'
          : '/rooms'
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
        url="/map-and-listing"
      />

      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <Grid item xs={12} className={classes.boxSearch}>
            <Grid item xs={12} className={classes.boxWrapper}>
              <NavTop
                isHidden={hideNavTop}
                textCenter={'Bản đồ'}
                showLocationAction={false}
                showFilterAction={true}
              />
            </Grid>
            <Grid item xs={12}>
              <SearchRoom />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.boxRoomListing}>
            <Grid item xs={12}>
              <MapRoomListing />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <BottomNav />
          </Grid>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

MapListing.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  return {};
};

export default MapListing;
