import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingAction } from '@/store/Redux/Reducers/Booking/booking';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { FormControlLabel, Grid } from '@material-ui/core';
import React, { ChangeEvent, Dispatch, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const ChooseBookingType: FC = () => {
  const dispatch = useDispatch<Dispatch<BookingAction>>();
  const { t } = useTranslation();
  const [bookingType, setBookingType] = useState<number>(2);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      setBookingType(1);
      dispatch({ type: 'SET_TYPE_BOOKING', payload: 1 });
    } else {
      setBookingType(2);
      dispatch({ type: 'SET_TYPE_BOOKING', payload: 2 });
    }
  };

  useEffect(() => {
    dispatch({ type: 'SET_TYPE_BOOKING', payload: 2 });
  }, []);

  return useMemo(
    () =>
      !!room &&
      room.price_hour !== 0 && room.rent_type !== 2 && (
        <Grid className="boxBooking__chooseBooking">
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={bookingType === 1}
                onChange={handleChange}
                value="checkedA"
              />
            }
            label={t('room:boxBooking:setByHour')}
          />
        </Grid>
      ),
    [bookingType, t]
  );
};

export default ChooseBookingType;
