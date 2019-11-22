import { makeStyles, Theme, Typography, Grid, IconButton } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, useContext } from 'react';
import { Sort } from '@material-ui/icons';
import mainColor from '@/styles/constants/colors';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
  handleFilterAction?: () => void;
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
    btnRight: {
      color: mainColor.primaryLT
    }
  })
);

const ButtonFilterRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { handleFilterAction } = props;
  const { state } = useContext(RoomIndexContext);
  const { meta } = state;
  return (
    <Grid container item xs={11} className={classes.boxWrapper}>
      <Grid item xs={6} className={classes.boxLeft}>
        <Typography className={classes.textLeft}>{ meta && meta.pagination ? meta.pagination.total : 0 } {t('rooms:resultsFound')}</Typography>
      </Grid>
      <Grid item xs={6} className={classes.boxRight}>
  <Typography className={classes.textRight}>{t('rooms:searchRooms:filterRooms')}</Typography>
        <IconButton onClick={handleFilterAction}>
          <Sort className={classes.btnRight} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ButtonFilterRoom;
