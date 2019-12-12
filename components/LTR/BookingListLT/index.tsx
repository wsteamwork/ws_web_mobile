import NotFoundGlobal from '@/components/Rooms/Lotte/NotFoundGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { updateObject } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Router from 'next/router';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import React, { Fragment, useEffect, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll/modules';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import { Dispatch } from 'redux';
import {
  getLongTermBookingList,
  LongTermBookingAction
} from '@/store/Redux/Reducers/Booking/long-term-booking';
import BookingCardLT from './BookingCardLT';
interface IProps {
  classes?: any;
  status?: string[];
  bookingType?: number;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(3, 0)
    }
  })
);
const BookingListLT: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { status, bookingType } = props;
  const dispatch = useDispatch<Dispatch<LongTermBookingAction>>();
  const { bookings, meta } = useSelector<ReducersList, any>((state) => state.longTermBookingList);
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
      pathname: '/long-term-bookings',
      query: updateObject<any>(Router.query, query)
    });
    scrollTop();
  };

  useEffect(() => {
    getLongTermBookingList(dispatch, status);
  }, [status]);

  return (
    <Fragment>
      {bookings.length ? (
        bookings.map((o) => <BookingCardLT key={o.id} booking={o} status={status} bookingType={bookingType}/>)
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

export default BookingListLT;
