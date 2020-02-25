import RoomListHost from '@/components/LTR/Merchant/Listing/RoomList';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { Breadcrumbs, Grid, Link, Theme, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    marginLabel: {
      marginTop: '24px'
    },
    custom_link_bread: {
      color: '#1d8df7'
    }
  })
);
const RoomList: NextPage = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [cookies] = useCookies(['_token']);

  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);
  const { router } = useContext(GlobalContext);

  useEffect(() => {
    !!error && router.push('/auth');
    !cookies._token && router.push('/auth');
  }, [error]);
  return (
    <Fragment>
      <NavHeader_Merchant />
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={11} md={10} lg={8} className={classes.marginLabel}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" className={classes.custom_link_bread} />}
            aria-label="breadcrumb">
            <Link href="/" className={classes.custom_link_bread}>
              {t('host:homePage')}
            </Link>
            <Typography color="textPrimary">{t('host:roomList')}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      {!!cookies._token ? (
        <RoomListHost />
      ) : ''}

    </Fragment>
  );
};

export default RoomList;
