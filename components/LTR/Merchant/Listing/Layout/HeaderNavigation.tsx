import Logo from '@/components/Toolbar/Logo';
import SwitchLanguage from '@/components/Toolbar/SwitchLanguage';
import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC } from 'react';
interface IProps {
  title: string;
}

const HeaderNav: FC<IProps> = (props) => {
  const Hotline = (contact: string) => {
    window.location.href = `${contact}`;
  };
  const { title } = props;
  return (
    <Grid className="listing-header">
      <Grid className="listing-header-wrapper">
        <Grid className="logo">
          <Logo onlyImg={true} />
        </Grid>
        <Grid className="box-title" style={{ flexGrow: 1 }}>
          <Grid className="box-title-wrapper">
            <span className="title">{title}</span>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid className="box-title">
            <Grid className="box-title-wrapper">
              <SwitchLanguage />
              <span onClick={() => Hotline('tel:0917041849')} style={{ marginRight: 32 }}>Contact us: 0917 041 849</span>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default HeaderNav;
