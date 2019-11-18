import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import { Grid } from '@material-ui/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const Failed: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        description="Đặt phòng homestay - Westay - Westay.vn - Westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg"
        url="https://westay.vn/payment/failed"></NextHead>

      <Grid className="paymentSuccess">
        <NavHeader></NavHeader>
        <GridContainer xs={11} className={'content'}>
          <Grid container spacing={0} className={'content'}>
            <h1 className={'textContent'}>{t('payment:success:paymentFailed')}</h1>
            <p className={'textContent'}>{t('payment:success:contact')}</p>
            <Link href="/">
              <a className={'textContent'}>{t('payment:success:backHome')}</a>
            </Link>
          </Grid>
        </GridContainer>
        <Footer></Footer>
      </Grid>
    </Fragment>
  );
};

export default Failed;
