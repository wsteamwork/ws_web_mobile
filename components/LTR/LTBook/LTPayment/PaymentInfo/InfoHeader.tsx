import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid/Grid';
import Link from 'next/link';
import React, { FC } from 'react';

interface IProps {
  room: LTRoomIndexRes;
}

const InfoHeader: FC<IProps> = (props: IProps) => {
  const { room } = props;

  return (
    <Link href={`/room/${room.id}`}>
      <Grid className="infoRoom">
        <Grid item xs={12}>
          {/* <img
            src={`${IMAGE_STORAGE_LG}${room.media.data[0].image}`}
            className={'imgSize'}
            alt={`Westay - Homestay cho người việt`}
          /> */}
        </Grid>
        <Grid className="infoRoom__name" item xs={12}>
          <a>{room.about_room.name}</a>

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
