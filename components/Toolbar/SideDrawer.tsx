import React, { FC, Fragment, memo, SetStateAction, Dispatch } from 'react';
import { withCookies } from 'react-cookie';
import { compose } from 'recompose';
import SettingInApp from '../SettingInApp';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const SideDrawer: FC<IProps> = (props) => {
  const { setOpen } = props;
  return (
    <Fragment>
      <SettingInApp />
    </Fragment>
  );
};

export default compose<IProps, any>(
  withCookies,
  memo
)(SideDrawer);
