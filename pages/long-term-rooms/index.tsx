import ButtonChangeLeaseType from '@/components/ButtonChangeLeaseType';
import ButtonFilterRoom from '@/components/ButtonFilterRoom';
import GridContainer from '@/components/Layout/Grid/Container';
import NavTop from '@/components/NavTop';
import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import MapAndListing from '@/components/Rooms/MapAndListing';
import SearchRoom from '@/components/SearchRoom';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';
import { RoomIndexContext, RoomIndexReducer, RoomIndexStateInit } from '@/store/Context/Room/RoomListContext';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { createStyles, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useReducer, useState } from 'react';
import HeadRoom from 'react-headroom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    boxSearch: {
      backgroundColor: '#ffffff',
      position: 'fixed',
      top: '0px',
      zIndex: 2,
      width: '100%'
    },
    boxSearchMap: {
      backgroundColor: '#ffffff',
      width: '100%'
    },
    boxRoomListing: {
      marginTop: 200,
      marginBottom: 50
    },
    boxMapListing: {
      marginBottom: 50
    }
  })
);
const LongtermRooms: NextPage = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RoomIndexReducer, RoomIndexStateInit);
  const { isMapOpen } = state;
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const [hideNavTop, setHideNavTop] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  useEffect(() => {
    setHideNavTop(false);
  }, [router]);
  const handleOpenMap = () => {
    dispatch({ type: 'setMapOpen', isMapOpen: true });
  };
  const backRoomList = () => {
    dispatch({ type: 'setMapOpen', isMapOpen: false });
  };
  const backHomePage = () => {
    router.push('/');
  };
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Thuê phòng trực tuyến"
        title="Căn hộ, biệt thự cho thuê dài hạn - Westay - Westay.vn"
        description="Căn hộ, biệt thự cho thuê dài hạn - Westay - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/long-term-rooms"
      />

      <RoomIndexContext.Provider value={{ state, dispatch }}>
        <RoomFilterContext.Provider
          value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
          <GridContainer xs={12} md={10}>
            <Grid
              item
              xs={12}
              md={isMapOpen ? 12 : 10}
              className={isMapOpen ? classes.boxSearchMap : classes.boxSearch}>
              {!isMapOpen ? (
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
                      handleLocationAction={handleOpenMap}
                      showLocationAction={true}
                    />
                  </Grid>
                </HeadRoom>
              ) : (
                <Grid item xs={12} className={classes.boxWrapper}>
                  <NavTop
                    isHidden={false}
                    handleBackAction={backRoomList}
                    textCenter={t('rooms:map')}
                    showLocationAction={false}
                    showFilterAction={true}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <SearchRoom />
              </Grid>
              {!isMapOpen ? (
                <Grid item xs={12} className={classes.boxWrapper}>
                  <ButtonFilterRoom />
                </Grid>
              ) : (
                ''
              )}
            </Grid>
            <Grid
              item
              xs={12}
              className={isMapOpen ? classes.boxMapListing : classes.boxRoomListing}>
              <Grid item xs={12}>
                <MapAndListing />
              </Grid>
            </Grid>
          </GridContainer>
          <Grid item xs={12}>
            <BottomNav />
          </Grid>
          <ButtonChangeLeaseType isHomePage={false}/>
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
