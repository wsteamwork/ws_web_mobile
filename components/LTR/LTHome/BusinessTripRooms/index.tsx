import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Theme } from '@fullcalendar/core';
import { createStyles, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShowMoreHome from '../ShowMoreHome';
import BussinessTripCard from './BusinessTripCard';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 24,
      marginTop: 18
    },
    roomList: {
      paddingLeft: '1rem'
      // margin: '0 10px'
    },
    roomItem: {
      padding: '4px !important'
    },
    headContainer: {
      marginBottom: '1rem',
      paddingLeft: '1rem',
      WebkitBoxAlign: 'baseline',
      WebkitBoxPack: 'justify',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      display: 'inline-flex',
      position: 'relative',
    },
    headTitle: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: '26px',
      letterSpacing: '-0.6px',
      color: 'inherit',
      margin: '0px',
      padding: '0px',
    }
  })
);

const BusinessTripRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    getHomePageCollection('business_trip', 4).then((res) => setDataRooms(res));
  }, []);
  return (
    <Fragment>
      <Grid container item xs={12} justify="center" className={classes.root}>
        <Grid item xs={12} container>
          <Grid className={classes.headContainer}>
            <Typography className={classes.headTitle}>{t('home:business_trip')}</Typography>
          </Grid>
          {dataRooms.length ? (
            <Fragment>
              <Grid container item xs={12} className={classes.roomList}>
                {dataRooms.map((room, index) => (
                  <Grid item container xs={6} key={index} className={classes.roomItem}>
                    <BussinessTripCard room={room} />
                  </Grid>
                ))}
              </Grid>
            </Fragment>
          ) : (
              <Grid container item xs={12} className={classes.roomList}>
                {[1, 2, 3, 4].map((item, index) => (
                  <Grid item container xs={6} key={index} className={classes.roomItem}>
                    <Skeleton variant="rect" width="100%" height={220} />
                    <Skeleton variant="text" width="100%" height={8} />
                    <Skeleton variant="text" width="80%" height={8} />
                    <Skeleton variant="text" width="30%" height={8} />
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

export default BusinessTripRooms;
