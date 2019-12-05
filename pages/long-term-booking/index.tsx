import GridContainer from '@/components/Layout/Grid/Container';
import BookingForm from '@/components/LTR/LTBook/BookingForm';
import BookingInfoDetail from '@/components/LTR/LTBook/BookingInfoDetail';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getLTBookingData } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import { getCookieFromReq } from '@/utils/mixins';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment } from 'react';

const LongTermBook: NextPage = (props) => {
  //   const error = useSelector<ReducersList, boolean>((state) => state.book.error);
  // const LTBookingPriceCalculate = useSelector<ReducersList, LTBookingPriceCalculatorRes>(
  //   (state) => state.ltBooking.LTBookingPriceCalculate
  // );

  //   useEffect(() => {
  //     !!error && router.push('/error');
  //   }, [error]);
  return (
    <Fragment>
      <Grid className="book">
        <GridContainer xs={10} sm={9} className={'container'} spacing={0}>
          <Grid
            container
            spacing={1}
            className={'marginContainer'}
            >
            <Grid item xs={12}>
              <BookingInfoDetail />
            </Grid>
            <Grid item xs={12} className="formBooking">
              <BookingForm />
            </Grid>
          </Grid>
        </GridContainer>
      </Grid>
    </Fragment>
  );
};

LongTermBook.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const res = await getLTBookingData(query, store.dispatch, initLanguage);
  return {};
};

export default LongTermBook;
