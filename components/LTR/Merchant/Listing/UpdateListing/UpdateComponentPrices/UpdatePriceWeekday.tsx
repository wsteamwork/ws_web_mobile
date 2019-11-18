import { ReducersList } from '@/store/Redux/Reducers';
import {
  StepPricesActions,
  getListingPrices,
  getWeekdayPrice
} from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import React, { FC, useEffect, Fragment, useContext, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import {
  Grid,
  FormGroup,
  InputAdornment,
  FormControl,
  Select,
  OutlinedInput,
  Theme,
  Typography,
  Button,
  Tooltip
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import { weekdayOptions } from '@/utils/mixins';
import { makeStyles, createStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    marginRow: {
      margin: '16px 0'
    },
    wrapperWeekday: {
      margin: '16px 0',
      paddingLeft: '0 !important'
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)'
    },
    paddingTxt: {
      padding: 10
    },
    buttonIcon: {
      textTransform: 'initial',
      padding: '13px 0px',
      minWidth: '48px'
    },
    buttonAdd: {
      textTransform: 'initial',
      padding: '8px 16px',
      backgroundColor: '#4ec47f',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#4ec47f',
        color: '#ffffff'
      }
    },
    buttonRemove: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    marginLabel: {
      marginRight: 5
    }
  })
);
const UpdatePriceWeekday: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { listing, weekday, disable_next } = useSelector<ReducersList, any>(
    (state) => state.stepPrice
  );
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const [weedayPrice, setWeekdayPrice] = useState<any>([]);
  const [weekday_options, setWeekdayOptions] = useState<any>(weekdayOptions);
  const [arrWeekday, setArrWeekday] = useState<any>([]);

  useEffect(() => {
    getListingPrices(id, dispatchStep).then((res) => {
      getWeekdayPrice(res.room_id, dispatchStep);
    });
  }, []);

  useEffect(() => {
    setWeekdayPrice(weekday);
  }, [weekday]);

  useEffect(() => {
    if (weedayPrice.length) {
      let arr_weekday = weedayPrice.map((o) => o.weekday);
      setArrWeekday(arr_weekday);
    }
  }, [weedayPrice]);
  const UpdateWeekday: any = () => {
    const res = handleUpdateListing(listing.room_id, {
      weekday_price: weedayPrice
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật giá cuối tuần thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật giá cuối tuần thất bại !');
    }
  };

  const changePriceDay = (i: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    weedayPrice[i].price_day = parseInt(event.target.value);
    setWeekdayPrice(weedayPrice);
    dispatchStep({ type: 'setWeekday', payload: weedayPrice });
  };
  const changePriceHour = (i: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    weedayPrice[i].price_hour = parseInt(event.target.value);
    setWeekdayPrice(weedayPrice);
    dispatchStep({ type: 'setWeekday', payload: weedayPrice });
  };
  const changePriceAfterHour = (i: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    weedayPrice[i].price_after_hour = parseInt(event.target.value);
    setWeekdayPrice(weedayPrice);
    dispatchStep({ type: 'setWeekday', payload: weedayPrice });
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const changeSelect = (i: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    weedayPrice[i].weekday = parseInt(event.target.value);
    let arr_weekday = weedayPrice.map((o) => o.weekday);
    setArrWeekday(arr_weekday);
    setWeekdayPrice(weedayPrice);
    dispatchStep({ type: 'setWeekday', payload: weedayPrice });
  };
  const addWeekday = () => {
    if (weedayPrice.length < 7) {
      let remainWeekday = weekday_options.filter((item) => !arrWeekday.includes(item.weekday));
      let newObj = {
        weekday: remainWeekday[0].weekday,
        status: 1,
        price_day: 0,
        price_hour: 0,
        price_after_hour: 0
      };
      let newData = [...weedayPrice, newObj];
      setWeekdayPrice(newData);
      dispatchStep({ type: 'setWeekday', payload: newData });
    }
  };
  const removeWeekday = (i: number) => {
    weedayPrice.splice(i, 1);
    setWeekdayPrice(weedayPrice);
    dispatchStep({ type: 'setWeekday', payload: weedayPrice });
  };

  return (
    <Fragment>
      <CardWrapperUpdate
        widthMd={8}
        widthLg={6}
        disabledSave={disable_next}
        handleSave={UpdateWeekday}
        openSnack={openSnack}
        statusSnack={statusSnack}
        messageSnack={messageSnack}
        handleCloseSnack={handleCloseSnack}>
        <div>
          <ValidatorForm
            onSubmit={() => {
              return null;
            }}>
            <div>
              <Grid item xs={12} className={classes.header}>
                <h1>Giá cuối tuần</h1>
                <Button className={classes.buttonAdd} onClick={addWeekday} size="large">
                  <FontAwesomeIcon
                    className={classes.marginLabel}
                    icon={faPlus}
                    size="1x"></FontAwesomeIcon>
                  Thêm ngày
                </Button>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12} className={classes.marginRow}>
                  <FormGroup row>
                    {weedayPrice.map((o, i) => (
                      <Grid
                        key={i}
                        container
                        spacing={2}
                        alignItems="center"
                        className={classes.marginRow}>
                        <Grid item xs={12} className={classes.wrapperWeekday}>
                          <Grid container spacing={2}>
                            <Grid
                              item
                              xs={12}
                              sm={5}
                              md={
                                listing.short_term_room.rent_type !== 2 &&
                                listing.short_term_room.rent_type !== 3
                                  ? 3
                                  : 2
                              }>
                              <Typography className={classes.title} variant="h6" gutterBottom>
                                Ngày *
                              </Typography>
                              <FormControl variant="outlined" fullWidth>
                                <Select
                                  native
                                  onChange={changeSelect(i)}
                                  defaultValue={o.weekday}
                                  inputProps={{ style: { padding: 12 } }}
                                  input={<OutlinedInput labelWidth={0} />}>
                                  {weekday_options.map((o, idx) => (
                                    <option
                                      disabled={arrWeekday.includes(o.weekday)}
                                      key={idx}
                                      value={o.weekday}>
                                      {o.title}
                                    </option>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            {listing.short_term_room.rent_type !== 1 && (
                              <Grid
                                item
                                xs={12}
                                md={
                                  listing.short_term_room.rent_type !== 1 &&
                                  listing.short_term_room.rent_type !== 3
                                    ? 4
                                    : 3
                                }
                                sm={5}>
                                <Typography className={classes.title} variant="h6" gutterBottom>
                                  Giá theo ngày *
                                </Typography>
                                <TextValidator
                                  fullWidth
                                  validators={['required', 'isNumber']}
                                  errorMessages={[
                                    'Bạn cần nhập giá cho trường này',
                                    'Bạn cần nhập giá cho trường này'
                                  ]}
                                  id={o.weekday.toString()}
                                  variant="outlined"
                                  defaultValue={o.price_day}
                                  onChange={changePriceDay(i)}
                                  inputProps={{ style: { padding: 12 } }}
                                  InputProps={{
                                    id: o.weekday.toString(),
                                    inputComponent: NumberFormatCustom as any,
                                    endAdornment: (
                                      <InputAdornment position="start"> đ </InputAdornment>
                                    )
                                  }}
                                />
                              </Grid>
                            )}
                            {listing.short_term_room.rent_type !== 2 && (
                              <Grid
                                item
                                md={
                                  listing.short_term_room.rent_type !== 2 &&
                                  listing.short_term_room.rent_type !== 3
                                    ? 4
                                    : 3
                                }
                                sm={5}
                                xs={12}>
                                <Typography className={classes.title} variant="h6" gutterBottom>
                                  Giá theo giờ *
                                </Typography>
                                <TextValidator
                                  fullWidth
                                  validators={['required', 'isNumber']}
                                  errorMessages={[
                                    'Bạn cần nhập giá cho trường này',
                                    'Bạn cần nhập giá cho trường này'
                                  ]}
                                  id={o.weekday.toString()}
                                  variant="outlined"
                                  defaultValue={o.price_hour}
                                  onChange={changePriceHour(i)}
                                  inputProps={{ style: { padding: 12 } }}
                                  InputProps={{
                                    id: o.weekday.toString(),
                                    inputComponent: NumberFormatCustom as any,
                                    endAdornment: (
                                      <InputAdornment position="start"> đ </InputAdornment>
                                    )
                                  }}
                                />
                              </Grid>
                            )}
                            {listing.short_term_room.rent_type !== 2 && (
                              <Grid
                                item
                                md={
                                  listing.short_term_room.rent_type !== 2 &&
                                  listing.short_term_room.rent_type !== 3
                                    ? 4
                                    : 3
                                }
                                xs={12}
                                sm={5}>
                                <Typography className={classes.title} variant="h6" gutterBottom>
                                  Giá khi thêm giờ *
                                </Typography>
                                <TextValidator
                                  fullWidth
                                  validators={['required', 'isNumber']}
                                  errorMessages={[
                                    'Bạn cần nhập giá cho trường này',
                                    'Bạn cần nhập giá cho trường này'
                                  ]}
                                  id={o.weekday.toString()}
                                  variant="outlined"
                                  defaultValue={o.price_after_hour}
                                  onChange={changePriceAfterHour(i)}
                                  inputProps={{ style: { padding: 12 } }}
                                  InputProps={{
                                    id: o.weekday.toString(),
                                    inputComponent: NumberFormatCustom as any,
                                    endAdornment: (
                                      <InputAdornment position="start"> đ </InputAdornment>
                                    )
                                  }}
                                />
                              </Grid>
                            )}
                            <Grid item xs={12} sm={1} className={classes.buttonRemove}>
                              <Tooltip title="Bạn muốn xóa ngày này ?" placement="right">
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  className={classes.buttonIcon}
                                  onClick={() => removeWeekday(i)}
                                  size="large">
                                  <FontAwesomeIcon icon={faTrashAlt} size="1x"></FontAwesomeIcon>
                                </Button>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>
            </div>
          </ValidatorForm>
        </div>
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdatePriceWeekday;
