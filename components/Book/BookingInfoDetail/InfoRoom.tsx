import { ReducersList } from '@/store/Redux/Reducers';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

const InfoRoom: FC = () => {
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.room);
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.book.dataCalculate
  );

  return (
    room &&
    dataCalculate && (
      <Link href={`/room/${room.id}`}>
        <Grid className="infoRoom">
          <Grid item xs={12}>
            <img
              src={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${dataCalculate.room_avatar}`}
              className={'imgSize'}
              alt={`Westay - Homestay cho người việt`}
            />
          </Grid>
          <Grid className="infoRoom__name" item xs={12}>
            <a>{room.details.data[0].name}</a>

            <Grid>
              <span className={'address'}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x"></FontAwesomeIcon>
                {'  '}
                {room!.district.data.name}, {room!.city.data.name}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    )
  );
};

export default InfoRoom;
