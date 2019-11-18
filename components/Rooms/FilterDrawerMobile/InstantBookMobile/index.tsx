import React, { FC, useContext, ChangeEvent } from 'react';
import IOSSwitch from '../../FilterActions/SwitchMap/IOSSwitch';
import { useTranslation } from 'react-i18next';
import { updateRouter } from '@/store/Context/utility';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';

const InstantBookMobile: FC = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(RoomFilterContext);
  const { instant_book } = state;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (instant_book === 0) {
      dispatch({ type: 'setInstantBook', payload: 1 });
    } else {
      dispatch({ type: 'setInstantBook', payload: 0 });
    }
  };

  return (
    <IOSSwitch checked={instant_book === 1} onChange={handleChange} value="checked" />
  );
};

export default InstantBookMobile;
