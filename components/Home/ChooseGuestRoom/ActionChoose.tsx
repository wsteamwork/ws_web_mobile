import ButtonGlobal from '@/components/ButtonGlobal';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { faDoorClosed, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const QuantityButtons = dynamic(() => import('@/components/ReusableComponents/QuantityButtons'));

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  checkRemove?: boolean;
}

const ActionChoose: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { setOpen, open, checkRemove } = props;
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);
  const [guest, setGuest] = useState(numberGuest);
  const [room, setRoom] = useState(numberRoom);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  useEffect(() => {
    !open && handleClose();
  }, [open, checkRemove]);

  const handleClose = () => {
    setOpen(false);
    setGuest(numberGuest);
    setRoom(numberRoom);
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch({ type: 'SET_NUMBER_ROOM', roomsCount: room });
    dispatch({ type: 'SET_NAV_GUESTS', guestsCount: guest });
  };

  return (
    <Grid className="chooseGuestRoom__actions">
      <QuantityButtons
        icon={faUserFriends}
        number={guest}
        setNumber={setGuest}
        title={t('home:searchComponent:guestUpper')}></QuantityButtons>
      <QuantityButtons
        icon={faDoorClosed}
        number={room}
        setNumber={setRoom}
        title={t('home:searchComponent:roomUpper')}></QuantityButtons>

      <Grid container>
        <Grid item xs={6}>
          <ButtonGlobal
            height="35px"
            fontSize="14px"
            background="white"
            textColor="#000"
            onClick={handleClose}>
            {t('home:chooseGuestRoom:close')}
          </ButtonGlobal>
        </Grid>
        <Grid item xs={6}>
          {leaseTypeGlobal ?
            <ButtonGlobal background="linear-gradient(to right, #667eea, #764ba2);" height="35px" fontSize="14px" color="primary" onClick={handleSubmit}>
              {t('home:chooseGuestRoom:apply')}
            </ButtonGlobal> :
            <ButtonGlobal height="35px" fontSize="14px" color="primary" onClick={handleSubmit}>
              {t('home:chooseGuestRoom:apply')}
            </ButtonGlobal>}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(ActionChoose);
