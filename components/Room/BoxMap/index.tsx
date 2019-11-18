import { ReducersList } from '@/store/Redux/Reducers';
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import GoogleMap from 'google-map-react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any,
  district: string,
  city: string,
  latitude: string,
  longitude: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    },
    root: {
      height: 400,
      margin: '10px 0',
      borderRadius: 5,
      overflow: 'hidden',
      border: '1px solid #e0e0e0'
    },
    txtAddress: {
      color: '#484848'
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
);

const BoxMap: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { district, city, latitude, longitude } = props;
  // const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('room:map')}
      </Typography>

      <Typography variant="subtitle1" className={classes.txtAddress}>
        <FontAwesomeIcon className={classes.icon} icon={faMapSigns} />
        {district}, {city}
      </Typography>

      <div className={classes.root}>
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAP_KEY || 'AIzaSyA2ePi78OKNDZPNg-twQ74XwX_oczRQUoM'
          }}
          defaultZoom={15}
          defaultCenter={{
            lat: latitude ? parseFloat(latitude) : 0,
            lng: longitude ? parseFloat(longitude) : 0
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            latitude ?
              new maps.Circle({
                strokeColor: `${leaseTypeGlobal ? '#673ab7' : '#FCAB70'}`,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: `${leaseTypeGlobal ? '#673ab7' : '#FDBF68'}`,
                fillOpacity: 0.3,
                map,
                center: {
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude)
                },
                radius: 400
              }) : null
          }}
        />
      </div>
    </div>
  );
};

export default BoxMap;
