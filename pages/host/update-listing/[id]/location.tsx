import React, { FC, Fragment, useContext } from 'react';
import { createStyles, Theme, Grid, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import Location from '@/components/LTR/Merchant/Listing/UpdateListing/UpdateComponentDetails/UpdateLocation';
import { GlobalContext } from '@/store/Context/GlobalContext';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NextHead from '@/components/NextHead';
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

const UpdateNumberGuest: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={true}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/host/create-listing"
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>
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
            <Typography color="textPrimary">Địa chỉ căn hộ</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Location />
    </Fragment>
  );
};
export default UpdateNumberGuest;
