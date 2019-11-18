import BoxAmenities from '@/components/LTR/LTRoom/BoxAmenities';
import BoxListImageRoom from '@/components/LTR/LTRoom/BoxListImageRoom';
import BoxTablePrices from '@/components/LTR/LTRoom/BoxTablePrices';
import BoxMap from '@/components/Room/BoxMap';
import RoomBasic from '@/components/Room/BoxRoomDetail/RoomBasic';
import RoomDescription from '@/components/Room/BoxRoomDetail/RoomDescription';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { Grid, Paper, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad, { forceCheck } from 'react-lazyload';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    paper: {
      boxShadow: 'none',
      // marginBottom: theme.spacing(10),
      padding: '0 32px 0 8px',
      [theme.breakpoints.down('md')]: {
        padding: '0 8px'
      }
    },
    hostInfo: {
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(3)
      }
    },
    rowMargin: {
      marginTop: theme.spacing(4)
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
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item md={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={11}>
                {/* <LazyLoad> */}
                <RoomBasic
                  isPreviewPage={isPreviewPage}
                  showBed={false}
                  name={checkAboutRoom ? t('room:updateRoomName') : room.about_room.name}
                  id={room.id}
                  bathroom={room.bathrooms.number_bathroom}
                  max_additional_guest={room.guests.max_additional_guest}
                  max_guest={room.guests.recommendation}
                  number_room={room.bedrooms.number_bedroom}
                  totalComforts={room.total_comforts}
                  avg_rating={room.rating.avg_avg_rating}
                  total_area={room.total_area}
                  avg_rating_txt={room.rating.avg_avg_rating_txt} />
                {/* </LazyLoad> */}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <div className={classes.rowMargin}>
                  {/* <LazyLoad> */}
                  <RoomDescription
                    isPreviewPage={isPreviewPage}
                    description={checkAboutRoom ? t('room:notFoundContent') : room.about_room.description}
                    space={checkAboutRoom ? t('room:notFoundContent') : room.about_room.space}
                    note={checkAboutRoom ? t('room:notFoundContent') : room.about_room.note} />
                  {/* </LazyLoad> */}
                </div>
                <div className={classes.rowMargin}>
                  <LazyLoad offset={150}>
                    <BoxListImageRoom
                      livingrooms={isPreviewPage && !room.livingrooms ? [] : room.livingrooms}
                      outdoors={isPreviewPage && !room.outdoors ? [] : room.outdoors}
                      furnitures={isPreviewPage && !room.furnitures ? [] : room.furnitures}
                      cover_photo={isPreviewPage && !room.cover_photo ? [] : room.cover_photo}
                      kitchens={isPreviewPage && !room.kitchens ? [] : room.kitchens}
                      bedrooms={isPreviewPage && !room.bedrooms ? [] : room.bedrooms}
                      bathrooms={isPreviewPage && !room.bathrooms ? [] : room.bathrooms}
                      roomName={checkAboutRoom ? t('room:updateRoomName') : room.about_room.name} />
                  </LazyLoad>
                </div>
                <div className={classes.rowMargin}>
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
                <div className={classes.rowMargin}>
                  <LazyLoad offset={100}>
                    <BoxTablePrices
                      prices={checkPrice ? [] : room.prices.prices}
                      included_fee={checkPrice ? [] : room.prices.included_fee}
                      included_services={checkPrice ? [] : room.included_services}
                      not_included_services={checkPrice ? [] : room.not_included_services}
                    />
                  </LazyLoad>

                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1} justify='center'>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={classes.rowMargin}>
                  <LazyLoad offset={100}>
                    <BoxMap city={room.city.data.name} district={room.district.data.name} latitude={room.latitude} longitude={room.longitude} />
                  </LazyLoad>

                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default BoxLTRoomDetail;
