import React, { FC, Fragment, useContext } from 'react';
import { createStyles, Theme, Grid, Breadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import CancelPolicy from '@/components/LTR/Merchant/Listing/UpdateListing/UpdateComponentPolicy/UpdateCancelPolicy';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '@material-ui/core/Link';
import { GlobalContext } from '@/store/Context/GlobalContext';
interface IProps {
  classes?: any;
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

const UpdateCancelPolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  return (
    <Fragment>
      <NavHeader_Merchant />
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={9} md={7} lg={5} className={classes.marginLabel}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" className={classes.custom_link_bread} />}
            aria-label="breadcrumb">
            <Link href="/" className={classes.custom_link_bread}>
              Trang chủ
            </Link>
            <Link href="/host/room-list" className={classes.custom_link_bread}>
              Danh sách phòng
            </Link>
            <Link href={`/host/update-listing/${id}`} className={classes.custom_link_bread}>
              Cập nhật phòng
            </Link>
            <Typography color="textPrimary">Hình thức hủy phòng</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <CancelPolicy />
    </Fragment>
  );
};
export default UpdateCancelPolicy;
