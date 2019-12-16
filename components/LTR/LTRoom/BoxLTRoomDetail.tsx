import BoxAmenities from '@/components/LTR/LTRoom/BoxAmenities';
import BoxListImageRoom from '@/components/LTR/LTRoom/BoxListImageRoom';
import BoxTablePrices from '@/components/LTR/LTRoom/BoxTablePrices';
import BoxMap from '@/components/Room/BoxMap';
import RoomDescription from '@/components/Room/BoxRoomDetail/RoomDescription';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { Divider, Theme, useTheme, Zoom } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad, { forceCheck } from 'react-lazyload';
import BoxInfoBasic from './BoxInfoBasic';
import BoxRoomOfAccommodation from './BoxRoomOfAccommodation';
import BoxRoomSameBuilding from './BoxRoomSameBuilding';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      padding: '32px 28px 0',
      [theme.breakpoints.up('sm')]: {
        padding: '32px 38px 0'
      }
    },
    paperCustomAccommodation: {
      padding: '24px 20px 0',
      [theme.breakpoints.up('sm')]: {
        padding: '20px 20px 0'
      }
    },
    paperFullRight: {
      padding: '32px 0 0 28px',
      [theme.breakpoints.up('sm')]: {
        padding: '32px 0 0 38px'
      }
    },
    paperMap: {
      padding: '32px 0'
    },
    hostInfo: {
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(3)
      }
    },
    rowMargin: {
      marginTop: theme.spacing(4)
    },
    divider: {
      margin: '24px 20px 0'
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    btnFabBook: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 9,
      backgroundColor: '#54D3C2',
      color: '#fff',
      textTransform: 'initial',
      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(6),
        right: theme.spacing(3)
      }
    }
  })
);

interface IProps {
  room: LTRoomIndexRes;
  onBook?: () => any;
}

const BoxLTRoomDetail: FC<IProps> = (props) => {
  forceCheck();
  const classes = useStyles(props);
  const { room, onBook } = props;
  const { router } = useContext(GlobalContext);
  const isPreviewPage = router.pathname.includes('preview-long-term-room');
  const { t } = useTranslation();
  const theme = useTheme();
  const dataRoomOfAccommodation = {
    bedrooms: {
      imageIcon: '/static/icons/bedroom.svg',
      title: t('longtermroom:bedrooms'),
      subtitle: `${room && room.bedrooms ? room.bedrooms.number_bedroom : '?'} ${t(
        'longtermroom:bedroomLower'
      )}`
    },
    kitchens: {
      imageIcon: '/static/icons/fridge.svg',
      title: t('longtermroom:kitchens'),
      subtitle: `${room && room.comforts ? room.comforts.kitchens.length : '?'} ${t(
        'longtermroom:amenities'
      )}`
    },
    bathrooms: {
      imageIcon: '/static/icons/bathroom.svg',
      title: t('longtermroom:bathrooms'),
      subtitle: `${room && room.bathrooms ? room.bathrooms.number_bathroom : '?'} ${t(
        'longtermroom:bathroomLower'
      )}`
    },
    totalArea: {
      imageIcon: '/static/icons/area.svg',
      title: t('longtermroom:totalArea'),
      subtitle: `${room ? room.total_area : '?'}`
    }
  };
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const checkAboutRoom = isPreviewPage && !room.about_room;
  const checkComfort = isPreviewPage && !room.comforts;
  const checkPrice = isPreviewPage && !room.prices;
  return (
    <Fragment>
      <div className={classes.paper} style={{ marginTop: 30 }}>
        <BoxInfoBasic
          textColor="#252529"
          subTextColor="#8A8A8F"
          name={checkAboutRoom ? t('room:updateRoomName') : room.about_room.name}
          district={room.district.data.name}
          city={room.city.data.name}
          price={room.price_display}
        />
      </div>
      <div className={classes.paperCustomAccommodation}>
        <BoxRoomOfAccommodation
          bedrooms={dataRoomOfAccommodation.bedrooms}
          kitchens={dataRoomOfAccommodation.kitchens}
          bathrooms={dataRoomOfAccommodation.bathrooms}
          totalArea={dataRoomOfAccommodation.totalArea}
        />
      </div>
      <Divider className={classes.divider} />
      <div className={classes.paper}>
        <RoomDescription
          isPreviewPage={isPreviewPage}
          description={checkAboutRoom ? t('room:notFoundContent') : room.about_room.description}
          space={checkAboutRoom ? t('room:notFoundContent') : room.about_room.space}
          note={checkAboutRoom ? t('room:notFoundContent') : room.about_room.note}
        />
      </div>

      <div className={classes.paperFullRight}>
        <BoxListImageRoom
          livingrooms={isPreviewPage && !room.livingrooms ? [] : room.livingrooms}
          outdoors={isPreviewPage && !room.outdoors ? [] : room.outdoors}
          furnitures={isPreviewPage && !room.furnitures ? [] : room.furnitures}
          cover_photo={isPreviewPage && !room.cover_photo ? [] : room.cover_photo}
          kitchens={isPreviewPage && !room.kitchens ? [] : room.kitchens}
          bedrooms={isPreviewPage && !room.bedrooms ? [] : room.bedrooms}
          bathrooms={isPreviewPage && !room.bathrooms ? [] : room.bathrooms}
        />
        {/* </LazyLoad> */}
      </div>

      <div className={classes.paper}>
        <BoxAmenities
          facilities={checkComfort ? undefined : room.comforts.facilities}
          bedrooms={checkComfort ? undefined : room.comforts.bedrooms}
          bathrooms={checkComfort ? undefined : room.comforts.bathrooms}
          outdoors={checkComfort ? undefined : room.comforts.outdoors}
          others={checkComfort ? undefined : room.comforts.others}
          entertainment={checkComfort ? undefined : room.comforts.entertainment}
          livingrooms={checkComfort ? undefined : room.comforts.livingrooms}
          common={checkComfort ? undefined : room.comforts.common}
          kitchens={checkComfort ? undefined : room.comforts.kitchens}
        />
      </div>
      <div className={classes.paper}>
        {/* <LazyLoad offset={100}> */}
        <BoxTablePrices
          prices={checkPrice ? [] : room.prices.prices}
          included_fee={checkPrice ? [] : room.prices.included_fee}
          included_services={checkPrice ? [] : room.included_services}
          not_included_services={checkPrice ? [] : room.not_included_services}
        />
      </div>
      <div className={classes.paper}>
        <BoxRoomSameBuilding />
      </div>

      <div className={classes.paperMap}>
        <LazyLoad offset={100}>
          <BoxMap
            city={room.city.data.name}
            district={room.district.data.name}
            latitude={room.latitude}
            longitude={room.longitude}
          />
        </LazyLoad>
      </div>

      <Zoom in={true} timeout={transitionDuration} unmountOnExit>
        <Fab variant="extended" className={classes.btnFabBook} onClick={onBook} size="medium">
          {t('longtermroom:viewSchedule')}
          {/* <NavigationIcon className={classes.extendedIcon} /> */}
        </Fab>
      </Zoom>
    </Fragment>
  );
};

export default BoxLTRoomDetail;
