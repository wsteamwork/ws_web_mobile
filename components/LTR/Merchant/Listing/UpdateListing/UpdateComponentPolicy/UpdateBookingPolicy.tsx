import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import {
  getDataUpdateListing,
  UpdateDetailsActions,
  UpdateDetailsState
} from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import {
  Grid,
  Typography,
  FormControl,
  RadioGroup
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, {
  ChangeEvent,
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
    subTitle: {
      fontSize: 16,
      marginTop: 8
    },
    radioCustom: {
      height: '100%'
    }
  })
);

const UpdateBookingPolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, instant_book } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const [instantBook, setInstantBook] = useState<number>(instant_book);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công !');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();

  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);

  useMemo(() => {
    setInstantBook(instant_book);
  }, [instant_book]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInstantBook(parseInt((event.target as HTMLInputElement).value));
  };

  const updateBookPolicy: any = () => {
    const res = handleUpdateListing(room_id, {
      instant_book: instantBook
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật hình thức đặt phòng thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật hình thức đặt phòng thất bại !');
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
        handleSave={updateBookPolicy}
        openSnack={openSnack}
        messageSnack={messageSnack}
        statusSnack={statusSnack}
        handleCloseSnack={handleCloseSnack}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom className={'label main_label'}>
              Hình thức đặt phòng
            </Typography>
            <Grid item>
              <Typography variant="body1" className={classes.subTitle}>
                Chọn 1 trong 2 phương thức đặt phòng dưới đây:
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.container} justify="center">
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup value={String(instantBook)} onChange={handleChange} row>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <RadioCustom
                        label={'Đặt phòng nhanh'}
                        className={classes.radioCustom}
                        descr={
                          <Fragment>
                            - Khách hàng có thể đặt phòng và thanh toán ngay không cần thông qua xác
                            nhận lịch trống từ chủ nhà.
                            <br />
                            <br />
                            - Phòng sẽ được ưu tiên hiển thị trên trang tìm kiếm, gợi ý. Đặt phòng
                            nhanh chóng, thuận tiện. Tăng tỉ lệ đặt phòng lên tới hơn 50% so với đặt
                            phòng chờ xác nhận cũng như doanh thu.
                            <br />
                            <br />- Lưu ý: Bạn cần chủ động khóa phòng trên hệ thống để đảm bảo
                            không xảy ra tình trạng khách hàng đặt phòng nhưng không còn phòng
                            trống.
                          </Fragment>
                        }
                        value={String(1)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RadioCustom
                        label={'Chờ xác nhận chủ nhà'}
                        className={classes.radioCustom}
                        descr={
                          <Fragment>
                            - Bạn sẽ nhận được yêu cầu đặt phòng của khách hàng thông qua Email đã
                            đăng ký. Bạn có thể từ chối hoặc xác nhận đặt phòng đó.
                            <br />
                            <br />
                            - Với những đặt phòng bạn xác nhận, khách hàng sẽ tiến hành thanh toán,
                            sau khi thanh toán hoàn toàn giá trị đặt phòng cho Westay, thông tin
                            khách hàng sẽ được gửi tới cho bạn.
                            <br />
                            <br />- Mọi đặt phòng được coi là thành công sau khi khách hàng thanh
                            toán toàn bộ số tiền đặt phòng cho Westay.
                          </Fragment>
                        }
                        value={String(0)}
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
export default UpdateBookingPolicy;
