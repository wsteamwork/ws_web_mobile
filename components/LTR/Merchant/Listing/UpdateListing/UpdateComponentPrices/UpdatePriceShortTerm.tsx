import { ReducersList } from '@/store/Redux/Reducers';
import { PriceTermActions, getPrice, PriceTermState } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { StepPricesActions, getListingPrices } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import React, { FC, useEffect, Fragment, useContext, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
import { GlobalContext } from '@/store/Context/GlobalContext';
import PriceShortTerm from '../../CreateListing/Step3/PriceShortTerm';
import { IPriceShortTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';

interface IProps {
  classes?: any;
}
const UpdatePriceShortTerm: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { listing, disable_next } = useSelector<ReducersList, any>((state) => state.stepPrice);
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const dispatchPriceTerm = useDispatch<Dispatch<PriceTermActions>>();
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>("success");
  const priceShort = useSelector<ReducersList, IPriceShortTerm>((state) => state.priceTerm.priceST);
  useEffect(() => {
    getListingPrices(id, dispatchStep);
    getPrice(id, dispatchPriceTerm)
  }, []);

  const UpdateShortTerm: any = () => {
    const res = handleUpdateListing(listing.room_id, {
      prices_short_term: {
        price_day: priceShort.price_day,
        price_hour: priceShort.price_hour,
        price_charge_guest: priceShort.price_charge_guest,
        price_after_hour: priceShort.price_after_hour,
        cleaning_fee: priceShort.cleaning_fee,
        price_day_discount: priceShort.price_day_discount,
        price_hour_discount: priceShort.price_day_discount,
        is_discount: priceShort.is_discount
      }
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack("Cập nhật giá ngắn hạn thành công !")
    }
    else {
      setOpenSnack(true);
      setStatusSnack("error");
      setMessageSnack("Cập nhật giá ngắn hạn thất bại !")
    }
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  return (
    <Fragment>
      <CardWrapperUpdate disabledSave={disable_next} handleSave={UpdateShortTerm} openSnack={openSnack} statusSnack={statusSnack} messageSnack={messageSnack} handleCloseSnack={handleCloseSnack}>
        <PriceShortTerm />
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdatePriceShortTerm;
