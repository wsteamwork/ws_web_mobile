import GridContainer from '@/components/Layout/Grid/Container';
import BookingTabs from '@/components/LTR/BookingTabs';
import NavTop from '@/components/NavTop';
import NextHead from '@/components/NextHead';
import BottomNav from '@/components/Rooms/BottomNav';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { createStyles, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
const LongtermBookings: NextPage = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { router } = useContext(GlobalContext);
  const cookies = new Cookies();
  const isLogin = !!cookies.get('_token');
  const backHomePage = () => {
    router.push('/');
  };
  useEffect(() => {
    if (!isLogin) {
      router.push('/auth');
    }
  }, [isLogin])
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Thuê phòng trực tuyến"
        title="Căn hộ, biệt thự cho thuê dài hạn - Westay - Westay.vn"
        description="Căn hộ, biệt thự cho thuê dài hạn - Westay - Westay.vn"
        ogImage="/static/favicon.ico"
        url="/long-term-bookings"
      />
      <Grid item xs={12} className={classes.boxWrapper}>
        <NavTop
          isHidden={false}
          textCenter={t('book:bookings')}
          handleBackAction={backHomePage}
          showFavoriteAction={false}
        />
      </Grid>
      <GridContainer xs={11} className={classes.boxWrapper}>
        <BookingTabs />
      </GridContainer>
      <Grid item xs={12}>
        <BottomNav inBookingLT={true}/>
      </Grid>
    </Fragment>
  );
};

LongtermBookings.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  return {};
};
export default withCookies(LongtermBookings);
