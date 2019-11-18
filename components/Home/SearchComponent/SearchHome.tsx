import GridContainer from '@/components/Layout/Grid/Container';
import SearchHomeLT from '@/components/LTR/LTHome/SearchHomeLT';
import NavHeaderHome from '@/components/Toolbar/NavHeaderHome';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { Grid } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

const SearchHome = () => {
  const { t } = useTranslation();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);
  const [indexTab, setIndexTab] = useState<number>(leaseTypeGlobal);
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();

  return useMemo(
    () => (
      <GridContainer xs={12} classNameItem='searchHome'>
        <NavHeaderHome />
        <div className="searchHomeLayer">
          <GridContainer xs={11} sm={11} md={11} lg={10} classNameItem='searchHome__opa' >
            <GridContainer xs={11} md={11}>
              <Grid className='searchHome__title'>
                <h3>{t('home:searchComponent:sloganLongterm')}</h3>
              </Grid>
              <div className="searchHome__content">
                <SearchHomeLT showPlaces />
              </div>
            </GridContainer>
          </GridContainer>
        </div>
      </GridContainer>
    ),
    [t, indexTab]
  );
};

export default SearchHome;
