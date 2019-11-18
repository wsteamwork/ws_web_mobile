import React, {
  Fragment,
  useContext,
  useState,
  useEffect, FC
} from 'react';
import _ from 'lodash';
import GoogleMap, { ChangeEventValue, Coords } from 'google-map-react';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import MapMarker from '../Map/MapMarker';
import { MapCoords } from '@/types/Requests/Rooms/RoomRequests';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { min } from 'moment';

interface IProps {
  rooms: any;
  hoverAction(id: number): void;
  hoverId: number;
}

// @ts-ignore
const MapCanvas: FC<IProps> = (props) => {
  const { rooms, hoverAction, hoverId } = props;
  const { state, dispatch } = useContext(RoomIndexContext);
  const { isMapOpen } = state;
  const [readyToLoad, setReadyToLoad] = useState<boolean>(false);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });

  const onChangeMap = ({ bounds }: ChangeEventValue) => {
    if (readyToLoad) {
      const coords: MapCoords = {
        lat_max: bounds.ne.lat,
        lat_min: bounds.sw.lat,
        long_max: bounds.ne.lng,
        long_min: bounds.sw.lng
      };
      dispatch({ type: 'setCoords', payload: coords });
    }
  };

  const focusRoomLocation = (room: RoomIndexRes) => {
    setReadyToLoad(false);
    setCenter({
      lat: parseFloat(room.latitude),
      lng: parseFloat(room.longitude)
    });
  };

  const onDrag = () => {
    setReadyToLoad(true);
  };

  useEffect(() => {
    if (rooms.length > 0 && isMapOpen) {
      let lat = parseFloat(rooms[0].latitude);
      let lng = parseFloat(rooms[0].longitude);
      let valid = lat < 90 && lat > -90 && lng < 180 && lng > -180;

      let coords: Coords = {
        lat: valid ? lat : 21.02,
        lng: valid ? lng : 105.83
      };

      setCenter(coords);
    }
  }, [rooms.length > 0, isMapOpen]);

  return (
    <Fragment>
      <GoogleMap
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY || 'AIzaSyA2ePi78OKNDZPNg-twQ74XwX_oczRQUoM'
        }}
        options={() => {
          return {
            minZoom: 3,
            clickableIcons: false,
            zoomControl: false
          }
        }}
        defaultZoom={14}
        onChange={onChangeMap}
        onDrag={onDrag}
        defaultCenter={center}
        center={center}
        yesIWantToUseGoogleMapApiInternals>
        {_.map(rooms, (room) => (
          <MapMarker
            isHover={hoverId === room.id}
            focus={focusRoomLocation}
            room={room}
            key={room.id}
            lat={parseFloat(room.latitude)}
            lng={parseFloat(room.longitude)}
          />
        ))}
      </GoogleMap>
    </Fragment>
  );
};

export default MapCanvas;
