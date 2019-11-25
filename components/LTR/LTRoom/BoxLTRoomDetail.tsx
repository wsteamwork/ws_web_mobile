import BoxAmenities from '@/components/LTR/LTRoom/BoxAmenities';
import BoxListImageRoom from '@/components/LTR/LTRoom/BoxListImageRoom';
import BoxTablePrices from '@/components/LTR/LTRoom/BoxTablePrices';
import BoxMap from '@/components/Room/BoxMap';
import RoomDescription from '@/components/Room/BoxRoomDetail/RoomDescription';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { Divider, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad, { forceCheck } from 'react-lazyload';
import BoxInfoBasic from './BoxInfoBasic';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      padding: '32px 28px 0',
    },
    paperFullRight:{
      padding: '32px 0 0 28px',
    },
    paperMap:{
      padding:'32px 0'
    },
    hostInfo: {
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(3)
      }
    },
    rowMargin: {
      marginTop: theme.spacing(4)
    },
    divider:{
      margin:'32px 20px 0'
    },
  })
);

interface IProps {
  room: LTRoomIndexRes,
}

const BoxLTRoomDetail: FC<IProps> = (props) => {
  forceCheck();
  const classes = useStyles(props);
  const { room } = props;
  const { router } = useContext(GlobalContext);
  const isPreviewPage = router.pathname.includes('preview-long-term-room');
  const { t } = useTranslation();

  const checkAboutRoom = isPreviewPage && !room.about_room;
  const checkComfort = isPreviewPage && !room.comforts;
  const checkPrice = isPreviewPage && !room.prices;
  return (
    <Fragment>
      <div className={classes.paper}>
        <BoxInfoBasic textColor='#252529' 
                      subTextColor='#8A8A8F' 
                      name={checkAboutRoom ? t('room:updateRoomName') : room.about_room.name}
                      district={room.district.data.name}
                      city={room.city.data.name}
                      price={room.price_display}
          />
      </div>
      <Divider className={classes.divider}/>
      <div className={classes.paper}>
        <RoomDescription
                isPreviewPage={isPreviewPage}
                description={checkAboutRoom ? t('room:notFoundContent') : room.about_room.description}
                space={checkAboutRoom ? t('room:notFoundContent') : room.about_room.space}
                note={checkAboutRoom ? t('room:notFoundContent') : room.about_room.note} />
      </div>

      <div className={classes.paperFullRight}>
        <LazyLoad offset={150}>
          <BoxListImageRoom
            livingrooms={isPreviewPage && !room.livingrooms ? [] : room.livingrooms}
            outdoors={isPreviewPage && !room.outdoors ? [] : room.outdoors}
            furnitures={isPreviewPage && !room.furnitures ? [] : room.furnitures}
            cover_photo={isPreviewPage && !room.cover_photo ? [] : room.cover_photo}
            kitchens={isPreviewPage && !room.kitchens ? [] : room.kitchens}
            bedrooms={isPreviewPage && !room.bedrooms ? [] : room.bedrooms}
            bathrooms={isPreviewPage && !room.bathrooms ? [] : room.bathrooms} />
        </LazyLoad>
      </div>

      <div className={classes.paper}>
        <LazyLoad offset={100}>
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
        </LazyLoad>
      </div>
      <div className={classes.paper}>
        <LazyLoad offset={100}>
          <BoxTablePrices
            prices={checkPrice ? [] : room.prices.prices}
            included_fee={checkPrice ? [] : room.prices.included_fee}
            included_services={checkPrice ? [] : room.included_services}
            not_included_services={checkPrice ? [] : room.not_included_services}
          />
        </LazyLoad>
      </div>
      <div className={classes.paperMap}>
        <LazyLoad offset={100}>
          <BoxMap city={room.city.data.name} district={room.district.data.name} latitude={room.latitude} longitude={room.longitude} />
        </LazyLoad>
      </div>
    </Fragment>
  );
};

export default BoxLTRoomDetail;
