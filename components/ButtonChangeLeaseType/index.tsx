import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import mainColor from '@/styles/constants/colors';
import { Button, ButtonGroup, Grid, makeStyles, Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { ParsedUrlQueryInput } from 'querystring';
import React, { Dispatch, FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
interface IProps {
  classes?: any;
  isHomePage?: boolean;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      margin: '0 auto'
    },
    btnGroup: {
      position: 'fixed',
      bottom: '9%',
      backgroundColor: '#ffffff',
      color: 'white',
      borderRadius: 25,
      zIndex: 10,
      fontWeight: 600,
      boxShadow: '0px 9px 20px rgba(0, 0, 0, 0.06)'
    },
    btnST: {
      textTransform: 'none',
      borderRadius: '25px 0 0 25px'
    },
    btnActiveST: {
      color: '#ffffff',
      backgroundColor: '#FA991C !important',
      textTransform: 'none',
      borderRadius: '25px 0 0 25px'
    },
    btnActiveLT: {
      color: '#ffffff',
      backgroundColor: '#673ab7 !important',
      textTransform: 'none',
      borderRadius: '0 25px 25px 0'
    },
    btnLT: {
      textTransform: 'none',
      borderRadius: '0 25px 25px 0',
      color: mainColor.primaryLT
    }
  })
);

const ButtonChangeLeaseType: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { isHomePage } = props;
  const { t } = useTranslation();
  const { router } = useContext(GlobalContext);
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const {
    searchText,
    city_id,
    district_id,
    startDate,
    endDate,
    bookingType,
    roomType,
    roomsCount,
    guestsCount,
    leaseTypeGlobal
  } = useSelector<ReducersList, any>((state) => state.searchFilter);

  const handleChangeLeaseType = async (i: 0 | 1) => {
    dispatch({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: i,
      leaseTypePathName: i ? '/long-term-rooms' : '/rooms'
    });
    if (!isHomePage) {
      if (i) {
        let pushQuery: ParsedUrlQueryInput = {
          name: city_id === undefined && district_id === undefined ? searchText : '',
          city_id: city_id ? city_id : '',
          district_id: district_id ? district_id : ''
        };
        router.push({
          pathname: '/long-term-rooms',
          query: pushQuery
        });
      } else {
        let pushQuery: ParsedUrlQueryInput = {
          name: city_id === undefined && district_id === undefined ? searchText : '',
          number_of_rooms: roomsCount,
          check_in: startDate,
          check_out: endDate,
          number_of_guests: guestsCount,
          rent_type: bookingType !== 0 ? bookingType : undefined,
          type_room: roomType !== 0 ? roomType : undefined,
          city_id: city_id ? city_id : '',
          district_id: district_id ? district_id : ''
        };
        router.push({
          pathname: '/rooms',
          query: pushQuery
        });
      }
    }
  };

  return (
    <Grid item xs={12} className={classes.boxWrapper}>
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="text primary button group"
        className={classes.btnGroup}>
        <Button
          onClick={() => handleChangeLeaseType(0)}
          className={leaseTypeGlobal ? classes.btnST : classes.btnActiveST}>
          Ngắn hạn
        </Button>
        <Button
          onClick={() => handleChangeLeaseType(1)}
          className={leaseTypeGlobal ? classes.btnActiveLT : classes.btnLT}>
          Dài hạn
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default ButtonChangeLeaseType;
