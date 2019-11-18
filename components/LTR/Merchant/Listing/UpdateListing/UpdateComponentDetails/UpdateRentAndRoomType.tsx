import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import { getRoomType, RoomTypeData } from '@/components/Rooms/FilterActions/RoomType/context';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { getDataUpdateListing, handleUpdateRentAndRoomType, UpdateDetailsActions, UpdateDetailsState } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import React, { ChangeEvent, FC, Fragment, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    imgDetail: {
      height: 25
    },
    rentType: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2)
    },
    icon: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    checked: {
      color: '#1e8df7 !important'
    },
    margin: {
      margin: '16px 0'
    },
    label: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    name: {
      fontWeight: theme.typography.fontWeightBold
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      display: 'flex',
      alignItems: 'center'
    },
    area: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    formControl: {
      width: '100%'
    }
  })
);

const CustomSwitch = withStyles({
  switchBase: {
    color: '#1e8df7',
    '&$checked': {
      color: '#1e8df7'
    },
    '&$checked + $track': {
      backgroundColor: '#1e8df7'
    }
  },
  checked: {},
  track: {}
})(Switch);

const UpdateRentAndRoomType: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const {
    accommodationType,
    stayWithHost,
    status_short_term,
    status_long_term,
    total_area,
    room_id
  } = useSelector<ReducersList, UpdateDetailsState>((state) => state.updateDetails);
  const [roomType, setRoomType] = useState<number>(accommodationType);
  const [isStayWithHost, setStayWithHost] = useState<boolean>(!!stayWithHost);
  const [totalArea, setTotalArea] = useState<number>(total_area);
  const [roomTypesData, setRoomTypesData] = useState<RoomTypeData[]>([]);
  const [statusShortTerm, setStatusShortTerm] = useState<boolean>(!!status_short_term);
  const [statusLongTerm, setStatusLongTerm] = useState<boolean>(!!status_long_term);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công !');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const dispatch_detail = useDispatch<Dispatch<UpdateDetailsActions>>();

  useEffect(() => {
    getRoomType(setRoomTypesData);
  }, []);

  useEffect(() => {
    getDataUpdateListing(id, dispatch_detail);
  }, [room_id]);

  useMemo(() => {
    setRoomType(accommodationType);
    setTotalArea(total_area);
    setStatusShortTerm(!!status_short_term);
    setStatusLongTerm(!!status_long_term);
    setStayWithHost(!!stayWithHost);
  }, [accommodationType, status_short_term, status_long_term, stayWithHost, total_area]);

  useEffect(() => {
    dispatch({
      type: 'SET_ACCOMMODATION_TYPE',
      payload: roomType
    });
  }, [roomType]);

  const callBackOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_ACCOMMODATION_TYPE',
      payload: parseInt(event.target.value)
    });
  };

  const handleToggleLongTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusLongTerm(event.target.checked);
    handleUpdateRentAndRoomType(room_id, 'merchant_status_long_term', event.target.checked ? 1 : 0);
  };
  const handleToggleShortTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusShortTerm(event.target.checked);
    handleUpdateRentAndRoomType(
      room_id,
      'merchant_status_short_term',
      event.target.checked ? 1 : 0
    );
  };
  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setStayWithHost(event.target.checked);
    handleUpdateRentAndRoomType(room_id, 'stay_with_host', event.target.checked ? 1 : 0);
  };

  const updateRoomType: any = () => {
    const res = handleUpdateListing(room_id, {
      total_area: totalArea,
      accommodation_type: roomType
    });
    if (res) {
      setOpenSnack(true);
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật số lượng khách thất bại !');
    }
  };

  const changeTotalArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalArea(parseInt(event.target.value));
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
        handleSave={updateRoomType}
        openSnack={openSnack}
        messageSnack={messageSnack}
        statusSnack={statusSnack}
        handleCloseSnack={handleCloseSnack}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom className={'label main_label'}>
              Loại Căn hộ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} sm={8} md={8} lg={7} className={classes.margin}>
              <FormControl variant="outlined" fullWidth>
                <Select
                  fullWidth
                  onChange={callBackOnChange}
                  value={roomType}
                  inputProps={{ style: { padding: 12 } }}
                  input={<OutlinedInput labelWidth={0} />}>
                  {roomTypesData &&
                    roomTypesData.map((o, idx) => (
                      <MenuItem key={idx} value={o.id}>
                        {o.value}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  classes={{ checked: classes.checked }}
                  checked={isStayWithHost}
                  onChange={handleChangeCheckBox}
                  value="stayWithHost"
                />
              }
              label="Bạn có ở chung không gian căn hộ với khách ?"
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatorForm
              onSubmit={() => {
                return null;
              }}>
              <Grid container item xs={12} sm={8} md={8} lg={7} className={classes.area}>
                <Grid item xs={12} className={classes.rentType}>
                  <Typography variant="h1" gutterBottom className={'label main_label'}>
                    Tổng diện tích
                  </Typography>
                </Grid>
                <Grid container item xs={12}>
                  <FormControl
                    className={classes.formControl}
                    aria-describedby="price_day_helper"
                    required>
                    <TextValidator
                      fullWidth
                      validators={['required', 'isNumber']}
                      errorMessages={['Diện tích là bắt buộc', 'Diện tích là bắt buộc']}
                      name="total_area"
                      variant="outlined"
                      value={totalArea}
                      onChange={changeTotalArea}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        endAdornment: (
                          <InputAdornment position="start">
                            m<sup>2</sup>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Grid>

          <Grid item xs={12} className={classes.label}>
            <Typography variant="h1" gutterBottom className={'label main_label'}>
              Hình thức thuê
            </Typography>
          </Grid>
          <Grid container item xs={12} className={classes.rentType}>
            <Grid item xs={2} sm={1}>
              <img
                src={'/static/images/rentType.svg'}
                alt="Rent Type"
                className={classes.imgDetail}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Typography variant="body1" className={classes.name}>
                Ngắn hạn
              </Typography>
            </Grid>
            <Grid item xs={7} sm={5} lg={4} className={classes.icon}>
              <CustomSwitch
                value="shortterm"
                edge="end"
                onChange={handleToggleShortTerm}
                checked={statusShortTerm}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.rentType}>
            <Grid item xs={2} sm={1}>
              <img
                src={'/static/images/longterm.svg'}
                alt="Rent Type"
                className={classes.imgDetail}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Typography variant="body1" className={classes.name}>
                Dài hạn
              </Typography>
            </Grid>
            <Grid item xs={7} sm={5} lg={4} className={classes.icon}>
              <CustomSwitch
                value="longterm"
                edge="end"
                onChange={handleToggleLongTerm}
                checked={statusLongTerm}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardWrapperUpdate>
    </Fragment>
  );
};
export default UpdateRentAndRoomType;
