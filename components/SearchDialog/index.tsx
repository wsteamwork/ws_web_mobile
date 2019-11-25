import React, { FC, Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  InputAdornment,
  InputBase,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

interface Iprops {
  handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'flexEnd'
    }
  })
);

const SearchDialog: FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { handleClose } = props;
  const classes = useStyles(props);

 

  return (
    <Toolbar className={classes.toolbar}>
      <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
        <CloseIcon />
      </IconButton>
    </Toolbar>
  );
};

export default SearchDialog;
