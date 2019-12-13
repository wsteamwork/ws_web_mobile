import SettingInApp from '@/components/SettingInApp';
import React, { FC, Fragment, memo } from 'react';
import { withCookies } from 'react-cookie';
import { compose } from "recompose";

interface IProps {
}

const SlideDrawerMerchant: FC<IProps> = (props) => {

  return (
    <Fragment>
      <SettingInApp />
    </Fragment>
  );
};

export default compose<IProps, any>(
  withCookies,
  memo
)(SlideDrawerMerchant);
