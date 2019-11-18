import Footer from '@/components/Layout/FooterComponent';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import MainProfile from '@/components/UserProfile/MainProfile';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataViewProfile } from '@/store/Redux/Reducers/Profile/userProfile';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { getCookieFromReq } from '@/utils/mixins';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const UserPage: NextPage = (props) => {
  const { router } = useContext(GlobalContext);
  const profile = useSelector<ReducersList, ProfileViewInfoRes>(
    (state) => state.userProfile.profile
  );
  const error = useSelector<ReducersList, boolean>((state) => state.userProfile.error);

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {useMemo(
        () =>
          !!profile && (
            <NextHead
              googleMapApiRequire={false}
              ogSitename={`Westay - Đặt phòng homestay trực tuyến`}
              title={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
              description={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
              url={`/user/${profile.id}`}
              ogImage={profile.avatar_url}></NextHead>
          ),
        [profile]
      )}

      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <MainProfile></MainProfile>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

UserPage.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  if (!store.getState().iProfile.profile) {
    const res = await getDataViewProfile(query.id, store.dispatch, initLanguage);
  }

  return {};
};

export default UserPage;
