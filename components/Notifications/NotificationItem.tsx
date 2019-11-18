import React, { Fragment, FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Avatar, Hidden } from '@material-ui/core';
import numeral from 'numeral';
import { NotificationIndexRes } from '@/types/Requests/Notification/NotificationResponse';
import { getFirstLetterOfName } from '@/utils/mixins';
import moment from 'moment';
interface IProps {
  classes?: any;
  notification: NotificationIndexRes;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    noti: {
      padding: '15px 0px',
      margin: 0,
      position: 'relative',
      borderBottom: '1px solid #dce0e0',
      cursor: 'pointer'
    },
    avatarBox: {
      display: 'flex',
      justifyContent: 'center'
    },
    imgBox: {
      height: 52,
      width: 52,
      display: 'block',
      position: 'relative'
    },
    imgAvatar: {
      width: 52,
      height: 52,
      [theme.breakpoints.down('xs')]: {
        width: 40,
        height: 40
      }
    },
    boxItem: {
      padding: '0px 12px 0',
      textAlign: 'left'
    },
    bookingStatus: {
      padding: '0px 12px 0',
      textAlign: 'center'
    },
    bodyContent: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: '#484848'
    },
    status: {
      fontWeight: 700,
      color: '#3fb34f'
    },
    notiUnread: {
      fontWeight: 700
    }
  })
);

const NotificationItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { notification } = props;
  const timeBook = (checkin: string, checkout: string, booking_type: number = 1) => {
    if (booking_type === 1) {
      let diffHours = Math.abs(new Date(checkout).getHours() - new Date(checkin).getHours());
      return (
        diffHours +
        ' giờ' +
        ' - ' +
        moment(checkin).format('Do MMM') +
        ', ' +
        moment(checkin).format('YYYY')
      );
    } else {
      return (
        moment(checkin).format('Do MMM') +
        ' - ' +
        moment(checkout).format('Do MMM') +
        ', ' +
        moment(checkin).format('YYYY')
      );
    }
  };
  const formatCreated = (date: string) => {
    let dateNow = moment().format('L');
    let dateNoti = moment(date).format('L');
    if (dateNow === dateNoti) {
      return moment(date).format('LT');
    }
    return moment(date).format('Do MMM');
  };
  return (
    <Fragment>
      <li className={classes.noti}>
        <Grid container>
          <Grid item xs={6} sm={5} md={5} lg={4} xl={3}>
            <Grid container>
              <Grid item xs={5} sm={4} className={classes.avatarBox}>
                <Grid className={classes.imgBox}>
                  {notification.data.sender_name === 'Westay' ? (
                    <Avatar
                      alt="westay"
                      src="/static/images/westay-avatar.jpg"
                      className={classes.imgAvatar}
                    />
                  ) : (
                      <Avatar className={classes.imgAvatar}>
                        {getFirstLetterOfName(notification.data.sender_name)}
                      </Avatar>
                    )}
                </Grid>
              </Grid>
              <Grid item xs={7} sm={8} className={classes.boxItem}>
                <Typography className={classes.notiUnread}>
                  {notification.data.sender_name}
                </Typography>
                <Typography>{formatCreated(notification.data.created)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.boxItem} item xs={6} sm={7} md={7} lg={5} xl={6}>
            {notification.data.type !== 1 && notification.data.type !== 4 ? (
              <Fragment>
                <Typography className={classes.notiUnread}>
                  {notification.data.body ? notification.data.body : ''}
                </Typography>
                <Typography>
                  (
                  {timeBook(
                    notification.data.checkin,
                    notification.data.checkout,
                    notification.data.booking_type
                  )}
                  )
                </Typography>
              </Fragment>
            ) : (
                <Fragment>
                  <Typography className={classes.notiUnread}>
                    {notification.data.title ? notification.data.title : ''}
                  </Typography>
                  <Typography className={classes.bodyContent}>
                    {notification.data.body ? notification.data.body : ''}
                  </Typography>
                </Fragment>
              )}
          </Grid>
          <Hidden mdDown>
            <Grid item lg={3} xl={3} className={classes.bookingStatus}>
              {notification.data.type !== 1 && (
                <Fragment>
                  <Typography className={classes.status}>
                    {notification.data.payment_status_txt
                      ? notification.data.payment_status_txt
                      : 'Chưa thanh toán'}
                  </Typography>
                  <Typography className={classes.priceBooking}>
                    {notification.data.total_fee
                      ? numeral(notification.data.total_fee).format('0,0') + ' vnđ'
                      : ''}
                  </Typography>
                </Fragment>
              )}
            </Grid>
          </Hidden>
        </Grid>
      </li>
    </Fragment>
  );
};

export default NotificationItem;
