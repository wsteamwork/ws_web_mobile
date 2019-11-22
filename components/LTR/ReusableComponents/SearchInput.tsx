import React, { FC, Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { InputAdornment, InputBase } from '@material-ui/core';

interface Iprops {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    InputBaseRoot: {
      boxShadow: '0px 9px 20px #f3ecec',
      width: '100%',
      padding: '10px 16px',
      borderRadius: 100
    },
    startAdornmentt: {
      marginRight: 15
    }
  })
);

const SearchInput: FC<Iprops> = (props: Iprops) => {
  const classes = useStyles(props);
  return (
    <Fragment>
      <InputBase
        placeholder="Where are you going"
        id="input-with-icon-textfield"
        classes={{ root: classes.InputBaseRoot }}
        startAdornment={
          <InputAdornment position="start" className={classes.startAdornmentt}>
            <img src="/static/icons/search.svg" alt="search icon" />
          </InputAdornment>
        }
        fullWidth
      />
    </Fragment>
  );
};

export default SearchInput;
