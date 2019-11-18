import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Grid, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import VisitedRoom from './VisitedRoom';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    label: {
      textAlign: 'left',
      fontWeight: 700,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4)
    }
  })
);

const VisitedRooms: FC = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const visitedRoom = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.visitedRoom.visitedRoom
  );

  return (
    visitedRoom.length > 0 && (
      <Grid>
        <Typography variant="h5" className={classes.label}>
          {t('rooms:visitedRoom')}
        </Typography>
        <Paper elevation={0}>
          {visitedRoom.map((room, index) => (
            <VisitedRoom key={index} room={room} />
          ))}
        </Paper>
      </Grid>
    )
  );
};

export default VisitedRooms;
