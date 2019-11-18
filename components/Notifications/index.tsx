import React, { FC, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import GridContainer from '../Layout/Grid/Container';
import CustomerInfoBox from '../UserProfile/CustomerInfoBox';
import NotificationPanel from './NotificationPanel';

const Notifications: FC = (props) => {
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  return (
    <div className={'mainProfile'}>
      {profile ? (
        <GridContainer xs={11} md={9}>
          <Grid container justify="center">
            <Grid item xs={12} md={4} lg={3} xl={3} className={'boxPadding'}>
              <Paper elevation={0} className={'PaperBooking'}>
                <CustomerInfoBox />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9} xl={9} className={'boxPadding'}>
              <Paper elevation={0}>
                <NotificationPanel />
              </Paper>
            </Grid>
          </Grid>
        </GridContainer>
      ) : (
          <SimpleLoader />
        )}
    </div>
  );
};

export default Notifications;
