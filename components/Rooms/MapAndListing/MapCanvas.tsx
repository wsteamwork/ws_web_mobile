import React, { Fragment, useContext, useState, useEffect, FC } from 'react';
import _ from 'lodash';
import GoogleMap, { ChangeEventValue, Coords } from 'google-map-react';
import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@fullcalendar/core';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import MapMarker from '../Map/MapMarker';

interface IProps {
  rooms: any;
  hoverAction(id: number): void;
  hoverId: number;
  center: Coords;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      height: 'calc(100vh - 195px)',
      flex: 1
    }
  })
);

// @ts-ignore
const MapCanvas: FC<IProps> = (props) => {
  const { rooms, hoverAction, hoverId, center } = props;
  // console.log('hoverId', hoverId);
  // console.log('rooms', rooms);
  const classes = useStyles(props);
  const { state, dispatch } = useContext(RoomIndexContext);
  const [readyToLoad, setReadyToLoad] = useState<boolean>(false);
  const getMapBounds = (map, maps) => {
    let ne = map.getBounds().getNorthEast();
    let sw = map.getBounds().getSouthWest();
    let boundsInit = { lat_max: ne.lat(), lat_min: sw.lat(), long_max: ne.lng(), long_min: sw.lng() };
    return boundsInit;
  };
  const onChangeMap = (data: ChangeEventValue) => {
    if (hoverId === 0) {
      const bounds = data.bounds;
      const coords: MapCoords = {
        lat_max: bounds.ne.lat,
        lat_min: bounds.sw.lat,
        long_max: bounds.ne.lng,
        long_min: bounds.sw.lng
      };

      dispatch({ type: 'setCoords', payload: coords });
    }
  };
  const handleApiLoaded = ({ map, maps }) => {
    const bounds = getMapBounds(map, maps);
    dispatch({ type: 'setCoords', payload: bounds });
  };
  const onDrag = () => {
    setReadyToLoad(true);
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAP_KEY || 'AIzaSyA2ePi78OKNDZPNg-twQ74XwX_oczRQUoM'
          }}
          options={() => {
            return {
              minZoom: 3,
              clickableIcons: false,
              zoomControl: false
            };
          }}
          defaultZoom={15}
          onChange={onChangeMap}
          onDrag={onDrag}
          center={center}
          onChildMouseEnter={(h) => hoverAction(parseInt(h))}
          onChildMouseLeave={(h) => hoverAction(0)}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals>
          {_.map(rooms, (room) => (
            <MapMarker
              isHover={hoverId === room.id}
              room={room}
              key={room.id}
              lat={room.latitude}
              lng={room.longitude}
            />
          ))}
        </GoogleMap>
      </div>
    </Fragment>
  );
};

export default MapCanvas;
