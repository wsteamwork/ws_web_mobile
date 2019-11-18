import React, { memo } from 'react';
import { Paper, List, ListItem, ListItemText, Typography, Grid } from '@material-ui/core';
import { Whatshot } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import mainColor from '@/styles/constants/colors';
import { useTranslation } from 'react-i18next';

const RoomHotBook = () => {
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.room);
  const { t } = useTranslation();

  return (
    room &&
    room!.hot == 1 && (
      <Paper square className={'paperCustomHot'}>
        <List className={'root'}>
          <ListItem>
            <Grid container>
              <Grid item xs={3} md={1} className="flex_center">
                <Whatshot style={{ fontSize: '36px', color: mainColor.primary }} />
              </Grid>

              <Grid item xs={8} md={11}>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ color: mainColor.primary }}>
                      {room!.hot_txt} {t('book:bookingForm:pleaseBook')}
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Paper>
    )
  );
};

export default memo(RoomHotBook);
