import React, { Fragment, useEffect, useContext, useMemo } from 'react';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import { NextPage } from 'next';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { getReviews } from '@/store/Redux/Reducers/Profile/profile';
import { RoomReviewInfoRes } from '@/types/Requests/ReviewRoom/ReviewResponse';
import { useSelector } from 'react-redux';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import NextHead from '@/components/NextHead';
import ReviewRoom from '@/components/ReviewRoom';
import { GlobalContext } from '@/store/Context/GlobalContext';

const Reviews: NextPage = () => {
  const { router } = useContext(GlobalContext);
  const review = useSelector<ReducersList, RoomReviewInfoRes>((state) => state.iProfile.review);
  const errorReview = useSelector<ReducersList, string>((state) => state.iProfile.errorReview);

  useEffect(() => {
    if (!!errorReview) {
      process.browser && alert(errorReview);
      router.push('/error');
    }
  }, [errorReview]);

  return (
    <Fragment>
      {!!review && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename={`Westay - Đặt phòng homestay trực tuyến`}
          title={`Review phòng ${review.name} | Westay - Đặt phòng homestay trực tuyến`}
          description={`Review phòng ${review.name} | Westay - Đặt phòng homestay trực tuyến`}
          url={`/reviews/${review.booking_id}`}
          ogImage={`${IMAGE_STORAGE_LG}${review.image}`}></NextHead>
      )}

      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <ReviewRoom></ReviewRoom>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

Reviews.getInitialProps = async ({ req, store, query }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const token = getCookieFromReq(req, '_token') || query.token.toString();
  const res = await getReviews(store.dispatch, query.id, initLanguage, token);

  return {};
};

export default Reviews;
