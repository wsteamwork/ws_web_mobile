import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import {
  getDataUpdateListing,
  UpdateDetailsActions,
  UpdateDetailsState
} from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { Grid, Typography, FormControl, RadioGroup } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, {
  FC,
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
  SyntheticEvent
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
import RadioCustom from '@/components/LTR/ReusableComponents/RadioCustom';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: '16px'
    },
    marginContent: {
      marginLeft: '30px'
    },
    subTitle: {
      fontSize: 16,
      marginTop: 8
    },
    radioCustom: {
      height: '100%'
    }
  })
);

const UpdateCancelPolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, no_booking_cancel } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const [bookingCancel, setBookingCancel] = useState<number>(no_booking_cancel);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công !');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();

  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);

  useMemo(() => {
    setBookingCancel(no_booking_cancel);
  }, [no_booking_cancel]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingCancel(parseInt((event.target as HTMLInputElement).value));
  };

  const updateCancelPolicy: any = () => {
    const res = handleUpdateListing(room_id, {
      settings: { no_booking_cancel: bookingCancel }
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật chính sách hủy phòng thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật chính sách hủy phòng thất bại !');
    }
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <CardWrapperUpdate
        handleSave={updateCancelPolicy}
        openSnack={openSnack}
        messageSnack={messageSnack}
        statusSnack={statusSnack}
        handleCloseSnack={handleCloseSnack}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom className={'label main_label'}>
              Chính sách hủy phòng
            </Typography>
            <Grid item>
              <Typography variant="body1" className={classes.subTitle}>
                Chọn 1 trong 3 chính sách dưới đây:
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.container} justify="center">
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup value={String(bookingCancel)} onChange={handleChange} row>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <RadioCustom
                        label={'Flexible'}
                        className={classes.radioCustom}
                        descr={
                          <Grid className={classes.marginContent}>
                            Hoàn lại 100% giá trị đơn đặt phòng khi khách hủy trước 5 ngày nhận
                            phòng.
                            <br />
                            <br />
                            Khách hàng không được hoàn tiền trong vòng 5 ngày trước ngày nhận phòng.
                          </Grid>
                        }
                        value={String(0)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioCustom
                        label={'Moderate'}
                        className={classes.radioCustom}
                        descr={
                          <Grid className={classes.marginContent}>
                            Hoàn lại 50% giá trị đơn đặt phòng khi khách hủy trước 5 ngày nhận
                            phòng.
                            <br />
                            <br />
                            Khách hàng không được hoàn tiền trong vòng 5 ngày trước ngày nhận phòng.
                          </Grid>
                        }
                        value={String(1)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioCustom
                        label={'Strict'}
                        className={classes.radioCustom}
                        descr={
                          <Grid className={classes.marginContent}>
                            Hoàn lại 50% giá trị đơn đặt phòng khi khách hủy trước 15 ngày nhận
                            phòng.
                            <br />
                            <br />
                            Khách hàng không được hoàn tiền trong vòng 15 ngày trước ngày nhận
                            phòng.
                          </Grid>
                        }
                        value={String(2)}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </CardWrapperUpdate>
    </Fragment>
  );
};
export default UpdateCancelPolicy;
