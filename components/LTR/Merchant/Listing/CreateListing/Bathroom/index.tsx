import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions, CreateListingState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import Grid from '@material-ui/core/Grid/Grid';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {}

const Bathroom: FC<IProps> = (props) => {
  const { bathroomNumber } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const [bathroom, setBathroom] = useState<number>(bathroomNumber);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  useEffect(() => {
    dispatch({
      type: 'SET_BATHROOM_NUMBER',
      payload: bathroom
    });
    dispatch({
      type: 'SET_DISABLE_SUBMIT',
      payload: false
    });
  }, [bathroom]);
  return (
    <div className="step1-tab3-bathroom">
      <Grid className="createListing-title">
        <Grid className="createListing-heading-1">Số phòng tắm</Grid>
        <Grid className="createListing-subTitle">Nhập số phòng tắm trong căn hộ của bạn</Grid>
      </Grid>

      <Grid item sm={8}>
        <QuantityButtons
          number={bathroom}
          setNumber={setBathroom}
          title={'Phòng tắm'}></QuantityButtons>
      </Grid>
    </div>
  );
};

export default Bathroom;
