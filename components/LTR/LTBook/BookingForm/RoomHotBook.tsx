import { ReducersList } from '@/store/Redux/Reducers';
import mainColor from '@/styles/constants/colors';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Grid, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { Whatshot } from '@material-ui/icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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
