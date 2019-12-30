import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import mainColor from '@/styles/constants/colors';
import { makeStyles, Theme, ButtonGroup, Button } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, useContext, Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    btnGroup: {
      position: 'fixed',
      bottom: '11%',
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
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const handleChangeLeaseType = (i: 0 | 1) => {
    dispatch({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: i,
      leaseTypePathName: i ? '/long-term-rooms' : '/rooms'
    });
  };

  return (
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
  );
};

export default ButtonChangeLeaseType;
