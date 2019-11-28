import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { Grid, Hidden, Theme } from '@material-ui/core';
import React, { FC, useContext, useState, useEffect, useMemo } from 'react';
import RoomListing from '../RoomListing';
import MapCanvas from './MapCanvas';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import ListingLTRooms from '@/components/LTR/LTRooms/ListingLTRooms';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { GlobalContext } from '@/store/Context/GlobalContext';
import CardRoomMap from '@/components/Cards/CardRoomMap';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Coords } from 'google-map-react';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    roomInMap: {
      position: 'relative',
      bottom: '160px'
    }
  })
);

const MapRoomListing: FC = (props) => {
  const classes = useStyles(props);
  const { state } = useContext(RoomIndexContext);
  const { rooms, longtermRooms } = state;
  const [center, setCenter] = useState<Coords>({
    lat: 21.03011,
    lng: 105.853827
  });
  const { width } = useContext(GlobalContext);
  const [hoverId, setHoverId] = useState<number>(-1);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const hoverAction = (key: number) => {
    setHoverId(key);
  };
  const focusRoomLocation = (room: LTRoomIndexRes) => {
    setHoverId(room.id);
    setCenter({
      lat: parseFloat(room.latitude),
      lng: parseFloat(room.longitude)
    });
  };
  useEffect(() => {
    if (longtermRooms.length > 0) {
      let lat = parseFloat(longtermRooms[0].latitude);
      let lng = parseFloat(longtermRooms[0].longitude);
      let valid = lat < 90 && lat > -90 && lng < 180 && lng > -180;

      let coords: Coords = {
        lat: valid ? lat : 21.03011,
        lng: valid ? lng : 105.853827
      };

      setCenter(coords);
    }
  }, [longtermRooms]);

  const renderRoomsInMap = (room) => (
    <CardRoomMap
      room={room}
      isHover={hoverId === room.id}
      focus={() => focusRoomLocation(room)}
      city={room.city}
      district={room.district}
      roomID={room.id}
      roomName={room.about_room.name}
      numberBedroom={room.bedrooms.number_bedroom}
      roomType={room.accommodation_type_txt}
      roomImage={room.avatar.images.length ? room.avatar.images[0].name : ''}
      avg_rating={5}
    />
  );

  return (
    <div className="mapRoomListing">
      <Grid className="mapListing">
        <MapCanvas
          hoverId={hoverId}
          center={center}
          hoverAction={hoverAction}
          rooms={leaseTypeGlobal ? longtermRooms : rooms}
        />
      </Grid>
      {useMemo(
        () => (
          <PropertyListHorizontalScroll
            classCustom={classes.roomInMap}
            itemWidth={width == 'sm' ? '45%' : '95%'}
            gutter={6}
            listData={leaseTypeGlobal ? longtermRooms : rooms}
            itemRender={renderRoomsInMap}
            sizeIcon={width == 'sm' ? 100 : 65}
          />
        ),
        [longtermRooms]
      )}
    </div>
  );
};

export default MapRoomListing;
