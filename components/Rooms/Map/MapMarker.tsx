import CustomPopper from '@/components/CustomPopper';
import RoomCard from '@/components/RoomCard';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import { ChildComponentProps, Coords } from 'google-map-react';
import numeral from 'numeral';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

interface IProps extends Coords, ChildComponentProps {
  room: any;
  isHover?: boolean;
  focus(room: RoomIndexRes): void;
}

// @ts-ignore
const MapMarker: FC<IProps> = (props) => {
  const { room, $hover, isHover, focus } = props;
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);
  const avatarImg = room.media && room.media.data.length ? room.media.data[0].image : room.avatar_image ? room.avatar_image : './static/images/westay-avatar.jpg';
  const priceOnMap = leaseTypeGlobal ? room.price_display : room.price_day;
  // console.log(room);
  const cardRoom = useMemo(() => {
    if (leaseTypeGlobal) {
      return (
        <RoomCard city={room.city.name}
          district={room.district.name}
          instantbook={room.instant_book}
          roomID={room.id}
          roomName={room.about_room.name}
          roomNumber={room.bedrooms.number_room}
          roomType={room.accommodation_type_txt}
          roomImage={room.avatar.images[0].name}
          price_day={room.price_display}
          isHomepage={true} />
      )
    } else {
      return (
        <RoomCard city={room.city.data.name}
          district={room.district.data.name}
          instantbook={room.instant_book}
          roomID={room.id}
          roomName={room.room_name}
          roomNumber={room.number_room}
          roomType={room.room_type_txt}
          roomImage={room.media ? room.media.data[0].image : avatarImg}
          price_day={room.price_day}
          price_hour={room.price_hour}
          total_review={room.total_review}
          avg_rating={room.avg_rating}
          isHomepage={true} />
      )
    }
  }, [leaseTypeGlobal]);

  // useEffect(() => {
  // }, [leaseTypeGlobal]);

  // console.log(room);
  return (
    <CustomPopper
      arrow
      multiple
      placement="top"
      duration={200}
      trigger="click"
      theme="light-border"
      interactive
      onTrigger={() => focus(room)}
      content={
        // <LazyLoad>
        <Grid className="mapRoom">
          {cardRoom}
        </Grid>
        // </LazyLoad>
      }>
      <Grid className={classNames('arrow_box')}>
        <p className={isHover ? 'arrow_hover' : ''}>{numeral(priceOnMap).format('0,0')}đ</p>
      </Grid>
    </CustomPopper>
  );
};

export default MapMarker;
