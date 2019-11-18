import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { getPrice, PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { getListingPrices, StepPricesActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { IServicesFee } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import React, { FC, Fragment, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import ServiceFee from '../../CreateListing/Step3/ServiceFee';
import CardWrapperUpdate from '../CardWrapperUpdate';

interface IProps {
  classes?: any;
}
const UpdateIncludedFee: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { listing, disable_next } = useSelector<ReducersList, any>((state) => state.stepPrice);
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const dispatchPriceTerm = useDispatch<Dispatch<PriceTermActions>>();
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>("success");
  const priceService = useSelector<ReducersList, IServicesFee>(
    (state) => state.priceTerm.serviceFee
  );
  useEffect(() => {
    getListingPrices(id, dispatchStep);
    getPrice(id, dispatchPriceTerm)
  }, []);

  const UpdateServiceFee: any = () => {
    const res = handleUpdateListing(listing.room_id, {
      long_term_fee: priceService.included_fee
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack("Cập nhật phí dịch vụ dài hạn thành công !")
    }
    else {
      setOpenSnack(true);
      setStatusSnack("error");
      setMessageSnack("Cập nhật phí dịch vụ dài hạn thất bại !")
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
      <CardWrapperUpdate disabledSave={disable_next} handleSave={UpdateServiceFee} openSnack={openSnack} statusSnack={statusSnack} messageSnack={messageSnack} handleCloseSnack={handleCloseSnack}>
        <ServiceFee />
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateIncludedFee;
