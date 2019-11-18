import CustomPopper from '@/components/CustomPopper';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { FC, memo, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ActionFilter from './ActionFilter';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

const FilterRoom: FC = () => {
    const [open, setOpen] = useState(false);
    const [dataClick, setDataClick] = useState<number[]>([]);
    const { dispatch, state } = useContext(RoomFilterContext);
    const { districts } = state;
    const { t } = useTranslation();
    const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

    const checkDistricts = useMemo<boolean>(() => {
        return districts.length > 0;
    }, [districts]);

    const onHide = () => {
        setOpen(false);
        setDataClick(districts);
    };

    const hanldeOpen = () => {
        setOpen(true);
    };

    const handleRemove = () => {
        setOpen(false);
        dispatch({ type: 'setDistrictsFilter', districts: [] });
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
                        haveResultLT: checkDistricts
                    } : {
                            haveResult: checkDistricts
                        })}>
                    <span onClick={hanldeOpen} className="flex_columCenter chooseRoomGuest__actions">
                        {/* <FontAwesomeIcon icon={faFilter} size="1x"></FontAwesomeIcon>&nbsp;&nbsp; */}
                        <p>{t('rooms:searchRooms:districtsFilter')}</p>
                        {checkDistricts && <p>&nbsp;({districts.length})</p>}
                    </span>
                    {/* {checkDistricts && (
            <span onClick={handleRemove} className="chooseRoomGuest__removeIcon">
              <FontAwesomeIcon icon={faTimesCircle} size="1x"></FontAwesomeIcon>
            </span>
          )} */}
                </Grid>
            </CustomPopper>
        ),
        [checkDistricts, t, open, dataClick]
    );
};

export default memo(FilterRoom);
