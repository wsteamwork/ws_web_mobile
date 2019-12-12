import React, { FC, useState, useEffect, Dispatch, SyntheticEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Dialog, DialogTitle, Typography, DialogContent, Snackbar } from '@material-ui/core';
import { TransitionCustom } from '@/components/Book/BookingForm';
import { useTranslation } from 'react-i18next';
import { LTBookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import DateRangeMoveout from './DateRangeMoveout';
import moment, { Moment } from 'moment';
import {
  getRoomAvailableDate,
  LTRoomReducerAction
} from '@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer';
import { useDispatch } from 'react-redux';
import ButtonGlobal from '@/components/ButtonGlobal';
import { FocusedInputShape } from 'react-dates';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { axios_merchant, axios } from '@/utils/axiosInstance';
import { ScheduleRes } from '@/types/Requests/Calendar/CalendarRes';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { getLongTermBookingList, LongTermBookingAction } from '@/store/Redux/Reducers/Booking/long-term-booking';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
interface IProps {
  classes?: any;
  open: boolean;
  booking: LTBookingIndexRes;
  status?: string[];
  handleClose: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customDialog: {
      position: 'absolute',
      bottom: '0%',
      width: '95%',
      left: '50%',
      margin: '0',
      maxWidth: '98% !important',
      transform: 'translate(-50%, -2%)',
      borderRadius: 16,
      height: '480px'
    },
    customDialogTitle: {
      padding: '10px 0'
    },
    center: {
      textAlign: 'center',
      fontWeight: 600
    },
    btnSubmit: {
      marginTop: 30
    }
  })
);

const ReNewalBooking: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { handleClose, open, booking, status } = props;
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>('startDate');
  const [dataBlock, setDataBlock] = useState([]);
  const [date, setDate] = useState<Moment>(moment());
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<any>(null);
  const [statusSnack, setStatusSnack] = useState<any>('success');
  // const getDataBlock = async (): Promise<ScheduleRes> => {
  //   const url = `rooms/schedule/${booking.long_term_room_id}`;
  //   try {
  //     const res: AxiosRes<ScheduleRes> = await axios_merchant.get(url);
  //     setDataBlock(res.data.data.blocks);
  //   } catch (e) {
  //     return null;
  //   }
  // };
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  const dispatch2 = useDispatch<Dispatch<LongTermBookingAction>>();
  useEffect(() => {
    getRoomAvailableDate(
      booking.long_term_room_id,
      'en',
      moment(booking.current_contract.move_out).format(DEFAULT_DATE_FORMAT)
    ).then((data) => dispatch({ type: 'setAvailableDates', payload: data }));
    // getDataBlock();
  }, []);
  const handleSubmitRenewal = async () => {
    try {
      await axios.post(`long-term-bookings/contract-renewal/${booking.uuid}`, {
        move_out: moment(date).format(DEFAULT_DATE_FORMAT)
      });
      handleClose();
      setMessageSnack(t('longtermbooking:messageSuccessRenewal'));
      setOpenSnack(true);
      // getLongTermBookingList(dispatch2, status);
    } catch (error) {
      setMessageSnack(t('longtermbooking:messageErrorRenewal'));
      setStatusSnack('error');
      setOpenSnack(true);
    }
  };
  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10}>
        <Dialog
          scroll="body"
          TransitionComponent={TransitionCustom}
          open={open}
          classes={{
            paperScrollBody: classes.customDialog
          }}
          onClose={handleClose}>
          <DialogTitle
            disableTypography
            classes={{
              root: classes.customDialogTitle
            }}>
            <Typography variant="h6" className={classes.center}>
              {t('longtermbooking:chooseNextCheckout')}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid className="booking-calendar">
              <Grid className="booking-calendar__box-main">
                <Grid container className="box-main__wrapper">
                  <Grid item xs={12} lg={7} xl={6} className="calendar-picker">
                    <DateRangeMoveout
                      dataBlock={dataBlock}
                      booking={booking}
                      focusedInput={focusedInput}
                      setFocusedInput={setFocusedInput}
                      date={date}
                      setDate={setDate}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <ButtonGlobal
                  background="linear-gradient(to right, #667eea, #764ba2)"
                  variant="contained"
                  name="confirm-information"
                  size="large"
                  color="primary"
                  className={classes.btnSubmit}
                  onClick={handleSubmitRenewal}
                  type="submit">
                  {t('longtermbooking:confirmRenewal')}
                </ButtonGlobal>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}>
        <MySnackbarContentWrapper
          variant={statusSnack}
          message={messageSnack}
          onClose={handleCloseSnack}></MySnackbarContentWrapper>
      </Snackbar>
    </Grid>
  );
};
export default ReNewalBooking;
