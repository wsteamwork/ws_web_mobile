import ButtonGlobal from '@/components/ButtonGlobal';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction, SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Router from 'next/router';
import { ParsedUrlQueryInput } from "querystring";
import React, { FC, useContext, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Cookies from 'universal-cookie';

interface IProps {
  classes?: any,
  showPlaces: boolean,
  closeModal?: () => void,
  className?: string,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    btnPlace: {
      color: '#fff',
      background: 'linear-gradient(to right, #bf9ee0, #7b8ee4);',
      margin: '8px 16px 8px 0',
      boxShadow: '0 2px 9px -2px rgba(132,135,138,.2)',
      textTransform: 'initial',
      backgroundColor: '#fff'
    },
    overFlowChip: {
      overflow: 'auto',
      whiteSpace: 'nowrap'
    }
  })
);

const SearchHomeLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { showPlaces, closeModal, className } = props;
  const { t } = useTranslation();
  const { dispatch: dispatchGlobal, width } = useContext(GlobalContext);
  const cookies = new Cookies();
  const cities = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const filter = useSelector<ReducersList, SearchFilterState>(
    (state) => state.searchFilter
  );
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { searchText, city_id, district_id, guestsCount, roomsCount } = filter;
  const dispatchSearch = useDispatch<Dispatch<SearchFilterAction>>();

  const applySearch = () => {
    closeModal && closeModal();
    dispatchGlobal({ type: 'setOverlay', payload: false });
    const pushQuery: ParsedUrlQueryInput = {
      name: city_id === undefined && district_id === undefined ? searchText : '',
      city_id: city_id ? city_id : '',
      district_id: district_id ? district_id : '',
      bedrooms: roomsCount,
      number_guest: guestsCount,
      // discount:''
    };

    Router.push({
      pathname: '/long-term-rooms',
      query: pushQuery
    });
  };

  const locationRoom = (cityId: number) => {
    dispatchSearch({ type: 'SET_SEARCH_CITY', city_id: cityId })
    applySearch();
  };

  let numRecommend: number;
  switch (width) {
    case 'xl': numRecommend = 5;
      break;
    case 'lg': numRecommend = 4;
      break;
    case 'md': numRecommend = 3;
      break;
    case 'sm': numRecommend = 4;
      break;
    default: numRecommend = 4;
  }

  return (
    <RoomFilterContext.Provider value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
      <Grid container spacing={2} className={className}>
        <Grid item xs={12} md={9} style={{ marginBottom: 80 }}>
          <SearchAutoSuggestion />
        </Grid>

        {/* {showPlaces && (
          <Fragment>
            <Grid item xs={12} sm={12} md={11} lg={11} xl={9} className={classes.overFlowChip}>
              <Button variant="contained" className={classes.btnPlace}>
                <GpsFixed style={{ marginRight: 8, color: '#673ab7' }} />
                {t('home:yourLocation')}
              </Button>

              {cities ? cities.map((o, i) => (
                i < numRecommend ? (

                  <Button key={i} variant="contained" className={classes.btnPlace} onClick={() => locationRoom(o.city_id)}>
                    {cookies.get('initLanguage') == 'en' ? cleanAccents(o.name_city) : o.name_city}
                  </Button>
                ) : null
              )) : ''}
            </Grid>
            <Grid item xs />
          </Fragment>
        )} */}
        <Grid item xs={12} md={3}>
          <ButtonGlobal background="linear-gradient(to right, #667eea, #764ba2);" padding="0px" width="100%" height={width === 'xs' ? 40 : 50} onClick={applySearch}>
            {t('home:searchComponent:search')}
          </ButtonGlobal>
        </Grid>
      </Grid>
    </RoomFilterContext.Provider>
  );
};

export default SearchHomeLT;
