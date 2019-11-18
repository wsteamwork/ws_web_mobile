import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { NextPage } from 'next';
import NavHeader from '@/components/Toolbar/NavHeader';
import { Grid } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import { GlobalContext } from '@/store/Context/GlobalContext';
import {
  BookingDetailContext,
  BookingDetailReducer,
  BookingDetailStateInit,
  getRoomBookingDetail
} from '@/store/Context/Booking/BookingDetailContext';
import { useSelector } from 'react-redux';
import { ReducersList, NextContextPage } from '@/store/Redux/Reducers';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import BookingInfoDetail from '@/components/Book/BookingInfoDetail';
import { getDataBook } from '@/store/Redux/Reducers/Book/book';
import SettingDetails from '@/components/Book/BookingForm/SettingDetails';
import RoomHotBook from '@/components/Book/BookingForm/RoomHotBook';
import BookingForm from '@/components/Book/BookingForm';
import NextHead from '@/components/NextHead';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { getCookieFromReq } from '@/utils/mixins';

const Book: NextPage = (props) => {
  const { width, router } = useContext(GlobalContext);
  const error = useSelector<ReducersList, boolean>((state) => state.book.error);
  const [state, dispatch] = useReducer(BookingDetailReducer, BookingDetailStateInit);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.room);
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.book.dataCalculate
  );

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  const isWide = width === 'lg' || width === 'xl' || width === 'md';
  const xsMode = width === 'xs';

  return (
    <Fragment>
      {!!room && !!dataCalculate && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename="Westay - Đặt phòng homestay trực tuyến"
          title={`Đặt phòng - ${room.details.data[0].name} ngay`}
          description={`Đặt phòng - ${room.details.data[0].name} ngay. Westay - Kênh đặt phòng Homestay trực tuyến`}
          url={`/book`}
          ogImage={`${IMAGE_STORAGE_LG}${dataCalculate.room_avatar}`}></NextHead>
      )}

      <NavHeader></NavHeader>

      <Grid className="book">
        <BookingDetailContext.Provider value={{ state, dispatch }}>
          <GridContainer xs={11} lg={9} className={'container'} spacing={0}>
            <Grid
              container
              spacing={xsMode ? 0 : 8}
              className={'marginContainer'}
              direction={isWide ? 'row' : 'column-reverse'}>
              <Grid item xl={8} lg={8} md={7} xs={12} className="formBooking">
                <SettingDetails />
                <RoomHotBook></RoomHotBook>
                <BookingForm></BookingForm>
              </Grid>
              <Grid item xl={4} lg={4} md={5} xs={12}>
                <BookingInfoDetail />
              </Grid>
            </Grid>
          </GridContainer>
        </BookingDetailContext.Provider>
      </Grid>
    </Fragment>
  );
};

Book.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const res = await getDataBook(query, store.dispatch, initLanguage);
  return {};
};

export default Book;
