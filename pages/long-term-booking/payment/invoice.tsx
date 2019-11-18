import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import BankList from '@/components/LTR/LTBook/LTPayment/BankList';
import PaymentInfo from '@/components/LTR/LTBook/LTPayment/PaymentInfo';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getLTInvoice } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import { getCookieFromReq } from '@/utils/mixins';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Invoice: NextPage = () => {
  const error = useSelector<ReducersList, boolean>((state) => state.ltBooking.LTPaymentError);
  // const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.dataInvoice.room.data);
  // const lists = useSelector<ReducersList, PaymentBankListRes>((state) => state.book.dataInvoice);

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
          <Fragment>
            <NavHeader></NavHeader>
            <GridContainer
              xs={11}
              md={10}
              className="paymentInvoice"
              classNameItem={'parentContainer'}>
              <Grid container spacing={2} className={'container'}>
                <Grid item xs={12} md={8} className={'info'}>
                  <BankList />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PaymentInfo />
                </Grid>
              </Grid>
            </GridContainer>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

Invoice.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const res = await getLTInvoice(query, store.dispatch, initLanguage);

  return {};
};

export default Invoice;
