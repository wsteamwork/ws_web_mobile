import LongTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/LongTerm';
import PriceShortTerm from '@/components/LTR/Merchant/Listing/CreateListing/Step3/PriceShortTerm';
import ServiceFee from '@/components/LTR/Merchant/Listing/CreateListing/Step3/ServiceFee';
import Layout from '@/components/LTR/Merchant/Listing/Layout';
import NextHead from '@/components/NextHead';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProcessReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/process';
import { getPrice, PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { getListingPrices, handlePricesListing, StepPricesActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { IPriceLongTerm, IPriceLT, IPriceShortTerm, IPriceST } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { IServicesFee } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import React, { Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

const RoomCreateListing = () => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { t } = useTranslation();
  const listing = useSelector<ReducersList, any>((state) => state.stepPrice.listing);
  const current_step = useSelector<ReducersList, string>((state) => state.stepPrice.step);
  const disable_next = useSelector<ReducersList, boolean>((state) => state.stepPrice.disable_next);
  const dispatch_process = useDispatch<Dispatch<ProcessReducerAction>>();
  const data_ShortTerm = useSelector<ReducersList, IPriceShortTerm>((state => state.priceTerm.priceST));
  const data_LongTerm = useSelector<ReducersList, IPriceLongTerm>((state => state.priceTerm.priceLT));
  const data_LongTerm_usd = useSelector<ReducersList, IPriceLongTerm>((state => state.priceTerm.priceLTUSD));
  const verified_prices = useSelector<ReducersList, 0 | 1>((state => state.priceTerm.verified_prices));
  const data_serviceFee = useSelector<ReducersList, IServicesFee>((state => state.priceTerm.serviceFee));
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const dispatchPriceTerm = useDispatch<Dispatch<PriceTermActions>>();

  useEffect(() => {
    getListingPrices(id, dispatchStep)
    getPrice(id, dispatchPriceTerm)
  }, []);

  useEffect(() => {
    // localStorage.setItem('currentStep', '3');
    dispatch_process({ type: 'setActiveStepListing', payload: '3' });
  }, []);

  const dataST: IPriceST = {
    prices: data_ShortTerm
  };

  const dataLT: IPriceLT = {
    prices: { prices: data_LongTerm },
    prices_usd: { prices: data_LongTerm_usd },
    verified_prices: verified_prices
  };

  const data = (step) => {
    switch (step) {
      case 'tab1':
        return dataST;
      case 'tab2':
        return dataLT;
      case 'tab3':
        return data_serviceFee;
      default:
        return null;
    }
  };

  const getSteps = () => {
    if (listing.long_term_rent_type.rent_type === 1 && listing.short_term_rent_type) {
      return [t('price:shortTermStep'), t('price:longTermStep'), t('price:longTermFee')];
    } else if (listing.long_term_rent_type.rent_type === 0) {
      return [t('price:shortTermStep')];
    } else {
      return [t('price:shortTermStep'), t('price:longTermStep'), t('price:longTermFee')];
    }
  };

  const getStepContent = (step, steps, setActiveStep, nextLink) => {
    if (listing.long_term_rent_type.rent_type === 1 && listing.short_term_rent_type) {
      switch (step) {
        case 0:
          return <PriceShortTerm />;
        case 1:
          return <LongTerm />;
        case 2:
          return <ServiceFee />;
        default:
          return 'Unknown step';
      }
    } else if (listing.long_term_rent_type.rent_type === 0) {
      switch (step) {
        case 0:
          return <PriceShortTerm />;
        default:
          return 'Unknown step';
      }
    } else {
      switch (step) {
        case 0:
          return <PriceShortTerm />;
        case 1:
          return <LongTerm />;
        case 2:
          return <ServiceFee />;
        default:
          return 'Unknown step';
      }
    }
  };

  if (!listing) { return null }

  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename='Westay - Đặt phòng homestay trực tuyến'
        title='Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay'
        description='Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay'
        url='/host/create-listing'
        ogImage='/static/images/Bg_home.4023648f.jpg' />

      <Layout
        title='Bước 3: Giá và dịch vụ'
        getSteps={getSteps}
        getStepContent={getStepContent}
        nextLink={`/preview-room/${listing.room_id}`}
        disableNext={disable_next}
        handleAPI={() => handlePricesListing(listing.room_id, current_step, data(current_step))}
      />
    </Fragment>
  );
};

export default RoomCreateListing;
