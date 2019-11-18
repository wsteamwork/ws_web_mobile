import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { getDataUpdateListing, UpdateDetailsActions, UpdateDetailsState } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, Fragment, useContext, useEffect, useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
interface IProps { }

const UpdateNumberGuest: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, guestRecommendation, maxGuest } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const [guest, setGuest] = useState<number>(guestRecommendation);
  const [maxGuests, setMaxGuests] = useState<number>(maxGuest);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>("Cập nhật thành công");
  const [statusSnack, setStatusSnack] = useState<string>("success");

  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);

  useEffect(() => {
    setGuest(guestRecommendation);
    setMaxGuests(maxGuest);
  }, [guestRecommendation, maxGuest]);

  useEffect(() => {
    dispatch({
      type: 'SET_GUEST_RECOMMENDATION',
      payload: guest
    });
  }, [guest]);

  useEffect(() => {
    dispatch({
      type: 'SET_MAX_GUEST',
      payload: maxGuests
    });
  }, [maxGuests]);

  const UpdateGuests: any = () => {
    const res = handleUpdateListing(room_id, {
      guests: {
        recommendation: guest,
        max_additional_guest: maxGuests,
      }
    });
    if(res) {
      setOpenSnack(true);
      setMessageSnack("Cập nhật số lượng khách thành công !")
    }
    else {
      setOpenSnack(true);
      setStatusSnack("error");
      setMessageSnack("Cập nhật số lượng khách thất bại !")
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
      <CardWrapperUpdate handleSave={UpdateGuests} openSnack={openSnack} messageSnack={messageSnack} statusSnack={statusSnack} handleCloseSnack={handleCloseSnack}>
        <div className="step1-tab2-room">
          <Grid className="createListing-title">
            <Grid className="createListing-heading-1">
              Bạn có thể cung cấp dịch vụ cho bao nhiêu khách
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <QuantityButtons number={guest} setNumber={setGuest} title={'Khách'}></QuantityButtons>
            <QuantityButtons
              number={maxGuests}
              setNumber={setMaxGuests}
              title={'Số khách tối đa'}></QuantityButtons>
          </Grid>
        </div>
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateNumberGuest;
