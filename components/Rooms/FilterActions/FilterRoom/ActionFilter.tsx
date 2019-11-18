import ButtonGlobal from '@/components/ButtonGlobal';
import { CustomCheckbox } from '@/components/Home/CheckboxList';
import { ReducersList } from '@/store/Redux/Reducers';
import { FormControlLabel, Grid } from '@material-ui/core';
import React, { Dispatch, FC, memo, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFilterRoom } from './context';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDataClick: Dispatch<SetStateAction<number[]>>;
  dataClick: number[];
}

const ActionFilter: FC<IProps> = (props) => {
  const { setOpen, setDataClick, dataClick } = props;
  const { data, handleChange, handleClose, handleSubmit } = useFilterRoom(
    setDataClick,
    dataClick,
    setOpen
  );
  const { t } = useTranslation();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  return (
    <Grid className="roomsFilter">
      <Grid className="roomsFilter__choose">
        {data.map((item, index) => (
          <Grid key={index}>
            <h3>{item[0]}</h3>

            <Grid container className="roomsFilter__item">
              {item[1].map((i, index) => (
                <Grid item xs={4} key={index}>
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={dataClick.some((x) => x === i.id)}
                        onChange={handleChange(i.id)}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label={i.name}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid className="roomsFilter__actions flex_columCenter">
        <Grid container>
          <Grid item xs={6}>
            <ButtonGlobal
              onClick={handleClose}
              height="35px"
              fontSize="14px"
              background="white"
              textColor="#000">
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
    </Grid>
  );
};

export default memo(ActionFilter);
