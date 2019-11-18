import Amenities from '@/components/LTR/Merchant/Listing/CreateListing/Amenities';
import Description from '@/components/LTR/Merchant/Listing/CreateListing/Description';
import UploadImage from '@/components/LTR/Merchant/Listing/CreateListing/UploadImage';
import ImageCaption from '@/components/LTR/Merchant/Listing/CreateListing/UploadImage/ImageCaption';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import NextHead from '@/components/NextHead';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProcessReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/process';
import { AmenitiesReducerAction, getDataAmenities } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
import { DetailsReducerAction, getListingDetails, handleDetailsListing } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { getDataImages, ImageReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import React, { Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';


const RoomCreateListing = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<DetailsReducerAction>>();
  const dispatch_process = useDispatch<Dispatch<ProcessReducerAction>>();
  const dispatch_amen = useDispatch<Dispatch<AmenitiesReducerAction>>();
  const dispatch_img = useDispatch<Dispatch<ImageReducerAction>>();

  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.details.listing);
  const current_step = useSelector<ReducersList, string>((state) => state.details.step);
  const disable_next = useSelector<ReducersList, boolean>((state) => state.details.disable_next);
  const data_description = {
    name: useSelector<ReducersList, string>((state) => state.description.name),
    description: useSelector<ReducersList, string>((state) => state.description.description),
    space: useSelector<ReducersList, string>((state) => state.description.space),
    rules: useSelector<ReducersList, string>((state) => state.description.rules)
  };

  const data_amenities = {
    facilities: useSelector<ReducersList, number[]>((state) => state.amenities.facilities),
    kitchens: useSelector<ReducersList, number[]>((state) => state.amenities.kitchens),
    bathrooms: useSelector<ReducersList, number[]>((state) => state.amenities.bathrooms),
    entertainment: useSelector<ReducersList, number[]>((state) => state.amenities.entertainment),
    outdoors: useSelector<ReducersList, number[]>((state) => state.amenities.outdoors),
    others: useSelector<ReducersList, number[]>((state) => state.amenities.others)
  };
  const data_images = {
    avatar_image: useSelector<ReducersList, ImagesRes>((state) => state.images.avatar_image),
    cover_photo: useSelector<ReducersList, ImagesRes>((state) => state.images.cover_photo),
    livingrooms: useSelector<ReducersList, ImagesRes>((state) => state.images.livingrooms),
    bedrooms: useSelector<ReducersList, any>((state) => state.images.bedrooms),
    kitchens: useSelector<ReducersList, ImagesRes>((state) => state.images.kitchens),
    bathrooms: useSelector<ReducersList, any>((state) => state.images.bathrooms),
    outdoors: useSelector<ReducersList, ImagesRes>((state) => state.images.outdoors),
    furnitures: useSelector<ReducersList, ImagesRes>((state) => state.images.furnitures)
  };
  const data = (step) => {
    switch (step) {
      case 'tab1':
        return data_description;
      case 'tab2':
        return data_amenities;
      case 'tab3':
        return data_images;
      default:
        return data_description;
    }
  };

  useEffect(() => {
    if (!listing) {
      getListingDetails(id, dispatch);
    }
  }, []);

  useEffect(() => {
    getDataAmenities(id, dispatch_amen);
  }, []);

  useEffect(() => {
    getDataImages(id, dispatch_img);
  }, []);

  useEffect(() => {
    // localStorage.setItem('currentStep', '2');
    dispatch_process({ type: 'setActiveStepListing', payload: '2' });
  }, []);

  const getSteps = () => {
    return [t('details:tab1'), t('details:tab2'), t('details:tab3'), t('details:tab4')];
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Description />;
      case 1:
        return <Amenities />;
      case 2:
        return <UploadImage />;
      case 3:
        return <ImageCaption />;
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
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>

      <Layout
        title={t('details:titleStep')}
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={`/host/create-listing/${id}/price`}
        disableNext={disable_next}
        handleAPI={() => handleDetailsListing(listing.room_id, current_step, data(current_step))}
      />
    </Fragment>
  );
};
export default RoomCreateListing;
