import React, { Fragment, FC, useEffect, useContext } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NotificationIndexRes } from '@/types/Requests/Notification/NotificationResponse';
import { useSelector, useDispatch } from 'react-redux';
import {
  NotificationReducerAction,
  getDataNotifications
} from '@/store/Redux/Reducers/Notification/notification';
import { Dispatch } from 'redux';
import NotificationItem from './NotificationItem';
import SimpleLoader from '../Loading/SimpleLoader';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    listLayout: {
      margin: 0,
      paddingLeft: 0,
      listStyle: 'none'
    }
  })
);

const NotificationList: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch<Dispatch<NotificationReducerAction>>();
  const { router } = useContext(GlobalContext);
  const notifications = useSelector<ReducersList, NotificationIndexRes[]>(
    (state) => state.notifications.notifications
  );

  useEffect(() => {
    getDataNotifications(router, dispatch);
  }, [notifications]);

  return (
    <Fragment>
      {notifications ? (
        <Grid className={classes.panel}>
          <ul className={classes.listLayout}>
            {notifications.map((noti, index) => (
              <NotificationItem key={index} notification={noti} />
            ))}
          </ul>
        </Grid>
      ) : (
          <SimpleLoader />
        )}
    </Fragment>
  );
};

export default NotificationList;
