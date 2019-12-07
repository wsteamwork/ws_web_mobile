import React, { FC, Fragment, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  InputAdornment,
  InputBase,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Grid
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import SearchInput from '../LTR/ReusableComponents/SearchInput';
import SearchSuggestions from './SearchSuggestions';

interface Iprops {
  handleClose: () => void;
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topSticky: {
      // position: 'fixed'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    dialogWrapper: {
      padding: '0 21px',
      height: '100vh'
    },
    title: {
      marginBottom: 16,
      fontSize: 28,
      fontWeight: 600,
      lineHeight: '34px'
    },
    searchInputWrapper: {
      padding: '16px 0'
    },
    suggestions: {
      paddingTop: 16,
      overflow: 'auto'
    }
  })
);

const SearchDialog: FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { handleClose, open } = props;
  const classes = useStyles(props);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <Grid container direction="column" className={classes.dialogWrapper}>
        <Grid item className={classes.topSticky}>
          <Toolbar disableGutters className={classes.toolbar}>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Typography className={classes.title}>Search</Typography>
          <Grid className={classes.searchInputWrapper}>
            <SearchInput value={inputValue} handleChange={handleChange} />
          </Grid>
        </Grid>
        <Grid item xs className={classes.suggestions}>
          <SearchSuggestions inputValue={inputValue} />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default SearchDialog;
