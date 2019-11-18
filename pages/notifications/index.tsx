import Footer from '@/components/Layout/FooterComponent';
import Notifications from '@/components/Notifications';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
const Notification: NextPage = () => {
  const { router } = useContext(GlobalContext);
  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);

  useEffect(() => {
    !!error && router.push('/error');
  }, [error]);

  return (
    <Fragment>
      {useMemo(
        () => (
          <Fragment>
            <NavHeader></NavHeader>
            <Notifications></Notifications>
            <Footer></Footer>
          </Fragment>
        ),
        []
      )}
    </Fragment>
  );
};

export default Notification;

