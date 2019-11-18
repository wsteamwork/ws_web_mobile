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
  RadioGroup,
  Select,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';
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
import { hoursList } from '@/utils/mixins';
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
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)'
    },
    menuSelect: {
      maxHeight: 'calc(100% - 60%)'
    }
  })
);

const UpdateRentTypePolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, rent_type, checkin, checkout } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const [rentType, setRentType] = useState<number>(rent_type);
  const [check_in, setCheckin] = useState<string>(checkin);
  const [check_out, setCheckout] = useState<string>(checkout);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công !');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();

  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);

  useMemo(() => {
    setRentType(rent_type);
    setCheckin(checkin);
    setCheckout(checkout);
  }, [rent_type, checkin, checkout]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRentType(parseInt((event.target as HTMLInputElement).value));
    dispatch({ type: 'SET_RENT_TYPE', payload: parseInt((event.target as HTMLInputElement).value) });
  };

  const changeCheckin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckin(event.target.value);
    dispatch({ type: 'SET_CHECKIN', payload: event.target.value });
  };
  
  const changeCheckout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckout(event.target.value);
    dispatch({ type: 'SET_CHECKOUT', payload: event.target.value });
  };

  const updateRentTypePolicy: any = () => {
    const res = handleUpdateListing(room_id, {
      policy: { rent_type: rentType, checkin: check_in, checkout: check_out }
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật chính sách đặt phòng thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật chính sách đặt phòng thất bại !');
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
        handleSave={updateRentTypePolicy}
        openSnack={openSnack}
        messageSnack={messageSnack}
        statusSnack={statusSnack}
        handleCloseSnack={handleCloseSnack}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom className={'label main_label'}>
              Loại đặt phòng
            </Typography>
            <Grid item className={classes.container}>
              <Typography className={classes.title} variant="h6" gutterBottom>
                Chọn 1 trong 3 loại đặt phòng dưới đây:
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.container} justify="center">
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup value={String(rentType)} onChange={handleChange} row>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <RadioCustom
                        label={'Theo ngày'}
                        className={classes.radioCustom}
                        descr={'Tối thiểu đặt 1 ngày'}
                        value={String(2)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RadioCustom
                        label={'Theo giờ'}
                        className={classes.radioCustom}
                        descr={'Tối thiểu đặt 4 giờ'}
                        value={String(1)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RadioCustom
                        label={'Cả ngày và giờ'}
                        descr={'Cung cấp 2 loại đặt phòng'}
                        className={classes.radioCustom}
                        value={String(3)}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container className={classes.container} justify="center">
            <Grid item xs={12}>
              <Typography variant="h1" gutterBottom className={'label main_label'}>
                Thời gian quy định
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} className={classes.container}>
                    <Typography className={classes.title} variant="h6" gutterBottom>
                      Giờ checkin *
                    </Typography>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        onChange={changeCheckin}
                        value={check_in}
                        inputProps={{ style: { padding: 12 } }}
                        input={<OutlinedInput labelWidth={0} />}
                        MenuProps={{
                          classes: { paper: classes.menuSelect }
                        }}>
                        {hoursList.map((o, idx) => (
                          <MenuItem key={idx} value={o}>
                            {o}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.container}>
                    <Typography className={classes.title} variant="h6" gutterBottom>
                      Giờ checkout *
                    </Typography>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        onChange={changeCheckout}
                        value={check_out}
                        inputProps={{ style: { padding: 12 } }}
                        input={<OutlinedInput labelWidth={0} />}
                        MenuProps={{
                          classes: { paper: classes.menuSelect }
                        }}>
                        {hoursList.map((o, idx) => (
                          <MenuItem key={idx} value={o}>
                            {o}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </CardWrapperUpdate>
    </Fragment>
  );
};
export default UpdateRentTypePolicy;
