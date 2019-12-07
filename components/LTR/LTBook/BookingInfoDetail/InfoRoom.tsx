import { ReducersList } from '@/store/Redux/Reducers';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';

const InfoRoom: FC = () => {
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  return (
    ltroom && (
      <Link href={`/room/${ltroom.id}`}>
        <Grid container className="infoRoom" spacing={2} alignItems='center'>
          <Grid className="infoRoom__name" item xs={8}>
            <Typography>{ltroom.about_room.name}</Typography>

            <div>
              <span className={'address'}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x"/>
                {'  '}
                {ltroom!.district.data.name}, {ltroom!.city.data.name}
              </span>
            </div>
          </Grid>
          <Grid item xs={4}>
            <img
              src={`${IMAGE_STORAGE_SM}${ltroom.avatar.images[0].name}`}
              className={'imgSize'}
              alt={ltroom.about_room.name}
            />
          </Grid>
        </Grid>
      </Link>
    )
  );
};

export default InfoRoom;
