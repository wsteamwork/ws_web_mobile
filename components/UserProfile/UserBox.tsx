import { ReducersList } from '@/store/Redux/Reducers';
import mainColor from '@/styles/constants/colors';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Grid, Hidden, Typography } from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const UserBox: FC = (props) => {
  const { t } = useTranslation();
  const profile = useSelector<ReducersList, ProfileViewInfoRes>(
    (state) => state.userProfile.profile
  );
  const userRooms = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.userProfile.userRooms
  );

  const totalReview = useMemo<number>(() => {
    let total = 0;
    if (!!userRooms) {
      userRooms.forEach((item) => {
        total += item.total_review;
      });
    }
    return total;
  }, [userRooms]);

  return (
    <Grid container className={'userBox'}>
      <Grid className={'wrapContent'}>
        <Grid item className={'boxName'}>
          {profile.avatar && (
            <div className={'avatar'}>
              <img alt='Avatar' src={profile.avatar_url !== '' ? profile.avatar_url : '../static/images/avatar_default.png'}
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
          <div className={'badge'}>
            <img src={'/static/images/review.svg'} alt='Reviews' className={'imgCertified'} />
            <Typography className={'text'}>
              {' '}
              {totalReview} {t('user:reviews')}
            </Typography>
          </div>
          <div className={'badge'}>
            <FontAwesomeIcon
              icon={faDoorClosed}
              size='lg'
              className='imageFA'
              color={mainColor.primary}></FontAwesomeIcon>
            <Typography className={'text'}>
              {userRooms.length} {t('user:accommodation')}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Hidden lgUp implementation='css'>
        <Divider className={'divider'} />
      </Hidden>
    </Grid>
  );
};

export default UserBox;
