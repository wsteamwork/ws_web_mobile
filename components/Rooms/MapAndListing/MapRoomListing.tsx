import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { Grid, Hidden } from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';
import RoomListing from '../RoomListing';
import MapCanvas from './MapCanvas';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import ListingLTRooms from '@/components/LTR/LTRooms/ListingLTRooms';

const MapRoomListing: FC = () => {
  const { state, dispatch } = useContext(RoomIndexContext);
  const { rooms, isMapOpen, longtermRooms } = state;
  const [hoverId, setHoverId] = useState<number>(-1);
  const leaseTypeGlobal = useSelector<ReducersList, 0|1>((state) => state.searchFilter.leaseTypeGlobal);

  const hoverAction = (key: number) => {
    setHoverId(key);
  };

  return (
    <div className="mapRoomListing">
      <Hidden mdDown>
        <Grid className="roomListingInMap">
          {leaseTypeGlobal ? (
            <LazyLoad>
              <ListingLTRooms hoverAction={hoverAction} usingInMap={true}/>
            </LazyLoad>
          ) : (
            <LazyLoad>
              <RoomListing usingInMap={true} hoverAction={hoverAction} rooms={rooms} />
            </LazyLoad>
          )}
        </Grid>
      </Hidden>

      <Grid className="mapListing">
        <MapCanvas hoverId={hoverId} hoverAction={hoverAction} rooms={leaseTypeGlobal ? longtermRooms : rooms} />
      </Grid>
    </div>
  );
};

export default MapRoomListing;
