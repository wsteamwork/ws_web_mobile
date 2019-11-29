import NotFoundGlobal from '@/components/Rooms/Lotte/NotFoundGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { updateObject } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingListReducerAction, getBookingListLT } from '@/store/Redux/Reducers/LTR/BookingList/bookinglist';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { NextPage } from 'next';
import Router from 'next/router';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll/modules';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import { Dispatch } from 'redux';
import BookingCardItem from './BookingCardItem';
import FilterBookingList from './FilterBookingList';
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
const LongTermBookingList: NextPage = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const bookinglist = useSelector<ReducersList, any>((state) => state.bookinglist.bookingList_LT);
  const {
    startDate,
    endDate,
    searchName,
    room_id,
    codeBooking,
    statusBooking,
    currentTab
  } = useSelector<ReducersList, any>((state) => state.bookinglist);
  const meta = useSelector<ReducersList, any>((state) => state.bookinglist.metaLT);
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
      pathname: '/host/booking-list',
      query: updateObject<any>(Router.query, query)
    });
    scrollTop();
  };
  const dispatch = useDispatch<Dispatch<BookingListReducerAction>>();

  useEffect(() => {
    if (!bookinglist.length) {
      getBookingListLT(dispatch, {});
    }
  }, []);

  useEffect(() => {
    getBookingListLT(dispatch, {
      nameSearch: searchName,
      date_start: startDate,
      date_end: endDate,
      status: statusBooking,
      room_id: room_id,
      booking_code: codeBooking
    });
  }, [router.query]);

  const handleSearchLT = () => {
    changePage(1);
    getBookingListLT(dispatch, {
      nameSearch: searchName,
      date_start: startDate,
      date_end: endDate,
      status: statusBooking,
      room_id: room_id,
      booking_code: codeBooking
    });
  };

  return (
    <Fragment>
      {useMemo(
        () => (
          currentTab === 0 ? (<FilterBookingList handleSearch={handleSearchLT} />) : ('')
        ),
        [currentTab]
      )}
      {bookinglist.length ? (
        bookinglist.map((o) => <BookingCardItem key={o.id} booking={o} />)
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

export default LongTermBookingList;
