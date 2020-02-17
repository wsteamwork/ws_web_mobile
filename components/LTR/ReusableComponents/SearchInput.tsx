import { InputAdornment, InputBase } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
interface Iprops {
  onClick?: () => void;
  displayOnlyForModal?: boolean;
  value?: string;
  handleChange?: (e) => void;
  handleEnterKeyDown?: (e) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    InputBaseRoot: {
      boxShadow: '0px 9px 20px #0000001a',
      backgroundColor: 'white',
      width: '100%',
      padding: '8px 16px',
      borderRadius: 100
    },
    startAdornmentt: {
      marginRight: 15
    }
  })
);

const SearchInput: FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const searchText = useSelector<ReducersList, string>(
    (state) => state.searchFilter.searchText
  );
  const classes = useStyles(props);
  const { onClick, displayOnlyForModal, value, handleChange, handleEnterKeyDown } = props;

  return (
    <Fragment>
      {displayOnlyForModal ? (
        <InputBase
          value={searchText}
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
      ) : (
          <InputBase
            value={value}
            onChange={handleChange}
            onKeyPress={handleEnterKeyDown}
            // onSubmit={handleEnterKeyDown}
            placeholder={t('home:SearchAutocomplete:toGo')}
            id="input-with-icon-textfield"
            classes={{ root: classes.InputBaseRoot }}
            startAdornment={
              <InputAdornment position="start" className={classes.startAdornmentt}>
                <img src="/static/icons/search.svg" alt="search icon" />
              </InputAdornment>
            }
            fullWidth
          />
        )}
    </Fragment>
  );
};

export default SearchInput;
