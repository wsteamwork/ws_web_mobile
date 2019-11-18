import ButtonGlobal from '@/components/ButtonGlobal';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { ReducersList } from '@/store/Redux/Reducers';
import { FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import React, { Dispatch, FC, memo, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useRoomTypeChecbox } from './context';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  dataClick: number[];
  setDataClick: Dispatch<SetStateAction<number[]>>;
}

const ActionSelect: FC<IProps> = (props) => {
  const { setOpen, dataClick, setDataClick } = props;
  const { t } = useTranslation();
  const { data, handleChange, handleSubmit, handleClose } = useRoomTypeChecbox(
    setOpen,
    dataClick,
    setDataClick
  );
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  return (
    <Grid className="roomType__actions">
      <FormGroup>
        {data.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <CustomCheckbox
                checked={dataClick.some((i) => i === item.id)}
                onChange={handleChange(item.id)}
                value="checkedA"
              />
            }
            label={item.value}></FormControlLabel>
        ))}
      </FormGroup>

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

export default memo(ActionSelect);
