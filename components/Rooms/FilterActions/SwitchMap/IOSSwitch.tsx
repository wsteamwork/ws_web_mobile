import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import mainColor from '@/styles/constants/colors';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      width: 50,
      height: 26,
      padding: 0,
      margin: theme.spacing(1)
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: mainColor.primary,
          opacity: 1,
          border: 'none'
        }
      },
      '&$focusVisible $thumb': {
        color: mainColor.primary,
        border: '6px solid #fff'
      }
    },
    switchBaseLT: {
      padding: 1,
      '&$checked': {
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: mainColor.primaryLT,
          opacity: 1,
          border: 'none'
        }
      },
      '&$focusVisible $thumb': {
        color: mainColor.primaryLT,
        border: '6px solid #fff'
      }
    },
    thumb: {
      width: 24,
      height: 24
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'])
    },
    checked: {
    },
    focusVisible: {}
  })
);

interface IProps extends SwitchProps { }

const IOSSwitch: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: leaseTypeGlobal ? classes.switchBaseLT : classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
};

export default IOSSwitch;
