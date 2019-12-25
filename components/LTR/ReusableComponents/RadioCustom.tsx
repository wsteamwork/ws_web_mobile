import { Grid, Radio, Theme } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
interface IProps {
  classes?: any,
  label: string,
  descr?: ReactNode,
  value: string,
  className?: string;
  noneBorder?: boolean
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    checkboxItemWrapper: {
      padding: '5px 15px 10px',
      border: (props) => props.noneBorder ? 'none' : '1px solid lightgray',
      borderRadius: 4,
      minHeight: 120,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)',
    },
  })
);

const RadioCustom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { label, descr, value, className } = props;

  return (
    <div className={classNames(classes.checkboxItemWrapper, className)}>
      <FormControlLabel
        value={value}
        label={label}
        control={<Radio color="primary" />}
        labelPlacement="end"
        classes={{ label: classes.title }}
      />
      <Grid style={{ marginTop: 10 }}> {descr} </Grid>
    </div>
  );
};

export default RadioCustom;
