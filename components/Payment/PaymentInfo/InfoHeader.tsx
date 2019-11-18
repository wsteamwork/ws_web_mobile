import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface IProps {
  room: RoomIndexRes;
}

const InfoHeader: FC<IProps> = (props: IProps) => {
  const { room } = props;

  return (
    <Link href={`/room/${room.id}`}>
      <Grid className="infoRoom">
        <Grid item xs={12}>
          <img
            src={`${IMAGE_STORAGE_LG}${room.media.data[0].image}`}
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
  );
};

export default InfoHeader;
