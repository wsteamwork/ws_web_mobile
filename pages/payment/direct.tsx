import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
import DirectPayment from '@/components/Payment/DirectPayment';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getInvoice } from '@/store/Redux/Reducers/Book/book';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { getCookieFromReq } from '@/utils/mixins';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Direct: NextPage = () => {
  const error = useSelector<ReducersList, boolean>((state) => state.book.error);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.dataInvoice.room.data);
  const lists = useSelector<ReducersList, PaymentBankListRes>((state) => state.book.dataInvoice);

  const { router } = useContext(GlobalContext);

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {/* {!!room && (
        <NextHead
          ogSitename="Westay - Đặt phòng homestay trực tuyến"
          title={`Thanh toán booking của phòng ${room.details.data[0].name}`}
          description={`Thanh toán booking của phòng ${room.details.data[0].name}`}
          url={`/payment/invoice/${lists.uuid}`}
          ogImage={`${IMAGE_STORAGE_LG}${room.media.data[0].image}`}></NextHead>
      )} */}

      {useMemo(
        () => (
          <Grid className="directPayment">
            <NavHeader></NavHeader>
            <GridContainer xs={11} md={8} classNameItem="directPayment__content">
              <DirectPayment></DirectPayment>
            </GridContainer>
            <Footer></Footer>
          </Grid>
        ),
        []
      )}
    </Fragment>
  );
};

Direct.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const res = await getInvoice(query, store.dispatch, initLanguage);
  return {};
};

export default Direct;
