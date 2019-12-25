import React, { Fragment,FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded';
import BuildingListHost from '@/components/LTR/Merchant/Listing/BuildingList';
import { useCookies } from 'react-cookie';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    marginLabel: {
      marginTop: '24px'
    },
    custom_link_bread: {
      color: '#1d8df7'
    }
  })
);

const BuildingList: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [cookies] = useCookies(['_token']);

  return (
    <Fragment>
      <NavHeader_Merchant />
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={11} md={10} lg={8} className={classes.marginLabel}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" className={classes.custom_link_bread} />}
            aria-label="breadcrumb">
            <Link href="/" className={classes.custom_link_bread}>
              Trang chủ
            </Link>
            <Typography color="textPrimary">Danh sách tòa nhà</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      {!!cookies._token ? (
        // <BuildingList />
        <BuildingListHost />
      ) : ''}
    </Fragment>
  );
};

export default BuildingList;
