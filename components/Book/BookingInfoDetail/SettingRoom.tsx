import CustomPopper from '@/components/CustomPopper';
import { ReducersList } from '@/store/Redux/Reducers';
import mainColor from '@/styles/constants/colors';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { formatMoney } from '@/utils/mixins';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const SettingRoom: FC = () => {
  const { t } = useTranslation();
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.booking.dataCalculate
  );
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.room);

  return (
    dataCalculate && (
      <CustomPopper
        arrow
        placement="top"
        content={
          <Grid className="settingBooking">
            {room &&
              !!room.settings &&
              (room!.settings.no_booking_cancel == 1 ? (
                <Typography variant="caption" style={{ padding: '0px 10px' }}>
                  {`${t('book:bookingInfoDetail:noCancel1')} ${formatMoney(
                    dataCalculate.total_fee / 2
                  )}đ ${t('book:bookingInfoDetail:noCancel2')} ${moment
                    .unix(dataCalculate.checkin)
                    .subtract(room!.settings.days, 'day')
                    .locale('vi')
                    .format('HH:mm Do MMMM YYYY')}. ${t('book:bookingInfoDetail:noCancel3')}`}
                </Typography>
              ) : (
                  <Grid>
                    {moment
                      .unix(dataCalculate.checkin)
                      .subtract(room!.settings.days, 'day')
                      .diff(moment.now(), 'days') <= room!.settings.days && (
                        <Typography variant="caption" style={{ padding: '0px 10px' }}>
                          {`${t('book:bookingInfoDetail:yesCancel1')} ${formatMoney(
                            dataCalculate.total_fee
                          )}đ ${t('book:bookingInfoDetail:yesCancel2')}`}
                        </Typography>
                      )}
                  </Grid>
                ))}
          </Grid>
        }>
        <span>
          <FontAwesomeIcon
            icon={faQuestionCircle}
            size="1x"
            color={mainColor.primary}></FontAwesomeIcon>
        </span>
      </CustomPopper>
    )
  );
};

export default memo(SettingRoom);
