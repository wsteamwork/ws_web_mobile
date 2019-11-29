import { TransitionCustom } from '@/components/Book/BookingForm';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTBookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
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

const DialogDetailLTBooking: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, idBooking, isLongterm, isNewBooking } = props;
  const [bookingDetail, setBookingDetail] = useState<LTBookingIndexRes>(null);
  const { width } = useContext(GlobalContext);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<any>(null);
  const [statusSnack, setStatusSnack] = useState<any>('success');

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };


  const getBookingDetail = async (): Promise<LTBookingIndexRes> => {
    const url = `long-term-bookings/${idBooking}?include=contracts`;
    try {
      const res: AxiosRes<LTBookingIndexRes> = await axios_merchant.get(url);
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
  }, [bookingDetail]);

  const submitApprovedBooking = async () => {
    try {
      const res = await axios_merchant.put(
        `long-term-contracts/minor-update/${idBooking}?option=status`,
        {
          status: 2
        }
      );
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

  const confirmCancelBooking = async () => {
    try {
      const res = await axios_merchant.put(
        `long-term-contracts/minor-update/${idBooking}?option=status`,
        {
          status: 5
        }
      );
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
      <Dialog aria-labelledby="dialog-detailLT-calendar"
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
                  {bookingDetail.latest_move_in}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Ngày đi</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.latest_move_out}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Số khách</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.guests.total_guests}
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                <Typography variant="subtitle2">Tiền đã cọc</Typography>
                <Typography variant="subtitle2">
                  {formatMoney(bookingDetail.deposit)} vnđ
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
                <Typography variant="subtitle2">Hình thức hợp đồng</Typography>
                <Typography variant="subtitle2">
                  {bookingDetail.contracts.data[0].status_txt}
                </Typography>
              </Grid>
            </Fragment>
          ) : (<SimpleLoader />)}
        </DialogContent>
        {isNewBooking && bookingDetail && bookingDetail.contracts.data[0].status === 1 ? (
          <DialogActions className={classes.boxAction}>
            <Button
              className={classes.btnConfirm}
              onClick={() => submitApprovedBooking()}
              autoFocus>
              Xác nhận đơn
            </Button>
            <Button
              className={classes.btnCancel}
              onClick={() => confirmCancelBooking()}
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

export default DialogDetailLTBooking;
