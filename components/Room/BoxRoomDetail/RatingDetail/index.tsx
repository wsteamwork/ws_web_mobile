import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      cursor: 'pointer',
      overflow: 'hidden',
      boxShadow: 'none',
      padding: '1.3rem 0'
    },
    rating: {
      alignSelf: 'center'
    },
    rowMargin: {
      marginBottom: 6
    },
    rowMargin2: {
      margin: '10px 0'
    },
    boxMark: {
      backgroundColor: '#fff',
      borderRadius: '50%',
      height: 90,
      width: 90,
      overflow: 'hidden',
      position: 'relative',
      border: 'double 9px transparent',
      backgroundImage:
        'linear-gradient(white, white), radial-gradient( circle farthest-corner at 10% 20%,  rgba(253,193,104,1) 0%, rgba(251,128,128,1) 90% );',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      [theme!.breakpoints!.down!('xs')]: {
        margin: '0 auto',
      }
    },
    Mark: {
      backgroundColor: '#1ba0e2',
      backgroundImage:
        'radial-gradient( circle farthest-corner at 10% 20%,  rgba(253,193,104,1) 0%, rgba(251,128,128,1) 90% );',
      borderRadius: '50%',
      width: '90%',
      height: '90%',
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      top: '50%',
      WebkitTransform: 'translateX(-50%) translateY(-50%)',
      MozTransform: 'translateX(-50%) translateY(-50%)',
      transform: 'translateX(-50%) translateY(-50%)'
    },
    TypoMark: {
      color: '#fff',
      fontSize: '1.7vw',
      fontWeight: 500,
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      top: '50%',
      WebkitTransform: 'translateX(-50%) translateY(-50%)',
      MozTransform: 'translateX(-50%) translateY(-50%)',
      transform: 'translateX(-50%) translateY(-50%)',
      [theme!.breakpoints!.down!('md')]: {
        fontSize: '3.5vw'
      },
      [theme!.breakpoints!.down!('sm')]: {
        fontSize: '4.5vw'
      },
      [theme!.breakpoints!.down!('xs')]: {
        fontSize: '8vw'
      }
    },
    status: {
      color: '#08C299',
      fontWeight: 500,
      fontSize: '1.2vw',
      [theme!.breakpoints!.down!('md')]: {
        fontSize: '2vw'
      },
      [theme!.breakpoints!.down!('sm')]: {
        fontSize: '2.5vw',
        paddingTop: 5
      },
      [theme!.breakpoints!.down!('xs')]: {
        fontSize: '4.5vw',
        paddingTop: 5,
        textAlign: 'center'
      }
    },
    subStatus: {
      [theme!.breakpoints!.down!('xs')]: {
        textAlign: 'center'
      }
    },
    contentRating: {
      alignItems: 'center'
    },
    ratingName: {
      fontWeight: 700,
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14
      }
    },
  })
);
const StyledRating = withStyles({
  iconFilled: {
    color: '#08C299'
  },
  root: {
    justifyContent: 'center'
  }
})(Rating);

interface IProps {
  room: RoomIndexRes;
}

const RatingDetail: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  // const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const { room } = props;
  const arrRating = [
    {
      name: t('rooms:cleanliness'),
      rating: room.avg_cleanliness
    },
    {
      name: t('rooms:quality'),
      rating: room.avg_quality
    },
    {
      name: t('rooms:service'),
      rating: room.avg_service
    },
    {
      name: t('rooms:valuable'),
      rating: room.avg_valuable
    },
    {
      name: t('rooms:rating'),
      rating: room.avg_rating
    }
  ];
  const arrMenuItem = (x: number): any => {
    return (
      <StyledRating
        name="customized-color"
        readOnly={true}
        value={x}
        precision={0.5}
        max={5}
        icon={<FavoriteIcon fontSize="inherit" />}
      />
    );
  };
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid container item xs={12} sm={6} md={6} className={classes.rating} >
          <Grid item className={classes.rowMargin2}>
            <Grid container className={classes.contentRating}>
              <Grid item xs>
                <div className={classes.boxMark}>
                  <div className={classes.Mark}>
                    <Typography variant={'h5'} className={classes.TypoMark}>
                      {room.avg_rating}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={9} md={9} lg={8} xl={9}>
                <Typography variant={'h5'} className={classes.status}>
                  {room.avg_rating_txt}
                </Typography>
                <Typography className={classes.subStatus}>
                  {t('rooms:contentRating1')} {room.avg_rating_txt}, {t('rooms:contentRating2')}
                  {room.total_review} {t('rooms:contentRating3')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6} container alignContent='space-around'>
          {_.map(arrRating, (item, index) => (
            <Grid container key={index} className={classes.rowMargin}>
              <Grid item xs={4} sm={3} lg={5}>
                <Typography variant={'body1'} align='right' className={classes.ratingName}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={8} sm={9} lg={7}>
                {arrMenuItem(item.rating)}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RatingDetail;
