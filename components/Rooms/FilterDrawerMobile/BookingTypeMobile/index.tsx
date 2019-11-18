import React, { FC, useContext, ChangeEvent } from 'react';
import IOSSwitch from '../../FilterActions/SwitchMap/IOSSwitch';
import { SearchFilterState, SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { useTranslation } from 'react-i18next';
import { ReducersType } from '@/store/Redux/Reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
interface IProps {
  filter: SearchFilterState;
  updateBookingType: (type: number) => void;
}
const BookingTypeMobile: FC<IProps> = (props) => {
  const { filter, updateBookingType } = props;
  const { bookingType } = filter;
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (bookingType === 2) {
      updateBookingType(1);
    } else {
      updateBookingType(2);
    }
  };

  return (
    <IOSSwitch checked={bookingType === 1} onChange={handleChange} value="checked" />
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
)(BookingTypeMobile);
