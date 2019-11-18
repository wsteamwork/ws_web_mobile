import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControlLabel, FormGroup } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface IProps extends CheckboxProps {
  classes?: any;
  values?: any;
  handleChange?: any;
  handleBlur?: any;
}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '32px 0'
  },
  checked: {
    color: '#FFA712 !important'
  },
  checkboxItem: {},
  checkboxItemWrapper: {
    padding: '5px 15px 10px',
    border: '1px solid #484848',
    borderRadius: 4
  },
  title: {
    marginBottom: 8,
    overflowWrap: 'break-word',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: 'rgb(118, 118, 118)',
    margin: 0
  }
}));

const CheckboxCustom: FC<IProps> = (props) => {
  const { name, values, onChange, handleBlur, handleChange } = props;
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const leaseType = useSelector<ReducersList, number>((state) => state.createListing.leaseType);
  const classes = useStyles(props);
  // const [state, setState] = useState<any>({
  //   shortterm: true,
  //   longterm: false
  // });
  // const { shortterm, longterm } = state;
  // const handleChange = (name) => (event) => {
  //   setState({ ...state, [name]: event.target.checked });
  // };

  // useEffect(() => {
  //   if (leaseType) {
  //     if (leaseType == 1) {
  //       setState({
  //         shortterm: true,
  //         longterm: false
  //       });
  //     } else if (leaseType == 2) {
  //       setState({
  //         shortterm: false,
  //         longterm: true
  //       });
  //     } else if (leaseType == 3) {
  //       setState({
  //         shortterm: true,
  //         longterm: true
  //       });
  //     } else {
  //       setState({
  //         shortterm: false,
  //         longterm: false
  //       });
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: 'SET_LEASE_TYPE',
  //     payload:
  //       shortterm && !longterm ? 1 : !shortterm && longterm ? 2 : shortterm && longterm ? 3 : null
  //   });
  // }, [state]);

  // const error = [shortterm, longterm].filter((v) => v).length !== 2;

  return (
    <Grid className={classes.container}>
      {/* <h3>Hình thức thuê: </h3> */}

      <FormControl component="fieldset" fullWidth>
        <Grid className={classes.title}>Hình thức thuê</Grid>
        <FormGroup row>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.checkboxItem}>
              <div className={classes.checkboxItemWrapper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      classes={{ checked: classes.checked }}
                      // checked={shortterm}
                      // onChange={handleChange('shortterm')}
                      // value="shortterm"
                      name={name}
                      value="shortterm"
                      checked={values.lease_type.includes('shortterm')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                  label="Ngắn hạn"
                />
                <div style={{ marginTop: 10 }}>Bao gồm theo ngày & giờ</div>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.checkboxItem}>
              <div className={classes.checkboxItemWrapper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      classes={{ checked: classes.checked }}
                      name={name}
                      value="longterm"
                      checked={values.lease_type.includes('longterm')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                  label="Dài hạn"
                />
                <div style={{ marginTop: 10 }}>Đặt phòng tối thiểu 1 tháng</div>
              </div>
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default CheckboxCustom;
