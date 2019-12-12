import { Dialog, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { Sort } from '@material-ui/icons';
import React, { FC, Fragment, useState, useReducer } from 'react';
import FilterDrawerMobile from '../Rooms/FilterDrawerMobile';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';

interface IProps {
  classes?: any;
  isHidden?: boolean;
  showTextCenter?: boolean;
  textCenter?: string;
  showBackAction?: boolean;
  handleBackAction?: () => void;
  showFavoriteAction?: boolean;
  handleFavoriteAction?: () => void;
  showLocationAction?: boolean;
  handleLocationAction?: () => void;
  showFilterAction?: boolean;
  handleFilterAction?: () => void;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: 55,
      margin: '0 auto'
    },
    boxCenter: {
      display: 'flex',
      justifyContent: 'center'
    },
    boxRight: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    textCenter: {
      fontSize: '1rem',
      fontWeight: 'bold'
    },
    btnLike:{
      backgroundColor:'#fff',
      padding:8,
      '&:hover':{
        backgroundColor:'#fff',
      }
    }
  })
);
const NavTop: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const {
    isHidden,
    showTextCenter,
    textCenter,
    showBackAction,
    handleBackAction,
    showFavoriteAction,
    handleFavoriteAction,
    showLocationAction,
    handleLocationAction,
    showFilterAction,
    handleFilterAction
  } = props;
  return !isHidden ? (
    <RoomFilterContext.Provider
    value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
    <Grid container item xs={11} className={classes.boxWrapper}>
      <Grid item xs={4} className={classes.boxLeft}>
        {showBackAction ? (
          <IconButton onClick={handleBackAction}>
            <img src={'/static/images/left-arrow.svg'} width={24} height={24} />
          </IconButton>
        ) : (
          ''
        )}
      </Grid>
      <Grid item xs={4} className={classes.boxCenter}>
        {showTextCenter ? <Typography className={classes.textCenter}>{textCenter}</Typography> : ''}
      </Grid>
      <Grid item xs={4} className={classes.boxRight}>
        {showFavoriteAction ? (
          <IconButton onClick={handleFavoriteAction} className={classes.btnLike}>
            <img src={'/static/images/Heart.svg'} width={24} height={24} />
          </IconButton>
        ) : (
          ''
        )}
        {showLocationAction ? (
          <IconButton onClick={handleLocationAction}>
            <img src={'/static/images/maps-and-flags.svg'} width={24} height={24} />
          </IconButton>
        ) : (
          ''
        )}
        {showFilterAction ? (
          <IconButton onClick={handleOpenFilter}>
            <Sort className={classes.btnRight} />
          </IconButton>
        ) : (
          ''
        )}
      </Grid>
      <FilterDrawerMobile handleClose={handleCloseFilter} open={openFilter} />
    </Grid>
    </RoomFilterContext.Provider>
  ) : (
    <Fragment/>
  );
};
NavTop.defaultProps = {
  isHidden: false,
  showTextCenter: true,
  showBackAction: true,
  showFavoriteAction: true,
  showLocationAction: false,
  showFilterAction: false
};
export default NavTop;
