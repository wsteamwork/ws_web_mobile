import React, { FC, Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { InputAdornment, InputBase } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface Iprops {
  onClick: () => void;
}

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
  const { t } = useTranslation();

  const classes = useStyles(props);
  const { onClick } = props;
  return (
    <Fragment>
      <InputBase
        placeholder={t('home:SearchAutocomplete:toGo')}
        id="input-with-icon-textfield"
        classes={{ root: classes.InputBaseRoot }}
        startAdornment={
          <InputAdornment position="start" className={classes.startAdornmentt}>
            <img src="/static/icons/search.svg" alt="search icon" />
          </InputAdornment>
        }
        fullWidth
        onClick={onClick}
      />
    </Fragment>
  );
};

export default SearchInput;
