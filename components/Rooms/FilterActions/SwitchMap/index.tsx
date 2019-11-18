import React, { FC, useContext, ChangeEvent } from 'react';
import { FormControlLabel } from '@material-ui/core';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import IOSSwitch from './IOSSwitch';
import { updateRouter } from '@/store/Context/utility';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

const SwitchMap: FC = () => {
  const { dispatch, state } = useContext(RoomIndexContext);
  const { isMapOpen } = state;
  const leaseTypePathName = useSelector<ReducersList, string>((state) => state.searchFilter.leaseTypePathName);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch({ type: 'setMapOpen', isMapOpen: checked });

    if (checked === false) {
      dispatch({ type: 'setCoords', payload: null });
    }

    if (checked === true) {
      updateRouter(leaseTypePathName,true, 'city_id', null, 'district_id', null);
    }
  };

  return (
    <FormControlLabel
      control={<IOSSwitch checked={isMapOpen} onChange={handleChange} value="checkedB" />}
      label="Map"
    />
  );
};

export default SwitchMap;
