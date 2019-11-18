import React, { FC, memo } from 'react';
import { Paper, List, ListItem, ListItemText, Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import { CheckCircle } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { useTranslation } from 'react-i18next';

const SettingDetails: FC = () => {
  const { t } = useTranslation();
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.room);
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.book.dataCalculate
  );

  return room && room.settings.no_booking_cancel === 0 ? (
    <Paper square className={'paperCustomSetting'}>
      <List className={'root'}>
        {moment
          .unix(dataCalculate.checkin)
          .subtract(room!.settings.days, 'day')
          .diff(moment.now(), 'days') > room!.settings.days ? (
          <ListItem>
            <Grid container>
              <Grid item xs={3} md={1} className="flex_center">
                <CheckCircle style={{ fontSize: '36px', color: '#00C855' }} />
              </Grid>
              <Grid item xs={9} md={11}>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ color: '#00C855' }}>
                      {room!.settings.booking_cancel_text}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" style={{ color: '#999' }}>{`${
                      room!.settings.booking_cancel_text
                    } ${t('book:bookingForm:before')} ${moment
                      .unix(dataCalculate.checkin)
                      .subtract(room!.settings.days, 'day')
                      .locale('vi')
                      .format('HH:mm Do MMMM YYYY')}`}</Typography>
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        ) : (
          <ListItem>
            <Grid container>
              <Grid item xs={3} md={1} className="flex_center">
                <CheckCircle style={{ fontSize: '36px', color: '#00C855' }} />
              </Grid>

              <Grid item xs={9} md={11}>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ color: '#00C855' }}>
                      {t('book:bookingForm:2minBook')}
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        )}
      </List>
    </Paper>
  ) : (
    <Paper square className={'paperCustomSetting'}>
      <List className={'root'}>
        <ListItem>
          <Grid container>
            <Grid item xs={3} md={1} className="flex_center">
              <CheckCircle style={{ fontSize: '36px', color: '#00C855' }} />
            </Grid>

            <Grid item xs={9} md={11}>
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ color: '#00C855' }}>
                    {t('book:bookingForm:2minBook')}
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Paper>
  );
};

export default memo(SettingDetails);
