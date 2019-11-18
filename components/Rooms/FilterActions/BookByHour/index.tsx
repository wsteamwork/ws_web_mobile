import CustomPopper from '@/components/CustomPopper';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList, ReducersType } from '@/store/Redux/Reducers';
import { SearchFilterAction, SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { FC, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

interface IProps {
  filter: SearchFilterState;
  updateBookingType: (type: number) => void;
}

const BookByHour: FC<IProps> = (props) => {
  const { filter, updateBookingType } = props;
  const { bookingType } = filter;
  const { t } = useTranslation();
  const { dispatch, state } = useContext(RoomIndexContext);
  const { router } = useContext(GlobalContext);
  const { query } = router;
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  useEffect(() => {
    if (!!query.rent_type) {
      updateBookingType(parseInt(query.rent_type as string, 10));
    }
  }, [query]);

  const handleClick = () => {
    if (bookingType === 2) {
      updateBookingType(1);
      updateRouter('/rooms', true, 'rent_type', 1, 'page', 1);
    } else {
      updateBookingType(2);
      updateRouter('/rooms', true, 'rent_type', 2, 'page', 1);
    }
  };

  return useMemo(
    () => (
      <CustomPopper
        arrow
        placement="bottom"
        duration={200}
        content={
          <Grid>
            <p>{t('rooms:searchRooms:descBookByHour')}</p>
          </Grid>
        }>
        <Grid
          onClick={handleClick}
          className={classNames('chooseRoomGuest', 'flex_columCenter', leaseTypeGlobal ? {
            haveResultLT: bookingType === 1
          } : {
              haveResult: bookingType === 1
            })}>
          <span className="flex_columCenter chooseRoomGuest__actions">
            {/* <FontAwesomeIcon icon={faClock} size="1x"></FontAwesomeIcon>&nbsp;&nbsp; */}
            <p>{t('rooms:searchRooms:bookByHour')}</p>
          </span>
          {/* {bookingType === 1 && (
      <span className="chooseRoomGuest__removeIcon">
        <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
      </span>
    )} */}
        </Grid>
      </CustomPopper>
    ),
    [bookingType]
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateBookingType: (type: number) =>
      dispatch({
        type: 'SET_BOOKING_TYPE',
        bookingType: type
      })
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BookByHour);
