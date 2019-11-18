import Logo from '@/components/Toolbar/Logo';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC } from 'react';
interface IProps {
  title: string;
}

const HeaderNav: FC<IProps> = (props) => {
  const { title } = props;
  return (
    <Grid className="listing-header">
      <Grid className="listing-header-wrapper">
        <Grid className="logo">
          <Logo onlyImg={true} />
        </Grid>
        <Grid className="box-title">
          <Grid className="box-title-wrapper">
            <span className="title">{title}</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderNav;
