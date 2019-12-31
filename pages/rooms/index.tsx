import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import MapAndListing from '@/components/Rooms/MapAndListing';
import SearchMobile from '@/components/Rooms/SearchMobile';
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
import { Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, { Fragment, useContext, useReducer, useState } from 'react';
import ButtonFilterRoom from '@/components/ButtonFilterRoom';
import { useTranslation } from 'react-i18next';
import NavTop from '@/components/NavTop';
import HeadRoom from 'react-headroom';
import ButtonChangeLeaseType from '@/components/ButtonChangeLeaseType';

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
      marginTop: 152,
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
          <Grid item xs={12} md={10} className={classes.boxSearch}>
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
                  textCenter={t('rooms:searchRooms:explore')}
                  handleBackAction={backHomePage}
                />
              </Grid>
            </HeadRoom>
            <Grid item xs={12}>
              <Grid item xs={11} className={classes.boxWrapper}>
                <SearchMobile />
              </Grid>
              <Grid item xs={12} className={classes.boxWrapper}>
                <ButtonFilterRoom />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.boxRoomListing}>
            <MapAndListing />
          </Grid>
          <Grid item xs={12}>
            <BottomNav />
          </Grid>
          <ButtonChangeLeaseType isHomePage={false}/>
        </RoomFilterContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default Rooms;
