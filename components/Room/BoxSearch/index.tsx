import SearchComponent from '@/components/Home/SearchComponent';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { Button, Collapse, Grid, Paper, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import moment from 'moment';
import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any;
  isPreview?: boolean;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px 0px',
      margin: `${theme.spacing(4)}px 0px`,
      [theme.breakpoints.down('md')]: {
        margin: `${theme.spacing(4)}px 0px 0px`,
      },
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      }
    },
    btnChange: {
      color: '#41C9BC',
      border: '1px solid #41C9BC',
      textTransform: 'initial',
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(1),
      }
    },
    roomName: {
      [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem'
      }
    }
  })
);

const BoxSearch: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { isPreview } = props;
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const [collapseSearch, setCollapseSearch] = useState<boolean>(false);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);
  const startDate = useSelector<ReducersList, string | null>(
    (state) => state.searchFilter.startDate
  );
  const endDate = useSelector<ReducersList, string | null>((state) => state.searchFilter.endDate);

  const checkIn = moment(startDate).format(DEFAULT_DATE_FORMAT);
  const checkOut = endDate ? ` - ${moment(endDate).format(DEFAULT_DATE_FORMAT)}` : '';

  const handleCollapse = () => {
    setCollapseSearch(!collapseSearch);
  };

  return (
    room && (
      <Paper className={classes.root} elevation={0}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm={8} md={8} lg={9} xl={9}>
            <Collapse in={!collapseSearch}>
              <div>
                <Typography variant="h5" gutterBottom className={classes.roomName}>
                  {isPreview && !room.details.data[0].name ? t('room:updateRoomName') : room.details.data[0].name} - {room.district.data.name} - {room.city.data.name}
                </Typography>
                <Typography variant="subtitle2" color="textPrimary">
                  {t('room:lookingFor')} {checkIn}
                  {checkOut}, {numberGuest} {t('room:guests')}, {numberRoom} {t('room:rooms')}
                </Typography>
              </div>
            </Collapse>
            <Collapse in={collapseSearch}>
              <SearchComponent showGuestRoom={true} />
            </Collapse>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={3} xl={2} container justify="flex-end" alignItems="center">
            <Button
              variant="outlined"
              className={classes.btnChange}
              size={width === 'sm' || width === 'xs' ? "medium" : "large"}
              onClick={handleCollapse}>
              {!collapseSearch ? t('room:changeSearch') : t('room:cancel')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  );
};

export default BoxSearch;
