import ButtonGlobal from '@/components/ButtonGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { DetailsReducerAction, getListingDetails } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createStyles, Divider, Grid, Link, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 600
    },
    marginLabel: {
      margin: '24px 0'
    },
    marginTitle: {
      margin: '8px 0'
    },
    icon: {
      color: '#ffffff',
      backgroundColor: '#007DCC',
      border: '1.5px solid #007DCC',
      borderRadius: '50%'
    },
    sizeBtn: {
      fontSize: '1rem'
    }
  })
);
const ProcessListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.details.listing);
  const dispatch = useDispatch<Dispatch<DetailsReducerAction>>();
  useEffect(() => {
    if (!listing) {
      getListingDetails(id, dispatch);
    }
  }, []);
  const backToRoomList = () => {
    router.push('/host/room-list');
  };

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={8} md={6} lg={4} className={classes.marginLabel}>
          <Grid>
            <Typography variant="h6" component="h3" className={classes.title}>
              Đăng ký căn hộ của bạn đang thiếu thông tin
            </Typography>
            <Typography variant="subtitle1" component="p" className={classes.marginTitle}>
              Để hoàn thành đăng phòng trên Westay.vn và bắt đầu nhận khách, chúng tôi cần một vài
              thông tin chi tiết về căn phòng của bạn. Bạn có thể chỉnh sửa mọi thứ sau khi hoàn
              thành. Dưới đây là tiến trình đăng phòng của bạn:
            </Typography>
          </Grid>
          <Grid className={classes.marginLabel}>
            <Grid container item xs={12}>
              <Typography variant="h6" component="h3" className={classes.title}>
                Bước 1: Thông tin cơ bản
              </Typography>
              <Grid item xs={10}>
                <Typography variant="subtitle1" component="p" className={classes.marginTitle}>
                  Hình thức thuê, loại căn hộ, phòng ngủ, phòng tắm, địa chỉ
                </Typography>
                {/* <Link href={`/host/create-listing/${id}/basic`} className={classes.sizeBtn}> */}
                <Link href={`/host/create-listing/${id}/basic`} className={classes.sizeBtn}>
                  Cập nhật
                </Link>
              </Grid>
              <Grid container item xs={2} justify="flex-end">
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faCheckCircle}
                  size="3x"></FontAwesomeIcon>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.marginLabel} />
          <Grid>
            <Grid container item xs={12}>
              <Typography variant="h6" component="h3" className={classes.title}>
                Bước 2: Thông tin chi tiết
              </Typography>
              <Grid item xs={10}>
                <Typography variant="subtitle1" component="p" className={classes.marginTitle}>
                  Mô tả căn hộ, tiện nghi, hình ảnh, mô tả ảnh
                </Typography>
                {listing && listing.percent >= 70 ? (
                  <Link href={`/host/create-listing/${id}/detail`} className={classes.sizeBtn}>
                    Cập nhật
                  </Link>
                ) : (
                    ''
                  )}
                {listing && listing.percent >= 40 && listing.percent < 70 ? (
                  <Link href={`/host/create-listing/${id}/detail`} className={classes.sizeBtn}>
                    Tiếp tục
                  </Link>
                ) : (
                    ''
                  )}
              </Grid>
              {listing && listing.percent >= 70 ? (
                <Grid container item xs={2} justify="flex-end">
                  <FontAwesomeIcon
                    className={classes.icon}
                    icon={faCheckCircle}
                    size="3x"></FontAwesomeIcon>
                </Grid>
              ) : (
                  ''
                )}
            </Grid>
          </Grid>
          <Divider className={classes.marginLabel} />
          <Grid>
            <Grid container item xs={12}>
              <Typography variant="h6" component="h3" className={classes.title}>
                Bước 3: Chính sách và thiết lập giá
              </Typography>
              <Grid item xs={10}>
                <Typography variant="subtitle1" component="p" className={classes.marginTitle}>
                  Chính sách, giá căn hộ, giá dịch vụ
                </Typography>
                {listing && listing.percent === 100 ? (
                  <Link href={`/host/create-listing/${id}/price`} className={classes.sizeBtn}>
                    Cập nhật
                  </Link>
                ) : (
                    ''
                  )}
                {listing && listing.percent >= 70 && listing.percent < 100 ? (
                  <Link href={`/host/create-listing/${id}/price`} className={classes.sizeBtn}>
                    Tiếp tục
                  </Link>
                ) : (
                    ''
                  )}
              </Grid>
              {listing && listing.percent === 100 ? (
                <Grid container item xs={2} justify="flex-end">
                  <FontAwesomeIcon
                    className={classes.icon}
                    icon={faCheckCircle}
                    size="3x"></FontAwesomeIcon>
                </Grid>
              ) : (
                  ''
                )}
            </Grid>
          </Grid>
          <Divider className={classes.marginLabel} />
          <ButtonGlobal
            variant="contained"
            color="secondary"
            className={'buttonSubmit'}
            onClick={backToRoomList}>
            Quay lại
          </ButtonGlobal>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default ProcessListing;
