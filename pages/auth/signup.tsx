import FormSignup from '@/components/Auth/Signup/FormSignup';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import React, { Fragment } from 'react';

const Signup = () => {
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/signup"
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>

      <NavHeader></NavHeader>

      <GridContainer xs={11} md={8} lg={4} className="pageSignup">
        <FormSignup></FormSignup>
      </GridContainer>
    </Fragment>
  );
};

export default Signup;
