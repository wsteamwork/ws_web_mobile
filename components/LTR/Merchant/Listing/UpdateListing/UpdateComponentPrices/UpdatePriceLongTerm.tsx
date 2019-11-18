import { ReducersList } from '@/store/Redux/Reducers';
import { PriceTermActions, getPrice } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { StepPricesActions, getListingPrices } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import React, { FC, useEffect, Fragment, useContext, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
import { GlobalContext } from '@/store/Context/GlobalContext';
import PriceLongTerm from '../../CreateListing/Step3/LongTerm';
import { IPriceLongTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';

interface IProps {
  classes?: any;
}
const UpdatePriceLongTerm: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { listing, disable_next } = useSelector<ReducersList, any>((state) => state.stepPrice);
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const dispatchPriceTerm = useDispatch<Dispatch<PriceTermActions>>();
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>("success");
  const priceLong = useSelector<ReducersList, IPriceLongTerm>((state) => state.priceTerm.priceLT);
  useEffect(() => {
    getListingPrices(id, dispatchStep);
    getPrice(id, dispatchPriceTerm);
  }, []);

  const UpdateLongTerm: any = () => {
    const res = handleUpdateListing(listing.room_id, {
      prices_long_term: {
        prices: priceLong
      } 
    });
    if(res) {
      setOpenSnack(true);
      setMessageSnack("Cập nhật giá dài hạn thành công !")
    }
    else {
      setOpenSnack(true);
      setStatusSnack("error");
      setMessageSnack("Cập nhật giá dài hạn thất bại !")
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
      <CardWrapperUpdate disabledSave={disable_next} handleSave={UpdateLongTerm} openSnack={openSnack} statusSnack={statusSnack} messageSnack={messageSnack} handleCloseSnack={handleCloseSnack}>
        <PriceLongTerm />
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdatePriceLongTerm;
