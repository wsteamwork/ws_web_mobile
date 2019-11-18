import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { formatPrice } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      border: (props) => props.border || '1px soild #ddd',
      borderRadius: (props) => props.borderRadius || '4px',
      cursor: 'pointer',
      overflow: 'hidden',
      marginBottom: (props) => props.marginBottom || theme.spacing(2),
      height: 100
    },
    content: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: '0.5rem'
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    roomName: {
      fontWeight: 'bold',
      fontSize: (props) => props.fontSize || '0.85rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    textContent: {
      fontSize: (props) => props.fontSize || '1rem'
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    priceHour: {
      paddingLeft: '1rem',
      fontSize: 14
    },
    priceDay: {
      fontSize: 14
    },
    link: {
      color: '#484848'
    }
  })
);

interface IProps {
  maxWidth?: string | number;
  fontSize?: string | number;
  border?: string;
  borderRadius?: string | number;
  marginBottom?: string | number;
  room: RoomIndexRes;
}

const VisitedRoom: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { room } = props;
  const { width } = useContext(GlobalContext);
  return (
    <Paper className={classes.paper}>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={4} style={{ height: '100%' }}>
          <Link href={`/room/${room.id}`}>
            <img
              className={classes.img}
              alt={room.media.data[0].image}
              src={`${IMAGE_STORAGE_SM + room.media.data[0].image}`}
            />
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Grid item xs className={classes.content}>
            <Link href={`/room/${room.id}`}>
              <a className={classes.link}>
                <Typography className={classes.roomName}>{room.details.data[0].name}</Typography>
              </a>
            </Link>
            <Hidden xsDown implementation="css">
              <Grid className={classes.price}>
                <Typography variant="subtitle1" className={classes.priceDay}>
                  {formatPrice(room.price_day)} /{t('rooms:night')}
                </Typography>

                {room.price_hour !== 0 && (
                  <Typography variant="subtitle1" className={classes.priceHour}>
                    {formatPrice(room.price_hour)} /4{t('rooms:hour')}
                  </Typography>
                )}
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VisitedRoom;
