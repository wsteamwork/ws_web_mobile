import { ReducersList } from '@/store/Redux/Reducers';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

const InfoRoom: FC = () => {
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);

  return (
    ltroom && (
      <Link href={`/room/${ltroom.id}`}>
        <Grid className="infoRoom">
          <Grid item xs={12}>
            {/* <img
              src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${dataCalculate.room_avatar}`}
              className={'imgSize'}
              alt={`Westay - Homestay cho người việt`}
            /> */}
          </Grid>
          <Grid className="infoRoom__name" item xs={12}>
            <a>{ltroom.about_room.name}</a>

            <Grid>
              <span className={'address'}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x"></FontAwesomeIcon>
                {'  '}
                {ltroom!.district.data.name}, {ltroom!.city.data.name}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    )
  );
};

export default InfoRoom;
