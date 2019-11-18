import Footer from '@/components/Layout/FooterComponent';
import NextHead from '@/components/NextHead';
import MenuProfile from '@/components/Profile/MenuProfile';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getProfile } from '@/store/Redux/Reducers/Profile/profile';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { getCookieFromReq } from '@/utils/mixins';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const Profile: NextPage = () => {
  const [cookies] = useCookies(['_token']);

  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);
  const { router } = useContext(GlobalContext);

  useEffect(() => {
    !!error && router.push('/auth/signin');
    !cookies._token && router.push('/auth/signin');
  }, [error]);

  return (
    <Fragment>
      {!!profile && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename={`Westay - Đặt phòng homestay trực tuyến`}
          title={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
          description={`Thông tin cá nhân ${profile.name} | Westay - Đặt phòng homestay trực tuyến`}
          url={`/profile`}
          ogImage={profile.avatar_url}></NextHead>
      )}

      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <MenuProfile></MenuProfile>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

Profile.getInitialProps = async ({ req, store }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const token = getCookieFromReq(req, '_token');
  const res = await getProfile(store.dispatch, initLanguage, token);

  return {};
};
export default Profile;
