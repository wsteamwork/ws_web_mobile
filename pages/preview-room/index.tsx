import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import BoxBooking from '@/components/Room/BoxBooking';
import BoxImage from '@/components/Room/BoxImage';
import BoxRoomDetail from '@/components/Room/BoxRoomDetail';
import NavBottomBook from '@/components/Room/NavBottomBook';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomDetailsContext, RoomDetailsReducer, RoomDetailsStateInit } from '@/store/Context/Room/RoomDetailContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataRoom } from '@/store/Redux/Reducers/Room/roomReducer';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getCookieFromReq } from '@/utils/mixins';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useReducer } from 'react';
import { useSelector } from 'react-redux';
const PreviewRoom: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { router } = useContext(GlobalContext);
  const isPreviewPage = router.pathname.includes('preview-room');
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  return (
    <Fragment>
      <NavHeader />

      <RoomDetailsContext.Provider value={{ state, dispatch }}>
        <GridContainer xs={11} lg={10} xl={9} classNameItem="roomPage">
          <BoxImage isPreview={isPreviewPage} />

          <Grid container>
            <Grid item xs={12} lg={8} xl={9}>
              <BoxRoomDetail room={room} />
            </Grid>

            <Grid
              item
              sm={12}
              md={11}
              lg={4}
              xl={3}
              className="roomPage__disabledBoxBooking roomPage__boxBooking">
              <BoxBooking />
            </Grid>
          </Grid>
          <Grid container className="roomPage__disabledBoxBookingMoblie roomPage__boxBookingMoblie">
            <NavBottomBook />
          </Grid>
        </GridContainer>
      </RoomDetailsContext.Provider>

      <Footer />
    </Fragment>
  );
};
//
PreviewRoom.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const data = await getDataRoom(store.dispatch, query, initLanguage);

  return {};
};

export default PreviewRoom;
