import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import BookingCalendar from '@/components/LTR/LTBook/BookingCalendar';
import BoxBottomBooking from '@/components/LTR/LTRoom/BoxBottomBooking';
import BoxImageLT from '@/components/LTR/LTRoom/BoxImageLT';
import BoxLTRoomDetail from '@/components/LTR/LTRoom/BoxLTRoomDetail';
import NavTop from '@/components/NavTop';
import NextHead from '@/components/NextHead';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import NavHeader from '@/components/Toolbar/NavHeader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getDataLTRoom } from '@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { getCookieFromReq } from '@/utils/mixins';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Dialog, Grid } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import { NextPage } from 'next';
import React, { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react';
import HeadRoom from 'react-headroom';
import { useTranslation } from 'react-i18next';
// import LazyLoad, { forceCheck } from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { TransitionCustom } from '@/components/Rooms/BottomNav';

const LongtermRoom: NextPage = () => {
  const { router, width } = useContext(GlobalContext);
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const error = useSelector<ReducersList, boolean>((state) => state.ltroomPage.error);
  const detailRef = useRef(null);
  // const [] = useVisitedRoom();  const { router } = useContext(GlobalContext);
  const dispatchLeaseType = useDispatch<Dispatch<SearchFilterAction>>();
  const { t } = useTranslation();
  const [hideNavTop, setHideNavTop] = useState<boolean>(false);
  const [viewDetail, setViewDetail] = useState<boolean>(false);

  const handleView = () => {
    setViewDetail(!viewDetail);
  };

  // forceCheck();
  if (router.pathname.includes('/long-term-room')) {
    dispatchLeaseType({
      type: 'setLeaseTypeGlobal',
      leaseTypeGlobal: 1,
      leaseTypePathName: router.pathname.includes('/long-term-room') ? '/long-term-rooms' : '/rooms'
    });
  }

  const [openBookingDialog, setOpenBookingDialog] = useState<boolean>(false);
  const handleOpenBookingDialog = () => {
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
  };

  useEffect(() => {
    if (error || !ltroom.status) router.push('/not-found-resource');

  }, [error]);

  if (error || !ltroom.status) {
    return (
      <div>
        <NavHeader />
        <ContentPlaceHolder />
        <Footer />
      </div>
    )
  }

  const handleBackButtonDetailPage = () => {
    return viewDetail ? setViewDetail(!viewDetail) : router.back();
  }

  return (
    <Fragment>
      {!!ltroom && (
        <NextHead
          googleMapApiRequire={false}
          ogSitename="Westay - Đặt phòng dài hạn trực tuyến"
          title={`${ltroom.about_room.name} | Westay - Đặt phòng dài hạn trực tuyến`}
          description={`${ltroom.accommodation_type_txt} ${
            ltroom.accommodation_type == 3 ? 'nghỉ dưỡng' : 'tiện nghi'
            } ngay tại ${ltroom.district.data.name}, ${
            ltroom.city.data.name
            }. Đặt phòng ngay với Westay để có trải nghiệm độc đáo và tuyệt vời nhất.`}
          url={`https://westay.vn/ltroom/${ltroom.id}`}
          ogImage={`${IMAGE_STORAGE_LG}${ltroom.avatar.images.length ? ltroom.avatar.images[0].name : ''}`}
        />
      )}

      {useMemo(
        () => (
          <Fragment>
            {ltroom ? (
              <GridContainer xs={12} classNameItem="roomPage" id='id_BoxDetails'>

                <HeadRoom
                  style={{
                    WebkitTransition: 'all 0.3s ease-in-out',
                    MozTransition: 'all 0.3s ease-in-out',
                    OTransition: 'all 0.3s ease-in-out',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  onPin={() => setHideNavTop(false)}
                  onUnpin={() => setHideNavTop(true)}>
                  <NavTop handleBackAction={() => handleBackButtonDetailPage()} />
                </HeadRoom>

                <Collapse in={!viewDetail} >
                  <BoxImageLT
                    backgroundImage={`${IMAGE_STORAGE_LG}${ltroom.avatar.images[0].name}`}
                    room={ltroom}
                    onBook={handleOpenBookingDialog}
                  >
                    <Grid container justify='center' alignItems='center' className='roomPage__boxViewMore' onClick={handleView}>
                      <span style={{ color: '#fff' }}>{t('longtermroom:moreDetails')}</span>
                      <KeyboardArrowDownRounded style={{ color: '#fff' }} />
                    </Grid>
                  </BoxImageLT>
                </Collapse>

                <Collapse in={viewDetail} >
                  <Grid container>
                    <Grid item xs={12} sm={12}>
                      <BoxLTRoomDetail room={ltroom} clickBook={handleView} />
                    </Grid>
                  </Grid>
                </Collapse>
              </GridContainer>
            ) : ''}
          </Fragment>
        ),
        [ltroom, viewDetail]
      )}
      <Dialog
        BackdropProps={{classes: {root: "roomPage__backdropDialog"} }}
        classes={{paper: "roomPage__dialogCalendar"}}
        open={openBookingDialog}
        onClose={handleCloseBookingDialog}
        TransitionComponent={TransitionCustom}
      >
        <BookingCalendar handleCloseBookingDialog={handleCloseBookingDialog} />
      </Dialog>
    </Fragment>
  );
};

LongtermRoom.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');
  const data = await getDataLTRoom(store.dispatch, query, initLanguage);
  return {};
};

export default LongtermRoom;
