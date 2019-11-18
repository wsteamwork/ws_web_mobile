import NotFoundGlobal from '@/components/Rooms/Lotte/NotFoundGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { updateObject } from '@/store/Context/utility';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getRoomList, RoomListReducerAction } from '@/store/Redux/Reducers/LTR/RoomList/roomlist';
import { getCookieFromReq } from '@/utils/mixins';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { NextPage } from 'next';
import Router from 'next/router';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll/modules';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import { Dispatch } from 'redux';
import RoomCardItem from './RoomCardItem';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(3, 0)
    }
  })
);
const RoomListHost: NextPage = (props) => {
  const { t } = useTranslation();
  const { router } = useContext(GlobalContext);
  const classes = useStyles(props);
  const roomlist = useSelector<ReducersList, any[]>((state) => state.roomlist.roomlist);
  const meta = useSelector<ReducersList, any>((state) => state.roomlist.meta);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const scrollTop = () => {
    let duration = 500 + window.scrollY * 0.1;
    let effect: Partial<ReactScrollLinkProps> = {
      smooth: 'easeInOutQuad',
      isDynamic: true,
      duration
    };
    scroll.scrollToTop(effect);
  };

  const changePage = (current: number) => {
    setCurrentPage(current);
    const query = {
      page: current
    };
    Router.push({
      pathname: '/host/room-list',
      query: updateObject<any>(Router.query, query)
    });
    scrollTop();
  };

  const dispatch = useDispatch<Dispatch<RoomListReducerAction>>();

  useEffect(() => {
    if (!roomlist.length) {
      getRoomList(dispatch);
    }
  }, [roomlist]);
  useEffect(() => {
    getRoomList(dispatch);
  }, [router.query]);

  useEffect(() => {
    getRoomList(dispatch);
  }, [router.query]);

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center" className={classes.title}>
        <h2>{t('roomlist:titleName')}</h2>
      </Grid>
      {roomlist.length ? (
        roomlist.map((o) => <RoomCardItem key={o.id} room={o} />)
      ) : (
          <NotFoundGlobal height={300} width={250} content={t('roomlist:contentNotFound')} />
        )}
      {meta && (
        <Pagination
          className="rooms-pagination"
          total={meta.pagination.total}
          locale={localeInfo}
          pageSize={meta.pagination.per_page}
          current={currentPage}
          onChange={changePage}
        />
      )}
    </Fragment>
  );
};
RoomListHost.getInitialProps = async ({ req, store }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const token = getCookieFromReq(req, '_token');
  const res = await getRoomList(store.dispatch, initLanguage, token);

  return {};
};
export default RoomListHost;
