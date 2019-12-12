import { GlobalContext } from '@/store/Context/GlobalContext';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Theme } from '@fullcalendar/core';
import { createStyles, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BussinessTripCard from '../BusinessTripRooms/BusinessTripCard';
import ShowMoreHome from '../ShowMoreHome';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 24,
      marginTop: 18,
      margin: '0 18px'
    },

    roomItem: {
      padding: '6px !important'
    }
  })
);

const StudioForRent: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);

  useEffect(() => {
    getHomePageCollection('studio_for_rent', 5).then((res) => setDataRooms(res));
  }, []);

  return (
    <Fragment>
      <Grid container justify="center" className={classes.root}>
        <Grid container>
          <Grid className="head-title-container">
            <Grid className="head-title">{t('home:collectionRooms:studioForRent')}</Grid>
          </Grid>
          {dataRooms.length ? (
            <Fragment>
              <Grid container spacing={2} className={classes.roomList}>
                {dataRooms.map((room, index) => (
                  <Grid item container xs={6} key={index} className={classes.roomItem}>
                    <BussinessTripCard room={room} imgHeight={150} />
                  </Grid>
                ))}
              </Grid>
            </Fragment>
          ) : (
              <Grid container spacing={2} className={classes.roomList}>
                {[1, 2, 3, 4].map((item, index) => (
                  <Grid item container xs={6} key={index} className={classes.roomItem}>
                    <Skeleton variant="rect" width="100%" height={220} />
                    <Skeleton variant="text" width="100%" height={10} />
                    <Skeleton variant="text" width="80%" height={10} />
                    <Skeleton variant="text" width="30%" height={10} />
                  </Grid>
                ))}
              </Grid>
            )}
        </Grid>
        <ShowMoreHome top="0px" />
      </Grid>
    </Fragment>
  );
};

export default StudioForRent;
