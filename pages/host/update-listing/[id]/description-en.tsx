import Description from '@/components/LTR/Merchant/Listing/UpdateListing/UpdateComponentDetails/UpdateDescriptionEN';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Breadcrumbs, createStyles, Grid, Theme, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext } from 'react';
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

const UpdateDescriptionEN: FC<IProps> = (props) => {
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
            <Typography color="textPrimary">Mô tả căn hộ</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Description />
    </Fragment>
  );
};
export default UpdateDescriptionEN;
