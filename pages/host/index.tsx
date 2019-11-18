import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import 'react-dates/initialize';
import { useSelector } from 'react-redux';

const Host: NextPage = () => {
  const [cookies] = useCookies(['_token']);

  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);
  // const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);
  const { router } = useContext(GlobalContext);

  if (cookies) {
    router.push('/host/room-list');
  }
  useEffect(() => {
    !!error && router.push('/auth/signin');
    !cookies._token && router.push('/auth/signin');
  }, [error]);
  // const _renderDayContents = (day: Moment) => <RenderDay day={day} priceByDay={priceByDay} />;
  return (
    <Fragment>

      {/* <NavHeader_Merchant />
      <ButtonGlobal
        variant="contained"
        name="confirm-information"
        size="large"
        color="primary"
      >
      </ButtonGlobal> */}


    </Fragment>
  );
};

// Host.getInitialProps = async ({ store, query, req }: NextContextPage) => {
//   const initLanguage = getCookieFromReq(req, 'initLanguage');

// const data = await getDataRoom(store.dispatch, query, initLanguage);
//   return {};
// };

export default Host;
