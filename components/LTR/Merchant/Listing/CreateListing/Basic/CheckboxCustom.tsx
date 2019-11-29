import { FormControlLabel, FormGroup } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
  const classes = useStyles(props);
  const { t } = useTranslation();

  return (
    <Grid className={classes.container}>
      <FormControl component="fieldset" fullWidth>
        <Grid className={classes.title}>{t('host:leaseType')}</Grid>
        <FormGroup row>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.checkboxItem}>
              <div className={classes.checkboxItemWrapper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      classes={{ checked: classes.checked }}
                      name={name}
                      value="shortterm"
                      checked={values.lease_type.includes('shortterm')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                  label={t('host:shortTerm')}
                />
                <div style={{ marginTop: 10 }}>{t('host:shortTermRentType')}</div>
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
                  label={t('host:longTerm')}
                />
                <div style={{ marginTop: 10 }}>{t('host:longTermRentType')}</div>
              </div>
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default CheckboxCustom;
