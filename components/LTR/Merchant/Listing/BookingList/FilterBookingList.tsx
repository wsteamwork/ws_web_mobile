import DateSearchBooking from '@/components/Home/DateRangeSearch/DateSearchBooking';
import { BookingListReducerAction } from '@/store/Redux/Reducers/LTR/BookingList/bookinglist';
import { statusBookingList } from '@/utils/mixins';
import { Button, createStyles, Grid, Hidden, makeStyles, MenuItem, Paper, TextField, Theme } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
  className?: string;
  handleSearch?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
    paper: {
      margin: 0,
      padding: '16px',
      marginBottom: '32px',
      border: '1px solid #eeeeee',
      borderRadius: 16,
      boxShadow: 'none',
      '&:hover': {
        boxShadow: '0 2px 9px -2px rgba(132,135,138,.2)'
      }
    },
    dateSearch: {
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(2)
      }
    },
    button: {
      boxShadow: 'none',
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: '#1d8df7',
      width: '100%',
      height: 56,
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: '#1d8df7'
      },
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(2)
      }
    },
    textField: {
      marginTop: theme.spacing(0),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(2)
      }
    },
    multilineColor: {
      color: '#484848',
      fontWeight: theme.typography.fontWeightBold
    }
  })
);
const FilterBookingList: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { handleSearch } = props;
  const [searchName, setSearchName] = useState<string>('');
  const [idRoom, setIdRoom] = useState<number>(null);
  const [codeBooking, setCodeBooking] = useState<string>('');
  const [statusBooking, setStatusBooking] = useState<number>(0);
  const dispatch = useDispatch<Dispatch<BookingListReducerAction>>();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
    dispatch({ type: 'SET_SEARCH_NAME', payload: event.target.value });
  };
  const handleChangeIdRoom = (event: ChangeEvent<HTMLInputElement>) => {
    setIdRoom(parseInt(event.target.value));
    dispatch({ type: 'SET_ID_ROOM', payload: parseInt(event.target.value) });
  };
  const handleChangeCodeBooking = (event: ChangeEvent<HTMLInputElement>) => {
    setCodeBooking(event.target.value);
    dispatch({ type: 'SET_CODE_BOOKING', payload: event.target.value });
  };
  const handleChangeStatusBooking = (event: ChangeEvent<HTMLInputElement>) => {
    setStatusBooking(parseInt(event.target.value));
    dispatch({ type: 'SET_STATUS_BOOKING', payload: parseInt(event.target.value) });
  };

  return (
    <Grid container justify="center" alignContent="center" className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                id="search-name"
                type="search"
                name="search"
                label="Tìm kiếm"
                placeholder="Tên khách, sđt, email,..."
                onChange={handleChangeName}
                value={searchName}
                InputLabelProps={{
                  className: classes.multilineColor
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth={true}
                variant="outlined"
                id="id-room"
                type="number"
                name="id room"
                label="Mã căn hộ"
                placeholder="Nhập mã"
                onChange={handleChangeIdRoom}
                value={idRoom || ''}
                InputLabelProps={{
                  className: classes.multilineColor
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth={true}
                variant="outlined"
                id="id-booking"
                type="search"
                name="id booking"
                label="Mã booking"
                placeholder="Nhập mã"
                onChange={handleChangeCodeBooking}
                value={codeBooking}
                InputLabelProps={{
                  className: classes.multilineColor
                }}
              />
            </Grid>
            <Hidden only={['md', 'lg']}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth={true}
                  id="outlined-select-currency"
                  select
                  label="Trạng thái booking"
                  className={classes.textField}
                  value={statusBooking}
                  onChange={handleChangeStatusBooking}
                  InputLabelProps={{
                    className: classes.multilineColor
                  }}
                  margin="normal"
                  variant="outlined">
                  {statusBookingList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            <Hidden smDown>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth={true}
                  id="outlined-select-currency"
                  select
                  label="Trạng thái booking"
                  className={classes.textField}
                  value={statusBooking}
                  onChange={handleChangeStatusBooking}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  InputLabelProps={{
                    className: classes.multilineColor
                  }}
                  margin="normal"
                  variant="outlined">
                  {statusBookingList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

            </Hidden>
            <Grid item xs={12} sm={9} md={6} className={classes.dateSearch}>
              <DateSearchBooking />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Button className={classes.button} color="primary" size="large" onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FilterBookingList;
