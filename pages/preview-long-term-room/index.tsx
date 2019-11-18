import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import BoxBookingLT from '@/components/LTR/LTRoom/BoxBookingLT';
import BoxBottomBooking from '@/components/LTR/LTRoom/BoxBottomBooking';
import BoxImageLT from '@/components/LTR/LTRoom/BoxImageLT';
import BoxLTRoomDetail from '@/components/LTR/LTRoom/BoxLTRoomDetail';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataLTRoom } from '@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { getCookieFromReq } from '@/utils/mixins';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const PreviewLongTermRoom: NextPage = () => {
  const { router } = useContext(GlobalContext);
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const isPreviewPage = router.pathname.includes('preview-long-term-room');
  const { t } = useTranslation();

  return (
    <Fragment>
      <NavHeader />

      {useMemo(
        () => (
          <Fragment>
            {ltroom && (
              <GridContainer xs={11} lg={10} xl={9} classNameItem="roomPage">
                <BoxImageLT
                  isPreviewPage={isPreviewPage}
                  livingrooms={isPreviewPage && !ltroom.livingrooms ? [] : ltroom.livingrooms}
                  kitchens={isPreviewPage && !ltroom.kitchens ? [] : ltroom.kitchens}
                  bathrooms={isPreviewPage && !ltroom.bathrooms ? [] : ltroom.bathrooms}
                  furnitures={isPreviewPage && !ltroom.furnitures ? [] : ltroom.furnitures}
                  bedrooms={isPreviewPage && !ltroom.bedrooms ? [] : ltroom.bedrooms}
                  cover_photo={isPreviewPage && !ltroom.cover_photo ? [] : ltroom.cover_photo}
                />
                <Grid container>
                  <Grid item xs={12} lg={8} xl={9}>
                    <BoxLTRoomDetail room={ltroom} />
                  </Grid>

                  <Grid item sm={12} md={11} lg={4} xl={3} className="roomPage__disabledBoxBooking roomPage__boxBooking">
                    <BoxBookingLT
                      priceBasic={ltroom.price_display}
                      id={ltroom.merchant.data.id}
                      avatar={ltroom.merchant.data.avatar}
                      avatar_url={ltroom.merchant.data.avatar_url}
                      name={ltroom.merchant.data.name}
                      number_room={ltroom.merchant.data.number_room}
                    />
                  </Grid>
                </Grid>
                <Grid container className="roomPage__disabledBoxBookingMoblie roomPage__boxBookingMoblie">
                  <BoxBottomBooking
                    priceBasic={ltroom.price_display}
                  />
                </Grid>
              </GridContainer>
            )}
          </Fragment>
        ), [ltroom])
      }
      <Footer />
    </Fragment>
  );
};

PreviewLongTermRoom.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const data = await getDataLTRoom(store.dispatch, query, initLanguage);
  return {};
};

export default PreviewLongTermRoom;
