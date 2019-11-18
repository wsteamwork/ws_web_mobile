import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import { RoomReviewIndexResponse } from '@/types/Requests/Rooms/RoomReviewIndexResponse';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: '100%',
      width: '100%',
      overflow: 'hidden',
      boxShadow: 'none',
      [theme.breakpoints.down('xs')]: {
        maxWidth: 'none !important',
        border: '1px solid #fff !important',
        borderRadius: '0 !important'
      }
    },
    content: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: '0.8rem'
    },
    userName: {
      fontWeight: 'bold',
      fontSize: '1.0rem'
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    avatar: {
      marginLeft: 0,
      width: 50,
      height: 50
    },
    iconHeartBlue: {
      color: '#08C299',
      marginRight: 3
    },
    iconHeartWhite: {
      color: '#ddd',
      marginRight: 3
    },
    review: {
      marginTop: '0.7rem',
      paddingRight: '1rem'
    },
    button: {
      color: '#08C299',
      padding: 0,
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      }
    },
    dialog: {
      padding: '1rem'
    },
    comment: {
      padding: '0 1rem 0 1rem'
    },
    marginAvatar: {
      marginRight: 10
    }
  })
);

interface IProps {
  maxWidth?: string | number;
  review: RoomReviewIndexResponse;
}

const ReviewItem: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { review } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { width } = useContext<IGlobalContext>(GlobalContext);
  const limitStr = (): number => {
    if (width === 'lg' || width === 'md' || width === 'xl') return 100;
    else return 70;
  };

  const arrMenuItem = (x: number): any[] => {
    let i = 1;
    let arr = [];
    let z = Math.round(x);
    while (i <= 5) {
      if (i <= z) {
        arr.push(
          <FontAwesomeIcon
            key={i}
            className={classes.iconHeartBlue}
            icon={faHeart}></FontAwesomeIcon>
        );
      } else {
        arr.push(
          <FontAwesomeIcon
            key={i}
            className={classes.iconHeartWhite}
            icon={faHeart}></FontAwesomeIcon>
        );
      }
      i++;
    }
    return arr;
  };

  const handleClickOpen = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid
          item
          xs={3}
          sm={3}
          md={2}
          lg={2}
          className={width == 'lg' ? classes.marginAvatar : ''}>
          {review.user.data.avatar_url !== '' ? (
            <Avatar alt="Avatar" src={review.user.data.avatar_url} className={classes.avatar} />
          ) : (
              <Avatar className={classes.avatar}></Avatar>
            )}
        </Grid>
        <Grid container item xs={9} sm={9} md={10} lg={9}>
          <Grid item xs className={classes.content}>
            <Typography className={classes.userName}>
              {review.user.data
                ? review.user.data.name
                  ? review.user.data.name
                  : t('rooms:anonymous')
                : t('rooms:anonymous')}
            </Typography>
            <Grid container className={classes.price}>
              <Grid item>{arrMenuItem(review.avg_rating)}</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.review}>
          <Grid item xs={12}>
            {review.comment ? (
              review.comment.length > limitStr() + 11 ? (
                <Fragment>
                  <span>{review.comment.substring(0, limitStr())}</span>
                  <span>
                    <Button onClick={handleClickOpen} className={classes.button} size="small">
                      &#8230; {t('rooms:readMore')}
                    </Button>
                  </span>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    className={classes.dialog}
                    fullScreen={fullScreen}
                    aria-labelledby="responsive-dialog-title">
                    <Grid container className={classes.dialog}>
                      <Grid item xs={3} sm={2}>
                        {review.user.data.avatar_url !== '' &&
                          review.user.data.avatar !== 'default_avatar.jpg' ? (
                            <Avatar
                              alt="Avatar"
                              src={review.user.data.avatar_url}
                              className={classes.avatar}
                            />
                          ) : (
                            <Avatar className={classes.avatar}></Avatar>
                          )}
                      </Grid>
                      <Grid container item xs={9} sm={10}>
                        <Grid item xs className={classes.content}>
                          <Typography className={classes.userName}>
                            {review.user.data
                              ? review.user.data.name
                                ? review.user.data.name
                                : t('rooms:anonymous')
                              : t('rooms:anonymous')}
                          </Typography>
                          <Grid container className={classes.price}>
                            <Grid item>{arrMenuItem(review.avg_rating)}</Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.comment}>
                      <Grid item xs={12}>
                        {review.comment}
                      </Grid>
                      <Grid item xs={12}>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary" autoFocus>
                            {t('rooms:close')}
                          </Button>
                        </DialogActions>
                      </Grid>
                    </Grid>
                  </Dialog>
                </Fragment>
              ) : (
                  review.comment
                )
            ) : (
                t('rooms:noComment')
              )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReviewItem;
