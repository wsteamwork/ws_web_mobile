import CheckboxCustom from '@/components/LTR/Merchant/Listing/CreateListing/Basic/CheckboxCustom';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { getRoomType, RoomTypeData } from '@/components/Rooms/FilterActions/RoomType/context';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions, CreateListingState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { Checkbox, FormControl, FormControlLabel, InputAdornment, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, FormikProps } from 'formik';
import React, { ChangeEvent, Dispatch, FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { InputFeedback } from '../Location';

interface IProps {
  classes?: any;
}

interface FormValues {
  lease_type: string[];
  accommodation_type: number;
  stay_with_host: number;
  total_area: number;
}

const useStyles = makeStyles((theme) => ({
  checked: {
    color: '#FFA712 !important'
  }
}));

const Basic: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { accommodationType, stayWithHost, disableSubmit, totalArea, listing } = useSelector<
    ReducersList,
    CreateListingState
  >((state) => state.createListing);
  const [isStayWithHost, setStayWithHost] = useState<boolean>(!!stayWithHost);
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const id = router.query.id;
  const [roomTypesData, setRoomTypesData] = useState<RoomTypeData[]>([]);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [disableSubmitForm, setDisableSubmit] = useState<boolean>(disableSubmit);
  const [arrayLeaseType, setArrayLeaseType] = useState<Array<string>>(['shortterm', 'longterm']);

  useEffect(() => {
    dispatch({
      type: 'SET_DISABLE_SUBMIT',
      payload: disableSubmitForm
    });
  }, [disableSubmitForm]);

  useEffect(() => {
    getRoomType(setRoomTypesData);
  }, []);

  const checkLeaseType = (listing: any) => {
    // let arrayLeaseType = [];
    if (listing.long_term_rent_type.rent_type == 1) { setArrayLeaseType(['shortterm', 'longterm']) }
    else if (listing.short_term_rent_type.rent_type) { setArrayLeaseType(['shortterm']) } else {
      setArrayLeaseType([])
    }
    console.log(arrayLeaseType);
    return arrayLeaseType;
  };

  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStayWithHost(checked);
  };

  useEffect(() => {
    dispatch({
      type: 'SET_STAY_WITH_HOST',
      payload: isStayWithHost ? 1 : 0
    });
  }, [isStayWithHost]);

  const initFormValue: FormValues = {
    lease_type: !!id ? checkLeaseType(listing) : arrayLeaseType,
    accommodation_type: accommodationType,
    stay_with_host: !!id ? listing.stay_with_host : null,
    total_area: !!id ? listing.total_area : totalArea
  };

  const validationForm = Yup.object().shape({
    accommodation_type: Yup.string()
      .required('At least one checkbox is required')
      .test('checkNotChoose', 'Please select an option', (value) => value != 0),
    total_area: Yup.string().required('Area Required')
  });

  const handleFormSubmit = (values: FormValues) => {
    const data: any = {
      lease_type: values.lease_type,
      accommodation_type: values.accommodation_type,
      stay_with_host: values.stay_with_host,
      total_area: values.total_area
    };
  };

  return (
    <div>
      <Grid className="createListing-title">
        <Grid className="createListing-heading-1">{t('host:basicInformation')}</Grid>
      </Grid>

      <Formik
        initialValues={initFormValue}
        validationSchema={validationForm}
        onSubmit={handleFormSubmit}>
        {({
          values,
          handleSubmit,
          initialValues,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldTouched,
          setFieldValue
        }: FormikProps<FormValues>) => {
          const hasErrors = Object.keys(errors).length > 0;
          setDisableSubmit(hasErrors || isSubmitting);
          return (
            <form onSubmit={handleSubmit}>
              <CheckboxCustom
                name="lease_type"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Grid item xs={10} md={8} style={{ marginBottom: 32 }}>
                <FormControl
                  error={!!errors.accommodation_type && touched.accommodation_type}
                  fullWidth>
                  <SelectCustom
                    name="accommodation_type"
                    onChange={(e) => {
                      handleChange(e);
                      dispatch({
                        type: 'SET_ACCOMMODATION_TYPE',
                        payload: parseInt(e.target.value)
                      });
                    }}
                    defaultDisabledOption={'Chọn một'}
                    value={values.accommodation_type}
                    title={t('host:propertyType')}
                    options={roomTypesData}
                    onBlurTouched={setFieldTouched}
                  />
                  {touched.accommodation_type && (
                    <InputFeedback error={errors.accommodation_type} />
                  )}
                </FormControl>
              </Grid>

              <Grid className="create-listing-title">{t('host:totalArea')}</Grid>
              <Grid item xs={10} md={8}>
                <FormControl
                  style={{ marginBottom: 32 }}
                  // className={classes.formControl}
                  aria-describedby="price_day_helper"
                  required
                  fullWidth>
                  <OutlinedInput
                    name="total_area"
                    placeholder={t('host:totalArea')}
                    type="number"
                    value={values.total_area}
                    onChange={(e) => {
                      setFieldValue('total_area', parseInt(e.target.value));
                    }}
                    onBlur={(e: any) => {
                      handleBlur(e);
                      dispatch({
                        type: 'SET_TOTAL_AREA',
                        payload: parseInt(e.target.value)
                      });
                    }}
                    // inputComponent={NumberFormatCustom as any}
                    endAdornment={
                      <InputAdornment position="start">
                        m<sup>2</sup>
                      </InputAdornment>
                    }
                    labelWidth={0}
                  />
                  {touched.total_area && <InputFeedback error={errors.total_area} />}
                </FormControl>
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    classes={{ checked: classes.checked }}
                    checked={isStayWithHost}
                    onChange={handleChangeCheckBox}
                    value="stayWithHost"
                  />
                }
                label={t('host:stayWithHost')}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Basic;
