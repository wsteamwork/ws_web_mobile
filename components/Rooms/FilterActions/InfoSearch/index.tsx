import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Button, Collapse, Grid, Paper, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #FA991C'
      //   padding: '4px 10px'
    },
    btnChange: {
      textTransform: 'initial'
    }
  })
);

const InfoSearch: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();
  const [collapseSearch, setCollapseSearch] = useState<boolean>(false);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);
  const searchText = useSelector<ReducersList, string>((state) => state.searchFilter.searchText);
  const startDate = useSelector<ReducersList, string | null>(
    (state) => state.searchFilter.startDate
  );
  const endDate = useSelector<ReducersList, string | null>((state) => state.searchFilter.endDate);

  const checkIn = moment(startDate).format('D/M');
  const checkOut = endDate ? ` - ${moment(endDate).format('D/M')}` : '';

  const handleCollapse = () => {
    setCollapseSearch(!collapseSearch);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container justify="space-between" alignItems="center">
        <Collapse in={!collapseSearch}></Collapse>
        {/* <Collapse in={collapseSearch}>
            <Grid container spacing={1} justify="center" alignItems={'center'}>
              <Grid item xs={12} md={4}>
                <SearchAutoSuggestion />
              </Grid>
              <Grid item xs={12} md={4}>
                <DateRangeSearch />
              </Grid>
              <Grid item xs={12} md={2}>
                <ChooseGuestRoom />
              </Grid>
              <Grid item xs={12} md={2}>
                <ButtonGlobal padding="0px" width="100%">
                  {t('home:searchComponent:search')}
                </ButtonGlobal>
              </Grid>
            </Grid>
          </Collapse> */}

        <Button className={classes.btnChange} onClick={handleCollapse}>
          <Grid>
            <Typography style={{ display: 'inline-block' }}>{searchText}</Typography>,
            {/* {!collapseSearch ? 'Thay đổi' : t('room:cancel')} */}
            {checkIn}
            {checkOut}
          </Grid>
        </Button>
      </Grid>
    </Paper>
  );
};

export default InfoSearch;
