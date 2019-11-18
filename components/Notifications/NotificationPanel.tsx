import React, { Fragment, FC, useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Pagination } from '@/types/Requests/ResponseTemplate';
import PaginationRC from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import { updateObject } from '@/store/Context/utility';
import { useTranslation } from 'react-i18next';
import NotificationList from './NotificationList';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import Router from 'next/router';
import { NotificationIndexRes } from '@/types/Requests/Notification/NotificationResponse';
import NotFoundNotification from '../Rooms/Lotte/NotFoundNotification';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    notificationListContainer: {
      margin: '0 auto'
    },
    notificationContainer: {
      margin: '0',
      border: '1px solid #EBEBEB'
    },
    notificationNavContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderBottom: '1px solid #EBEBEB',
      boxOrient: 'vertical',
      width: '100%'
    },
    notificationNav: {
      width: '100% !important',
      fontSize: 18,
      fontWeight: 500,
      padding: '5px 16px',
      backgroundColor: '#edefed'
    }
  })
);

const NotificationPanel: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const meta = useSelector<ReducersList, Pagination>((state) => state.notifications.meta);
  const notifications = useSelector<ReducersList, NotificationIndexRes[]>(
    (state) => state.notifications.notifications
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const changePage = (current: number) => {
    setCurrentPage(current);
    const query = {
      page: current
    };
    Router.push({
      pathname: '/profile',
      query: updateObject<any>(Router.query, query)
    });
  };
  useEffect(() => {
    setIsEmpty(notifications.length === 0);
  }, [notifications]);
  return !isEmpty ? (
    <Fragment>
      <Grid className={classes.notificationContainer}>
        <Grid className={classes.notificationNavContainer}>
          <Grid className={classes.notificationNav}>{t('home:notification')}
          </Grid>
        </Grid>
        <Grid className={classes.notificationListContainer}>
          <NotificationList />
        </Grid>
      </Grid>
      {meta && (
        <PaginationRC
          className="rooms-pagination"
          total={meta.pagination.total}
          locale={localeInfo}
          pageSize={meta.pagination.per_page}
          current={currentPage}
          onChange={changePage}
        />
      )}
    </Fragment>
  ) : (
      <NotFoundNotification height={300} width={250} />
    );
};

export default NotificationPanel;
