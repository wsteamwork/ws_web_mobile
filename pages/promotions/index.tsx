import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { NextContextPage } from '@/store/Redux/Reducers';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import PromotionsComponent from '@/components/PromotionsComponent';
import { getDataPromotions } from '@/store/Redux/Reducers/promotion';
import { getCookieFromReq } from '@/utils/mixins';

const Promotions: NextPage = () => {
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Khuyến mãi | Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay cùng với nhiều ưu đãi hấp dẫn"
        url="https://westay.vn/promotions"
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>

      <NavHeader></NavHeader>
      <PromotionsComponent></PromotionsComponent>
      <Footer></Footer>
    </Fragment>
  );
};

Promotions.getInitialProps = async ({ store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const res = await getDataPromotions(store.dispatch, initLanguage);

  return {};
};

export default Promotions;
