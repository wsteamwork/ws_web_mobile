import Basic from '@/components/LTR/Merchant/Listing/CreateListing/Basic';
import Bathroom from '@/components/LTR/Merchant/Listing/CreateListing/Bathroom';
import Location from '@/components/LTR/Merchant/Listing/CreateListing/Location';
import Room from '@/components/LTR/Merchant/Listing/CreateListing/Room';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import NextHead from '@/components/NextHead';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions, CreateListingState, getDataLTCreateListingID, handleUpdateStep1 } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { getCookieFromReq } from '@/utils/mixins';
import React, { Fragment, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

const RoomCreateListingID = () => {
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [idListing, setIdListing] = useState<number>(null);
  const { router } = useContext(GlobalContext);
  const disableSubmit = useSelector<ReducersList, boolean>(
    (state) => state.createListing.disableSubmit
  );
  const { listing } = useSelector<ReducersList, CreateListingState>((state) => state.createListing);
  const getSteps = () => {
    return ['Thông tin cơ bản', 'Phòng ngủ', 'Phòng tắm', 'Địa chỉ'];
  };

  const isExist = listing.apartment_building_id;

  const data = {
    lease_type: useSelector<ReducersList, number>((state) => state.createListing.leaseType),
    accommodation_type: useSelector<ReducersList, number>(
      (state) => state.createListing.accommodationType
    ),
    total_area: useSelector<ReducersList, number>((state) => state.createListing.totalArea),
    stay_with_host: useSelector<ReducersList, number>((state) => state.createListing.stayWithHost),
    guest_recommendation: useSelector<ReducersList, number>(
      (state) => state.createListing.guestRecommendation
    ),
    max_guest: useSelector<ReducersList, number>((state) => state.createListing.maxGuest),
    number_bedrooms: useSelector<ReducersList, number>(
      (state) => state.createListing.bedRoomsNumber
    ),
    number_bathroom: useSelector<ReducersList, number>(
      (state) => state.createListing.bathroomNumber
    ),
    bedRooms: useSelector<ReducersList, any>((state) => state.createListing.bedRooms),
    address: isExist ? listing.address : useSelector<ReducersList, string>((state) => state.createListing.address),
    building: isExist ? listing.apartment_building : useSelector<ReducersList, string>((state) => state.createListing.building),
    coordinate: isExist ? { lat: listing.latitude, lng: listing.longitude } : useSelector<ReducersList, any>((state) => state.createListing.coordinate),
    city_id: isExist ? listing.city_id : useSelector<ReducersList, any>((state) => state.createListing.city_id),
    district_id: isExist ? listing.district_id : useSelector<ReducersList, any>((state) => state.createListing.district_id)
  };

  const uid = router.query.id;
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Basic />;
      case 1:
        return <Room />;
      case 2:
        return <Bathroom />;
      case 3:
        return <Location />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/host/create-listing"
        ogImage="/static/images/Bg_home.4023648f.jpg" />
      <Layout
        title="Bước 1: Thông tin cơ bản"
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={`/host/create-listing/${idListing}/detail`}
        handleAPI={() => handleUpdateStep1(data, dispatch, uid)}
        submitEachStep={true}
        disableSubmit={disableSubmit}
        disableNext={disableSubmit}
      />
    </Fragment>
  );
};

RoomCreateListingID.getInitialProps = async ({ store, query, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  const data = await getDataLTCreateListingID(store.dispatch, query, initLanguage);
  return {};
};

export default RoomCreateListingID;
