import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction, SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';
import { FormControl, InputBase, MenuItem, Select, Theme } from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import Router from 'next/router';
import { ParsedUrlQueryInput } from "querystring";
import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
  classes?: any
}

const CustomInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
      height: '100%'
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      fontSize: '16px !important',
      padding: '10px 26px 10px 12px !important',
      backgroundColor: '#f5f5f5 !important',
      height: 'calc(100% - 20px) !important',
      alignItems: 'center',
      display: 'flex !important',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    }
  }),
)(InputBase);


const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    select: {
      width: '100%',
      height: '100%'
    },
    customMenuItem: {
      width: '100%'
    }
  })
);

const SelectLeaseTypeGlobal: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();

  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const [leaseType, setLeaseType] = useState<number>(leaseTypeGlobal);
  const filter = useSelector<ReducersList, SearchFilterState>(
    (state) => state.searchFilter
  );
  const { searchText, city_id, district_id, guestsCount, roomsCount } = filter;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLeaseType(parseInt(event.target.value));
    dispatch({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: parseInt(event.target.value) ? 1 : 0,
      leaseTypePathName: parseInt(event.target.value) ? '/long-term-rooms' : '/rooms'
    });
  };

  useEffect(() => {
    if (leaseType) {
      const pushQueryLT: ParsedUrlQueryInput = {
        name: city_id === undefined && district_id === undefined ? searchText : '',
        city_id: city_id ? city_id : '',
        district_id: district_id ? district_id : '',
        bedrooms: roomsCount,
        number_guest: guestsCount,
        // discount:''
      };
      Router.push({
        pathname: '/long-term-rooms',
        query: pushQueryLT
      });
    } else {
      const pushQueryST: ParsedUrlQueryInput = {
        name: city_id === undefined && district_id === undefined ? searchText : '',
        number_of_rooms: roomsCount,
        number_of_guests: guestsCount,
        city_id: city_id ? city_id : '',
        district_id: district_id ? district_id : ''
      };
      Router.push({
        pathname: '/rooms',
        query: pushQueryST
      });
    }
  }, [leaseType]);


  return (
    <Fragment>
      <FormControl className={classes.select}>
        <Select
          id="leaseType-select-label"
          value={leaseType}
          onChange={handleChange}
          input={<CustomInput />}
          fullWidth
        >
          <MenuItem value={0}>{t('roomlist:leaseTypeShortTerm')}</MenuItem>
          <MenuItem value={1}>{t('roomlist:leaseTypeLongTerm')}</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  );
};

export default SelectLeaseTypeGlobal;
