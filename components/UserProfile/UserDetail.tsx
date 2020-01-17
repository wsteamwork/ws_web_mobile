import { ReducersList } from '@/store/Redux/Reducers';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { RoomReviewIndexResponse } from '@/types/Requests/Rooms/RoomReviewIndexResponse';
import { Divider, Grid, Typography } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import React, { FC, Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ListRoom from '../ListRoom';
import RoomCard from '../RoomCard';
import ReviewUser from './ReviewUser';

const UserDetail: FC = (props) => {
  const { t } = useTranslation();
  const profile = useSelector<ReducersList, ProfileViewInfoRes>(
    (state) => state.userProfile.profile
  );
  const userRooms = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.userProfile.userRooms
  );

  const userLTRooms = useSelector<ReducersList, LTRoomIndexRes[]>(
    (state) => state.userProfile.userLTRooms
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

  const reviewArray = useMemo<RoomReviewIndexResponse[]>(() => {
    let array: RoomReviewIndexResponse[] = [];
    if (!!userRooms) {
      const reviews = userRooms.map((room) => room.reviews.data);
      reviews.forEach((review) => {
        array = array.concat(review);
      });
    }
    return array;
  }, [userRooms]);

  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  const renderRoom = (room) => <RoomCard city={room.city.data.name}
    district={room.district.data.name}
    instantbook={room.instant_book}
    roomID={room.id}
    roomName={room.details.data[0].name}
    roomNumber={room.number_room}
    roomType={room.room_type_txt}
    roomImage={room.media.data[0].image}
    price_day={room.price_day}
    price_hour={room.price_hour}
    total_review={room.total_review}
    avg_rating={room.avg_rating}
    isHomepage={true} />;

  const renderLTRoom = (ltRoom) => <RoomCard city={ltRoom.city}
    district={ltRoom.district}
    instantbook={ltRoom.instant_book}
    roomID={ltRoom.id}
    roomName={ltRoom.about_room.name}
    roomNumber={ltRoom.bedrooms.number_bedroom}
    roomType={ltRoom.accommodation_type_txt}
    roomImage={ltRoom.avatar.images[0].name}
    price_day={ltRoom.price_display}
    isHomepage={true}
  />;

  return (
    <Grid container className={'userDetail'}>
      <Grid item className={'boxName'}>
        <Typography className={'title'}>{t('user:personInfo')}</Typography>
        <Typography className={'text'}>
          {t('user:joinFrom')} {profile!.created_at.substring(0, 4)}
        </Typography>
        {profile!.description && (
          <Fragment>
            <Divider className={'4Description'} />
            <Typography className={'description'}>{profile.description}</Typography>
          </Fragment>
        )}
        <Divider className={'dividerDescription'} />
        <div className={'extraInfo'}>
          <div className={'infoItem'}>
            <span>
              <LocationIcon className={'imgIcon'} />
            </span>

            <Typography className={'subText'}>
              {profile!.district != t('user:unknown') ? profile!.district + ',' : ''}{' '}
              {profile!.city != t('user:unknown') ? profile!.city + ',' : ''} Việt Nam
            </Typography>
          </div>
        </div>
      </Grid>
      {
        leaseTypeGlobal ? (
          <ListRoom
            roomData={userLTRooms}
            slidesPerView={userLTRooms.length < 2 ? 1 : 2}
            usingSlider={true}
            title={t('user:accommodationUpper')}
            render={renderLTRoom} />
        ) : (
            <ListRoom
              roomData={userRooms}
              slidesPerView={userRooms.length < 2 ? 1 : 2}
              usingSlider={true}
              title={t('user:accommodationUpper')}
              render={renderRoom} />
          )
      }

      {totalReview !== 0 && (
        <Fragment>
          <Divider className={'divider'} />
          <Grid item className={'boxName'}>
            <Typography className={'title'}>{t('user:reviews')}</Typography>
            <div className={'userReviews'}>
              {reviewArray!.length > 0 && <ReviewUser review={reviewArray} />}
            </div>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default UserDetail;
