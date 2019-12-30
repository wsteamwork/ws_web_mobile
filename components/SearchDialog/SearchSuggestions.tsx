import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { SearchSuggestData } from '@/types/Requests/Search/SearchResponse';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Router from 'next/router';
import React, { Dispatch, FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSearch } from '../Home/SearchAutoSuggestion';
import { ReducersList } from '@/store/Redux/Reducers';
interface Iprops {
  inputValue: string;
  handleClose?: any;
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
  const { inputValue, handleClose } = props;
  const classes = useStyles(props);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
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
    leaseTypeGlobal && Router.push({
      pathname: '/long-term-rooms',
      query: pushQuery
    });
    handleClose();
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
            </Grid>
          );
        })}
    </Fragment>
  );
};

export default SearchSuggestions;
