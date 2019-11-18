import CustomPopper from '@/components/CustomPopper';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { FC, memo, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ActionFilter from './ActionFilter';

const FilterRoom: FC = () => {
  const [open, setOpen] = useState(false);
  const [dataClick, setDataClick] = useState<number[]>([]);
  const { dispatch, state } = useContext(RoomFilterContext);
  const { amenities } = state;
  const { t } = useTranslation();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  const checkAmentites = useMemo<boolean>(() => {
    return amenities.length > 0;
  }, [amenities]);

  const onHide = () => {
    setOpen(false);
    setDataClick(amenities);
  };

  const hanldeOpen = () => {
    setOpen(true);
  };

  const handleRemove = () => {
    setOpen(false);
    dispatch({ type: 'setAmenitiesFilter', amenities: [] });
    setDataClick([]);
  };

  return useMemo(
    () => (
      <CustomPopper
        arrow
        placement="bottom"
        duration={200}
        trigger="click"
        isVisible={open}
        theme="light-border"
        onHide={onHide}
        interactive
        content={
          <ActionFilter
            setDataClick={setDataClick}
            dataClick={dataClick}
            setOpen={setOpen}></ActionFilter>
        }>
        <Grid
          className={classNames('chooseRoomGuest', 'flex_columCenter', leaseTypeGlobal ? {
            haveResultLT: checkAmentites
          } : {
              haveResult: checkAmentites
            })}>
          <span onClick={hanldeOpen} className="flex_columCenter chooseRoomGuest__actions">
            {/* <FontAwesomeIcon icon={faFilter} size="1x"></FontAwesomeIcon>&nbsp;&nbsp; */}
            <p>{t('rooms:searchRooms:filterRooms')}</p>
            {checkAmentites && <p>&nbsp;({amenities.length})</p>}
          </span>
          {/* {checkAmentites && (
            <span onClick={handleRemove} className="chooseRoomGuest__removeIcon">
              <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
            </span>
          )} */}
        </Grid>
      </CustomPopper>
    ),
    [checkAmentites, t, open, dataClick]
  );
};

export default memo(FilterRoom);
