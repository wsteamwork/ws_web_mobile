import React, { Fragment, useMemo } from 'react';
import { NextPage } from 'next';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getPromotionsById } from '@/store/Redux/Reducers/promotion';
import { useSelector } from 'react-redux';
import { PromotionRes } from '@/types/Requests/Promotion/PromotionResponse';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import PromotionComponent from '@/components/PromotionComponent';
import { getCookieFromReq } from '@/utils/mixins';

const Promotion: NextPage = () => {
  const promotion = useSelector<ReducersList, PromotionRes>((state) => state.promotion.promotion);

  return (
    <Fragment>
      {!!promotion && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename="Westay - Đặt phòng homestay trực tuyến"
          title={`${promotion.name} | Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay`}
          description={`${promotion.name} | Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay`}
          url="https://westay.vn/promotions"
          ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>
      )}

      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <PromotionComponent></PromotionComponent>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

Promotion.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const res = await getPromotionsById(store.dispatch, query.id, initLanguage);
  return {};
};

export default Promotion;
