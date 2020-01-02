import BusinessTripRooms from '@/components/LTR/LTHome/BusinessTripRooms';
import EditorChoiceRooms from '@/components/LTR/LTHome/EditorChoiceRooms';
import ForFamilyRooms from '@/components/LTR/LTHome/ForFamilyRooms';
import GoodPrice from '@/components/LTR/LTHome/GoodPrice';
import HighEndRooms from '@/components/LTR/LTHome/HighEndRooms';
import NavTopSearch from '@/components/LTR/LTHome/NavTopSearch';
import RoomTypeList from '@/components/LTR/LTHome/RoomTypeList';
import StudioForRent from '@/components/LTR/LTHome/StudioForRent';
import TopDestination from '@/components/LTR/LTHome/TopDestinations';
import NextHead from '@/components/NextHead';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { getCookieFromReq } from '@/utils/mixins';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import HeadRoom from 'react-headroom';
import LazyLoad from 'react-lazyload';
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector } from 'react-redux';
import SearchComponent from '@/components/Home/SearchComponent';
import ButtonChangeLeaseType from '@/components/ButtonChangeLeaseType';
import GridContainer from '@/components/Layout/Grid/Container';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      margin: '0 auto'
    },
    root: {
      height: 380,
      transform: 'translateZ(0px)',
      flexGrow: 1
    },
    speedDial: {
      position: 'fixed',
      bottom: '10%',
      right: theme.spacing(1)
    },
    fab: {
      height: 48,
      width: 48,
      backgroundColor: '#57D4C3',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#57D4C3',
        color: '#ffffff'
      }
    },
    colorIcon: {
      color: '#484848'
    },
    customBackdrop: {
      zIndex: 10
    },
    customLabel: {
      width: 93,
      color: '#484848'
    }
  })
);
const LTHome: NextPage = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Westay - Đặt phòng Homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay cùng với nhiều ưu đãi hấp dẫn"
        url="https://westay.vn"
        ogImage="/static/images/Bg_home.4023648f.jpg"
      />

      {leaseTypeGlobal ? (
        <Grid container justify="center">
          <Backdrop
            classes={{
              root: classes.customBackdrop
            }}
            open={open}
          />
          <Grid item xs={12}>
            <HeadRoom
              style={{
                zIndex: 2,
                WebkitTransition: 'all 0.35s ease-in-out',
                MozTransition: 'all 0.35s ease-in-out',
                OTransition: 'all 0.35s ease-in-out',
                transition: 'all 0.35s ease-in-out'
              }}>
              <Grid item xs={12} className={classes.boxWrapper}>
                <NavTopSearch />
              </Grid>
            </HeadRoom>
          </Grid>
          <Grid item xs={12}>
            <RoomTypeList />
          </Grid>
          <Grid item xs={12}>
            <TopDestination />
          </Grid>
          <Grid item xs={12}>
            <LazyLoad>
              <EditorChoiceRooms />
            </LazyLoad>
          </Grid>
          <Grid item xs={12}>
            <LazyLoad>
              <ForFamilyRooms />
            </LazyLoad>
          </Grid>
          <Grid item xs={12}>
            <LazyLoad>
              <BusinessTripRooms />
            </LazyLoad>
          </Grid>
          <Grid item xs={12}>
            <LazyLoad>
              <HighEndRooms />
            </LazyLoad>
          </Grid>
          <Grid item xs={12}>
            <LazyLoad>
              <StudioForRent />
            </LazyLoad>
          </Grid>
          <Grid item xs={12}>
            <LazyLoad>
              <GoodPrice />
            </LazyLoad>
          </Grid>
        </Grid>
      ) : (
        <GridContainer xs={12} classNameItem="searchHome">
          <div className="searchHomeLayer">
            <GridContainer xs={11} sm={11} md={11} lg={10} classNameItem="searchHome__opa">
              <SearchComponent className="searchHome__content" showGuestRoom={true} />
            </GridContainer>
          </div>
        </GridContainer>
      )}
      <ButtonChangeLeaseType isHomePage={true} />
    </Fragment>
  );
};

LTHome.getInitialProps = async ({ store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  return {};
};

export default LTHome;
