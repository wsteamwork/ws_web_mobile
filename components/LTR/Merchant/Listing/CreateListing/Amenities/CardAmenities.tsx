import { ReducersList } from '@/store/Redux/Reducers';
import { AmenitiesReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import mainColor from '@/styles/constants/colors';
import { AmenitiesIndexRes } from '@/types/Requests/LTR/Amenities/AmenitiesResponses';
import { Checkbox, createStyles, FormControlLabel, Grid, Theme, Typography, withStyles } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import OutlinedDiv from './OutlinedGrid';
export const CustomCheckbox = withStyles({
  root: {
    color: mainColor.primary,
    '&$checked': {
      color: mainColor.primary
    }
  }
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface IProps {
  classes?: any;
  label: string;
  sub_label?: string;
  amenities: AmenitiesIndexRes[];
  dataClick?: number[];
  typeUpload: { type: any };
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    subTitle: {
      marginBottom: theme.spacing(3)
    }
  })
);

const CardAmenities: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { label, sub_label, amenities, dataClick, typeUpload } = props;
  const dispatch = useDispatch<Dispatch<AmenitiesReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  let countAmenities = useSelector<ReducersList, number>(
    (state) => state.amenities.count_amenities
  );
  const [newDataClick, setNewDataClick] = useState<number[]>(dataClick);
  const handleChange = (id: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      setNewDataClick([...newDataClick, id]);
      dispatch({ type: typeUpload.type, payload: [...newDataClick, id] });
      dispatch({ type: 'setCountAmenities', payload: countAmenities + 1 });
    } else {
      let dataCheckboxUnCheck = newDataClick.filter((i) => i !== id);
      setNewDataClick(dataCheckboxUnCheck);
      dispatch({ type: typeUpload.type, payload: dataCheckboxUnCheck });
      dispatch({ type: 'setCountAmenities', payload: countAmenities - 1 });
    }
  };
  useEffect(() => {
    if (countAmenities < 10) {
      dispatch_detail({ type: 'setDisableNext', payload: true });
    } else {
      dispatch_detail({ type: 'setDisableNext', payload: false });
    }
  }, [countAmenities]);
  return useMemo(
    () => (
      <OutlinedDiv label={label}>
        <Grid container>
          <Grid item xs={12} className={classes.subTitle}>
            <Typography>{sub_label}</Typography>
          </Grid>
          {amenities.map((o) => (
            <Grid item xs={12} sm={6} key={o.id}>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    name={o.id.toString()}
                    onChange={handleChange(o.id)}
                    checked={newDataClick.some((x) => x === o.id)}
                    value={o.id.toString()}
                    color="primary"
                  />
                }
                label={o.comfort_trans[0].name}
              />
            </Grid>
          ))}
        </Grid>
      </OutlinedDiv>
    ),
    [newDataClick, countAmenities]
  );
};

export default CardAmenities;
