// import IOSSwitch from './SwitchMap/IOSSwitch';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { FormControlLabel } from '@material-ui/core';
import React, { ChangeEvent, Dispatch, FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IOSSwitch from '../SwitchMap/IOSSwitch';

const SwitchToServiceApartment: FC = () => {
  const dispatchOnlyApartment = useDispatch<Dispatch<SearchFilterAction>>();
  const { dispatch, state } = useContext(RoomFilterContext);

  const leaseTypePathName = useSelector<ReducersList, string>((state) => state.searchFilter.leaseTypePathName);
  // const filterOnlyApartment = useSelector<ReducersList, number>((state) => state.searchFilter.onlyApartmentBuilding);
  const { only_apartment_building } = state;
  const [enableApartment, setEnableApartment] = useState(only_apartment_building);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (enableApartment == 1) {
      dispatchOnlyApartment({ type: 'SET_ONLY_APARTMENT_BUILDING', onlyApartmentBuilding: 0 });
      dispatch({ type: 'setOnlyApartmentBuilding', payload: 0 });
      setEnableApartment(0);
      updateRouter(leaseTypePathName, true, 'only_apartment_building', 0, 'page', 1);
    } else {
      dispatchOnlyApartment({ type: 'SET_ONLY_APARTMENT_BUILDING', onlyApartmentBuilding: 1 });
      dispatch({ type: 'setOnlyApartmentBuilding', payload: 1 });
      setEnableApartment(1);
      updateRouter(leaseTypePathName, true, 'only_apartment_building', 1, 'page', 1);
    }
  };

  return (
    <FormControlLabel
      control={<IOSSwitch checked={enableApartment == 1} onChange={handleChange} value="checkedB" />}
      label={() => (null)}
    />
  );
};

export default SwitchToServiceApartment;
