import { TransitionCustom } from '@/components/Book/BookingForm';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { formatMoney } from '@/utils/mixins';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Snackbar, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, SyntheticEvent, useContext, useEffect, useState } from 'react';

interface IProps {
  classes?: any,
  open: boolean,
  handleClose: () => void,
  idBooking: number,
  isLongterm: boolean,
  isNewBooking: boolean,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxTitle: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    root: {
      padding: '16px 24px',
      borderRadius: 16,
      minWidth: 400,
    },
    boxContent: {
      minHeight: 64,
      padding: 0
    },
    boxAction: {
      justifyContent: 'space-around',
      marginTop: 16
    },
    wrapperPaymentXs: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    detailPrice: {
      margin: '16px 0',
      fontWeight: theme.typography.fontWeightBold
    },
    btnCancel: {
      color: '#f44336',
      textTransform: 'inherit',
    },
    btnConfirm: {
      color: '#00c853',
      textTransform: 'inherit',
    },
    divider: {
      margin: '8px 0'
    }
  })
);

const DialogDetailBooking: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, idBooking, isLongterm, isNewBooking } = props;
  const [bookingDetail, setBookingDetail] = useState<BookingIndexRes>(null);
  const { width } = useContext(GlobalContext);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('');
  const [statusSnack, setStatusSnack] = useState<any>('success');

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const getBookingDetail = async (): Promise<BookingIndexRes> => {
    const url = `bookings/${idBooking}`;
    try {
      const res: AxiosRes<BookingIndexRes> = await axios_merchant.get(url);
      setBookingDetail(res.data.data);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (!!idBooking) {
      getBookingDetail();
    }
  }, [isNewBooking, idBooking, openSnack]);

  useEffect(() => {
  }, [bookingDetail, openSnack]);

  const submitApprovedBooking = async (id: number) => {
    try {
      const res = await axios_merchant.put(`bookings/status-update/${id}?option=status`, {
        status: 2
      });
      setStatusSnack('success');
      setMessageSnack('Đơn đặt phòng được xác nhận thành công !');
      setOpenSnack(true);
    } catch (error) {
      if (error) {
        setMessageSnack('Đơn đặt phòng chưa được xác nhận !');
        setStatusSnack('error');
        setOpenSnack(true);
      }
    }
  };

  const confirmCancelBooking = async (id: number) => {
    try {
      const res = await axios_merchant.post(`bookings/cancel-booking/${id}`, {
        code: 3, //"Phòng không còn trống"
        note: ''
      });
      if (res) {
        setMessageSnack('Đơn đặt phòng được hủy thành công !');
        setOpenSnack(true);
      }
    } catch (error) {
      if (error) {
        setMessageSnack('Đơn đặt phòng chưa được hủy !');
        setStatusSnack('error');
        setOpenSnack(true);
      }
    }
  };

  return (
    <Fragment>
      <Dialog aria-labelledby="dialog-detail-calendar"
        scroll="body"
        maxWidth={'sm'}
        TransitionComponent={TransitionCustom}
        fullScreen={width === 'xs' || width === 'sm'}
        onClose={handleClose}
        open={open}
        classes={{ paper: classes.root }}
      >
        <DialogTitle disableTypography className={classes.boxTitle}>
          <Typography variant="h6">Thông tin booking</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.boxContent}>
          {bookingDetail ? (
            <Fragment>
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2" className={classes.detailPrice}>
                  Thông tin đặt phòng
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Ngày đến</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.checkin}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Ngày đi</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.checkout}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Số khách</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.number_of_guests}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Giá phòng</Typography>
                <Typography variant="subtitle2">
                  {formatMoney(bookingDetail.price_original)} vnđ
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Phụ thu khách</Typography>
                <Typography variant="subtitle2">
                  {formatMoney(bookingDetail.additional_fee)} vnđ
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Giảm giá</Typography>
                <Typography variant="subtitle2">
                  {formatMoney(bookingDetail.price_discount)} vnđ
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Dọn dẹp</Typography>
                <Typography variant="subtitle2">
                  {formatMoney(bookingDetail.service_fee)} vnđ
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Tổng cộng</Typography>
                <Typography variant="subtitle2">
                  {formatMoney(bookingDetail.total_fee)} vnđ
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2" className={classes.detailPrice}>
                  Thông tin khách
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Họ Tên</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.name}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Số điện thoại</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.phone}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Email</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.email}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Trạng thái thanh toán</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.payment_status_txt}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Hình thức thanh toán</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.payment_method_txt}
                </Typography>
              </Grid>
            </Fragment>
          ) : (<SimpleLoader />)}
        </DialogContent>
        {isNewBooking && bookingDetail && bookingDetail.status === 1 ? (
          <DialogActions className={classes.boxAction}>
            <Button
              className={classes.btnConfirm}
              onClick={() => submitApprovedBooking(idBooking)}
              autoFocus>
              Xác nhận đơn
            </Button>
            <Button
              className={classes.btnCancel}
              onClick={() => confirmCancelBooking(idBooking)}
              autoFocus>
              Hủy đơn
            </Button>
          </DialogActions>
        ) : ''}
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}>
        <MySnackbarContentWrapper
          variant={statusSnack}
          message={messageSnack}
          onClose={handleCloseSnack} />
      </Snackbar>
    </Fragment>
  );
};

export default DialogDetailBooking;
