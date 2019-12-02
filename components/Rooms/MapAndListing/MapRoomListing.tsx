import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { Grid, Hidden, Theme } from '@material-ui/core';
import React, { FC, useContext, useState, useEffect, useMemo } from 'react';
import MapCanvas from './MapCanvas';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import CardRoomMap from '@/components/Cards/CardRoomMap';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Coords } from 'google-map-react';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import _ from 'lodash';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    listRoom: {
      position: 'relative',
      bottom: 140,
      width: '100%',
      display: 'block !important'
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
  const [hoverId, setHoverId] = useState<number>(-1);
  const [slider, setSlider] = useState<any>(null);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  useEffect(() => {
    if (slider && longtermRooms.length && hoverId !== 0) {
      let index = longtermRooms.findIndex((element) => element.id === hoverId);
      slider.slickGoTo(index);
    }
  }, [hoverId]);
  const setting: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    lazyLoad: 'ondemand',
    swipeToSlide: true,
    touchThreshold: 100,
    beforeChange: (current, next) => alert(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          autoplay: false,
          arrows: false,
          autoplaySpeed: 5000,
          touchThreshold: 100,
          centerMode: true,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          autoplay: false,
          autoplaySpeed: 5000,
          touchThreshold: 100,
          arrows: false,
          centerMode: true,
          centerPadding: '20px'
        }
      }
    ]
  };
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
  }, [longtermRooms, hoverId]);
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
          <Grid container className={classes.listRoom}>
            {longtermRooms.length > 0 ? (
              <Slider ref={(slider) => setSlider(slider)} {...setting}>
                {_.map(longtermRooms, (room, index) => (
                  <div key={index}>
                    <CardRoomMap
                      room={room}
                      isHover={hoverId === room.id}
                      focus={() => focusRoomLocation(room)}
                      city={room.city.data.name}
                      district={room.district.data.name}
                      roomID={room.id}
                      roomName={room.about_room.name}
                      numberBedroom={room.bedrooms.number_bedroom}
                      roomType={room.accommodation_type_txt}
                      roomImage={room.avatar.images.length ? room.avatar.images[0].name : ''}
                      avg_rating={5}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              ''
            )}
          </Grid>
        ),
        [longtermRooms, hoverId]
      )}
    </div>
  );
};

export default MapRoomListing;
