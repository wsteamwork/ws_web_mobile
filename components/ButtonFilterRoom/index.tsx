import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import mainColor from '@/styles/constants/colors';
import { Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { Sort } from '@material-ui/icons';
import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterDrawerMobile from '../Rooms/FilterDrawerMobile/index';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: 55
    },
    boxLeft: {
      paddingLeft: 8,
      fontSize: 13
    },
    boxRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      fontSize: 15
    },
    textLeft: {
      fontSize: 13
    },
    textRight: {
      fontSize: 15
    },
    btnRightLT: {
      color: mainColor.primaryLT
    },
    btnRightST: {
      color: mainColor.primary
    }
  })
);

const ButtonFilterRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { state } = useContext(RoomIndexContext);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const { meta } = state;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container item xs={11} className={classes.boxWrapper}>
      <Grid item xs={6} className={classes.boxLeft}>
        <Typography className={classes.textLeft}>
          {meta && meta.pagination ? meta.pagination.total : 0} {t('rooms:resultsFound')}
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.boxRight}>
        <Typography className={classes.textRight}>{t('rooms:searchRooms:filterRooms')}</Typography>
        <IconButton onClick={handleOpenDialog}>
          <Sort className={leaseTypeGlobal ? classes.btnRightLT : classes.btnRightST} />
        </IconButton>
      </Grid>
      <FilterDrawerMobile handleClose={handleCloseDialog} open={openDialog} />
    </Grid>
  );
};

export default ButtonFilterRoom;
