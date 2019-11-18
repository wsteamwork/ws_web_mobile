import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { Divider, Grid, Hidden, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const CustomerInfoBox: FC = (props) => {
  const { t } = useTranslation();
  const profile = useSelector<ReducersList, ProfileInfoRes>(
    (state) => state.iProfile.profile
  );

  return (
    <Grid container className={'userBox'}>
      <Grid className={'wrapContent'}>
        <Grid item className={'boxName'}>
          {profile.avatar && (
            <div className={'avatar'}>
              <img alt='Avatar' src={profile.avatar !== '' ? profile.avatar_url : '../static/images/avatar_default.png'}
                className={'imgAvatar'} />
            </div>
          )}
          <Typography className={'userName'}>{profile!.name}</Typography>
        </Grid>
        <Divider className={'divider'} />
        <Grid item className={'boxName'}>
          <div className={'badge'}>
            <img src={'/static/images/verified.svg'} alt='Verified' className={'imgCertified'} />
            <Typography className={'text'}>{t('user:verified')}</Typography>
          </div>
        </Grid>
      </Grid>

      <Hidden lgUp implementation='css'>
        <Divider className={'divider'} />
      </Hidden>
    </Grid>
  );
};

export default CustomerInfoBox;
