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
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { Grid, Hidden } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, { Fragment, useContext, useReducer, useState, useEffect } from 'react';
import HeadRoom from 'react-headroom';
import { useDispatch } from 'react-redux';
import { Sticky, StickyContainer } from 'react-sticky';
import { Dispatch } from 'redux';
import NavTop from '@/components/NavTop';
import ButtonFilterRoom from '@/components/ButtonFilterRoom';
import SearchRoom from '@/components/SearchRoom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    },
    boxSearch: {
      backgroundColor: '#ffffff',
      position: 'fixed',
      top: '0px',
      zIndex: 2,
      width: '100%'
    },
    boxRoomListing: {
      marginTop: 370,
      marginBottom: 50
    }
  })
);

const Rooms: NextPage = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const [hideNavTop, setHideNavTop] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  const backHomePage = () => {
    router.push('/');
  };
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/rooms"
      />
      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <Grid item xs={12} className={classes.boxSearch}>
            <HeadRoom
              style={{
                WebkitTransition: 'all 0.3s ease-in-out',
                MozTransition: 'all 0.3s ease-in-out',
                OTransition: 'all 0.3s ease-in-out',
                transition: 'all 0.3s ease-in-out'
              }}
              onPin={() => setHideNavTop(false)}
              onUnpin={() => setHideNavTop(true)}>
              <Grid item xs={12} className={classes.boxWrapper}>
                <NavTop
                  isHidden={hideNavTop}
                  handleBackAction={backHomePage}
                  textCenter={t('rooms:searchRooms:explore')}
                />
              </Grid>
            </HeadRoom>
            <Grid item xs={12}>
              <SearchRoom />
            </Grid>
            <Grid item xs={11} className={classes.boxWrapper}>
              <SearchComponent className="searchHome__content" showGuestRoom={true} />
            </Grid>
            <Grid item xs={12} className={classes.boxWrapper}>
              <ButtonFilterRoom />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.boxRoomListing}>
            <MapAndListing />
          </Grid>
          <Grid item xs={12}>
            <BottomNav />
          </Grid>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
