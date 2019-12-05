import { Dialog, Grid, IconButton, Slide, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from '../LTR/ReusableComponents/SearchInput';
import SearchSuggestions from './SearchSuggestions';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

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
const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchDialog: FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { handleClose, open } = props;
  const classes = useStyles(props);
  const searchText = useSelector<ReducersList, string>((state) => state.searchFilter.searchText);
  const [inputValue, setInputValue] = useState<string>(searchText);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
