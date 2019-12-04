import React, { FC, useState, useEffect, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ShowMoreHome from '../ShowMoreHome';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Grid, createStyles, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@fullcalendar/core';
import BussinessTripCard from '../BusinessTripRooms/BusinessTripCard';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 24,
      marginTop: 69
    },
    roomList: {
      margin: '0 10px'
    },
    roomItem: {
      padding: '6px !important'
    },
    headContainer: {
      marginBottom: '12px',
      WebkitBoxAlign: 'baseline',
      WebkitBoxPack: 'justify',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      display: 'inline-flex',
      marginLeft: '18px'
    },
    headTitle: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: '26px',
      letterSpacing: '-0.6px',
      color: 'inherit',
      margin: '0px',
      padding: '0px'
    }
  })
);

const HighEndRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    getHomePageCollection('high_end', 4).then((res) => setDataRooms(res));
  }, []);
  return (
    <Fragment>
      <Grid container item xs={12} justify="center" className={classes.root}>
        <Grid item xs={12} container>
          <Grid item xs={12} className={classes.headContainer}>
            <Typography className={classes.headTitle}>{t('home:high_end')}</Typography>
          </Grid>
          {dataRooms.length ? (
            <Fragment>
              <Grid container item xs={12} spacing={2} className={classes.roomList}>
                {dataRooms.map((room, index) => (
                  <Grid item container xs={6} key={index} className={classes.roomItem}>
                    <BussinessTripCard room={room}/>
                  </Grid>
                ))}
              </Grid>
            </Fragment>
          ) : (
            <LoadingSkeleton type={'rooms'} duplicate={2} />
          )}
        </Grid>
        <ShowMoreHome top="0px" />
      </Grid>
    </Fragment>
  );
};

export default HighEndRooms;
