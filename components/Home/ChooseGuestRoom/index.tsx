import CustomPopper from '@/components/CustomPopper';
import { ReducersList } from '@/store/Redux/Reducers';
import { Grid, InputBase, Paper } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ActionChoose = dynamic(() => import('./ActionChoose'));

const ChooseGuestRoom: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);

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

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return useMemo(
    () => (
      <CustomPopper
        arrow
        placement="bottom"
        duration={200}
        trigger="click"
        isVisible={open}
        theme="light-border"
        onHide={handleClose}
        interactive
        content={<ActionChoose open={open} setOpen={setOpen}></ActionChoose>}>
        <Paper elevation={0} className="chooseGuestRoom">
          <Grid container className="root" onClick={() => setOpen(true)}>
            <span className="flex_columCenter">
              {/* <FontAwesomeIcon icon={faDoorClosed} size="1x"></FontAwesomeIcon> */}
              <InputBase
                readOnly
                value={valueInput}
                className="input"
                placeholder={`${t('home:searchComponent:guestUpper')} & ${t(
                  'home:searchComponent:room'
                )}`}
              />
            </span>
          </Grid>
        </Paper>
      </CustomPopper>
    ),
    [open, valueInput]
  );
};

export default memo(ChooseGuestRoom);
