import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { ChangeEvent, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

const ChooseMethodPayment = () => {
  const classes = useStyles({});

  const [value, setValue] = useState('female');


  const handleChange = (event: ChangeEvent<{}>, value: string) => {
    setValue(value);
  };

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item>
          <FormControl component="fieldset" className={classes.formControl}>
            <Typography variant="h6">Chọn 1 phương thức thanh toán</Typography>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              className={classes.group}
              value={value}
              onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
              <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
              <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChooseMethodPayment;
