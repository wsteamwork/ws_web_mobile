import React, { FC, Fragment, useState, useEffect, Dispatch } from 'react';
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
import { getDataSearch } from '../Home/SearchAutoSuggestion';
import { SearchSuggestData } from '@/types/Requests/Search/SearchResponse';
import Router from 'next/router';
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useDispatch } from 'react-redux';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
interface Iprops {
  inputValue: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    option: {
      padding: '12px 0',
      display: 'flex'
    },
    icon: {
      marginRight: 10
    }
  })
);

const SearchSuggestions: FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { inputValue } = props;
  const classes = useStyles(props);
  const [dataSuggestions, setDataSuggestions] = useState<SearchSuggestData[]>([]);
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  useEffect(() => {
    getDataSearch(inputValue).then((data) => setDataSuggestions(data));
  }, [inputValue]);

  const applySearch = (option: SearchSuggestData) => {
    dispatch({
      type: 'SET_SEARCH_TEXT',
      searchText: option.name
    });
    let name = option.name;
    let cityId;
    let districtId;
    switch (option.type) {
      case 1:
        cityId = option.id;
        break;
      case 2:
        districtId = option.id;
        break;
    }
    const pushQuery: any = {
      name: cityId === undefined && districtId === undefined ? name : '',

      city_id: cityId ? cityId : '',
      district_id: districtId ? districtId : ''
    };
    Router.push({
      pathname: '/long-term-rooms',
      query: pushQuery
    });
  };

  return (
    <Fragment>
      {dataSuggestions &&
        dataSuggestions.map((suggestion: SearchSuggestData, index) => {
          const matches = match(suggestion.name, inputValue);
          const parts = parse(suggestion.name, matches);
          return (
            <Grid className={classes.option} key={index} onClick={() => applySearch(suggestion)}>
              <Grid className={classes.icon}>
                {suggestion.type == 3 ? <HomeRoundedIcon /> : <PlaceRoundedIcon />}
              </Grid>
              <Grid>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight && 700 }}>
                    {part.text}
                  </span>
                ))}
              </Grid>

              {/* {suggestion.name} */}
            </Grid>
          );
        })}
    </Fragment>
  );
};

export default SearchSuggestions;
