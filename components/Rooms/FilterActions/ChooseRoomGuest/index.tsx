import CustomPopper from '@/components/CustomPopper';
import ActionChoose from '@/components/Home/ChooseGuestRoom/ActionChoose';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { Dispatch, FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import QuickBookIcon from "@material-ui/icons/OfflineBoltRounded";

const ChooseRoomGuest: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [checkRemove, setCheckRemove] = useState(false);
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  const valueInput = useMemo<string>(() => {
    if (numberGuest !== 0 && numberRoom !== 0) {
      return `${numberGuest} ${t('home:searchComponent:guest')} & ${numberRoom} ${t(
        'home:searchComponent:room'
      )}`;
    } else if (numberGuest !== 0) {
      return `${numberGuest} ${t('home:searchComponent:guest')} & 0 ${t(
        'home:searchComponent:room'
      )}`;
    } else if (numberRoom !== 0) {
      return `0 ${t('home:searchComponent:guest')} & ${numberRoom} ${t(
        'home:searchComponent:room'
      )}`;
    }

    return '';
  }, [numberGuest, numberRoom]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    dispatch({ type: 'SET_NUMBER_ROOM', roomsCount: 0 });
    dispatch({ type: 'SET_NAV_GUESTS', guestsCount: 0 });
    updateRouter('/rooms', true, 'number_of_guests', 0, 'number_of_rooms', 0, 'page', 1);
    setOpen(false);
    setCheckRemove(!checkRemove);
  };

  return (
    <CustomPopper
      arrow
      placement="bottom"
      duration={200}
      trigger="click"
      isVisible={open}
      theme="light-border"
      onHide={handleClose}
      interactive
      content={
        <ActionChoose checkRemove={checkRemove} setOpen={setOpen} open={open}></ActionChoose>
      }>
      <Grid
        className={classNames('chooseRoomGuest', 'flex_columCenter', leaseTypeGlobal ? {
          haveResultLT: valueInput !== ''
        } : {
            haveResult: valueInput !== ''
          })}>
        <span onClick={() => setOpen(true)} className="flex_columCenter chooseRoomGuest__actions">
          {/* <FontAwesomeIcon icon={faDoorClosed} size="1x"></FontAwesomeIcon>&nbsp;&nbsp; */}
          <p>
            {valueInput ||
              `${t('home:searchComponent:guestUpper')} & ${t('home:searchComponent:roomUpper')}`}
          </p>
        </span>
        {/* {valueInput !== '' && (
          <span onClick={handleRemove} className="chooseRoomGuest__removeIcon">
            <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
          </span>
        )} */}
      </Grid>
    </CustomPopper>
  );
};

export default ChooseRoomGuest;
