import React, { Fragment, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography } from '@material-ui/core';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    txtName: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: '34px',
      letterSpacing: 0.36,
      color: '#FFFFFF',
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      display: '-webkit-box'
    },
    txtPrice:{
      fontSize: 22,
      lineHeight: '28px',
      textAlign: 'right',
      letterSpacing: 0.32,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    txtAddress:{
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0.07,
      color: '#FFFFFF',
    },
    txtPer:{
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13,
      lineHeight: '18px',
      letterSpacing: -0.08,
      color: '#FFFFFF',
      textAlign:'center'
    },
    rowMarginTop:{
      marginTop:'8px'
    }
  })
);

const BoxInfoBasic: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;

  return (
    <Grid container>
      <Grid item xs={9}>
        <Typography variant='h1' className={classes.txtName}>
          Grand Royale Park Hotel Royale Park Hotel
        </Typography>
      </Grid>
      <Grid item xs={3} container justify='flex-end' alignItems='flex-end'>
        <Grid item>
          <Typography variant='subtitle1' className={classes.txtPrice}>
            $123
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.rowMarginTop}>
        <Typography variant='subtitle2' className={classes.txtAddress}>
          Thanh Xuân, Hà Nội
        </Typography>
      </Grid>
      <Grid item xs={3} container justify='flex-end' alignItems='center'>
        <Grid item>
          <Typography variant='subtitle2' className={classes.txtPer}>
            vnd / tháng
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BoxInfoBasic;
