import CustomPopper from '@/components/CustomPopper';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { FC, memo, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const FastBooking: FC = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(RoomFilterContext);
  const { instant_book } = state;
  const { router } = useContext(GlobalContext);
  const { query } = router;
  const leaseTypePathName = useSelector<ReducersList, string>((state) => state.searchFilter.leaseTypePathName);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  useEffect(() => {
    if (!!query.instant_book) {
      dispatch({ type: 'setInstantBook', payload: parseInt(query.instant_book as string, 10) });
    }
  }, [query]);

  const handleClick = () => {
    if (instant_book === 0) {
      dispatch({ type: 'setInstantBook', payload: 1 });
      updateRouter(leaseTypePathName, true, 'instant_book', 1, 'page', 1);
    } else {
      dispatch({ type: 'setInstantBook', payload: 0 });
      updateRouter(leaseTypePathName, true, 'instant_book', 0, 'page', 1);
    }
  };
  return useMemo(
    () => (
      <CustomPopper
        arrow
        placement="bottom"
        duration={200}
        content={
          <Grid>
            <p>{t('rooms:searchRooms:fastPayment')}</p>
          </Grid>
        }>
        <Grid
          onClick={handleClick}
          className={classNames('chooseRoomGuest', 'flex_columCenter', leaseTypeGlobal ? {
            haveResultLT: instant_book === 1
          } : {
              haveResult: instant_book === 1
            })}>
          <span className="flex_columCenter chooseRoomGuest__actions">
            {/* <OfflineBoltRounded fontSize="small"></OfflineBoltRounded>&nbsp;&nbsp; */}
            <p>{t('rooms:searchRooms:fastBooking')}</p>
          </span>
          {/* {instant_book === 1 && (
      <span className="chooseRoomGuest__removeIcon">
        <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
      </span>
    )} */}
        </Grid>
      </CustomPopper>
    ),
    [instant_book]
  );
};

export default memo(FastBooking);
