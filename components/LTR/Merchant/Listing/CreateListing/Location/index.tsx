/*global google*/
import CitiesList from '@/components/LTR/Merchant/Listing/CreateListing/Location/CitiesList';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions, CreateListingState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import classNames from 'classnames';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import deepEqual from 'lodash.isequal';
import React, { Dispatch, FC, Fragment, useEffect, useMemo, useState } from 'react';
// import Geosuggest, { Suggest } from 'react-geosuggest';
import { GoogleMap, Marker, withGoogleMap, WithGoogleMapProps } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface IProps { }

interface Coordinate {
  lat: number;
  lng: number;
}

interface GoogleMapProps extends WithGoogleMapProps {
  defaultCenter: Coordinate | null;
  coordinate: Coordinate;
  // onClickMap: (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => void;
  handleDragEnd: (e: google.maps.MouseEvent) => void;
}

interface FormValues {
  // address: string;
  city: string;
  building: string;
  district: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    // address: Yup.string().required(t('basic:addressRequired')),
    city: Yup.string().required(t('basic:cityRequired'))
  });

  return FormValidationSchema;
};

export const InputFeedback = ({ error }) =>
  error ? <div className={classNames('input-feedback')}>{error}</div> : null;

const Location: FC<IProps> = (props) => {
  const {
    address,
    building,
    disableSubmit,
    coordinate: coordinateState,
    district_id,
    city_id
  } = useSelector<ReducersList, CreateListingState>((state) => state.createListing);
  const [addressInput, setAddress] = useState<string>(address);
  // const [buildingInput, setBuilding] = useState<string>(building);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [coordinateMarker, setCoordinateMarker] = useState<Coordinate>(coordinateState);
  const [defaultCenter, setDefaultCenter] = useState<Coordinate | null>(coordinateState);
  const [district, setDistrict] = useState<number>(district_id);
  const [districtList, setDistrictList] = useState<any[]>(null);
  const [disabledDistrictField, setDisabledDistrictField] = useState<boolean>(true);
  const [disableSubmitForm, setDisableSubmit] = useState<boolean>(disableSubmit);

  let refStandaloneBox: any = null;
  const onSearchBoxMounted = (ref) => {
    refStandaloneBox = ref;
  };

  const onPlacesChanged = () => {
    const placeInfo = refStandaloneBox.getPlaces();
    const location = placeInfo[0].geometry.location;
    setAddress(placeInfo[0].formatted_address);
    setCoordinateMarker({
      lat: location.lat(),
      lng: location.lng()
    });
    setDefaultCenter({
      lat: location.lat(),
      lng: location.lng()
    });
  };

  const FormValidationSchema = useValidatation();

  useEffect(() => {
    dispatch({
      type: 'SET_DISABLE_SUBMIT',
      payload: disableSubmitForm
    });
  }, [disableSubmitForm]);

  useEffect(() => {
    dispatch({
      type: 'SET_COORDINATE',
      payload: coordinateMarker
    });
  }, [coordinateMarker]);
  useEffect(() => {
    // console.log(addressInput);
    dispatch({
      type: 'SET_ADDRESS',
      payload: addressInput
    });
  }, [addressInput]);

  // useEffect(() => {
  //   console.log(defaultCenter);
  // }, [defaultCenter]);

  const handleDragEnd = (e: google.maps.MouseEvent) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoordinateMarker({
      lat,
      lng
    });
  };
  const MapWithAMarker = withGoogleMap<GoogleMapProps>((props) => (
    <Fragment>
      {useMemo(
        () => (
          <GoogleMap defaultZoom={14} defaultCenter={props.defaultCenter} streetView={null}>
            <Marker position={props.coordinate} defaultDraggable onDragEnd={props.handleDragEnd} />
          </GoogleMap>
        ),
        [props.defaultCenter]
      )}
    </Fragment>
  ));

  const callBackOnChange = (value) => {
    setDistrict(value);
    dispatch({
      type: 'SET_DISTRICT_ID',
      payload: parseInt(value)
    });
  };
  const initFormValue: FormValues = {
    // address: address,
    city: '',
    building: building,
    district: ''
  };

  const handleFormSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    return {};
  };

  return (
    <div className="step1-tab3-location">
      <Grid className="createListing-location">
        <Grid className="createListing-heading-1">Địa chỉ căn hộ của bạn</Grid>
        <Grid className="createListing-subTitle">
          Khách sẽ chỉ biết được địa chỉ chính xác sau khi đặt phòng thành công
        </Grid>
      </Grid>
      <Formik
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={FormValidationSchema}
        initialValues={initFormValue}
        onSubmit={handleFormSubmit}
        render={({
          values,
          handleSubmit,
          touched,
          errors,
          initialValues,
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched
        }: FormikProps<FormValues>) => {
          const hasChanged = !deepEqual(values, initialValues);
          const hasErrors = Object.keys(errors).length > 0;
          setDisableSubmit(!hasChanged || hasErrors || isSubmitting);
          // console.log('value city', values.city)
          return (
            <form onSubmit={handleSubmit}>
              <Grid container style={{ display: 'flex' }}>
                <Grid item xs={10} md={7}>
                  <Grid style={{ marginBottom: 32 }}>
                    <h3
                      style={{
                        color: '#484848',
                        paddingBottom: 8,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: '1.375em'
                      }}>
                      Thành phố
                    </h3>
                    <CitiesList
                      onChange={setFieldValue}
                      // onBlur={handleBlur}
                      valueCity={values.city}
                      onBlur={setFieldTouched}
                      districtList={districtList}
                      setDistrictList={setDistrictList}
                      setDisabledDistrictField={setDisabledDistrictField}
                      setDistrict={setDistrict}
                    />
                    {touched.city && <InputFeedback error={errors.city} />}
                  </Grid>
                </Grid>
                <Grid className="box-district" item xs={10} md={5}>
                  <SelectCustom
                    onChange={(e) => {
                      handleChange(e);
                      callBackOnChange(e.target.value);
                    }}
                    name="district"
                    value={values.district}
                    options={districtList}
                    title="Quận huyện"
                    onBlurTouched={setFieldTouched}
                    disabled={disabledDistrictField}
                  />
                </Grid>
              </Grid>
              {values.city ? (
                <Grid container>
                  <LazyLoad>
                    <Grid item xs={10} md={8} style={{ margin: '20px 0' }}>
                      <h3 style={{ color: '#484848' }}>Địa chỉ</h3>
                      <div data-standalone-searchbox="">
                        <StandaloneSearchBox
                          ref={onSearchBoxMounted}
                          // bounds={}
                          onPlacesChanged={onPlacesChanged}>
                          <OutlinedInput
                            placeholder="Nhập địa chỉ"
                            // id="tandalone-search-box"
                            inputProps={{ id: 'standalone-search-box' }}
                            value={addressInput}
                            onChange={(e) => {
                              // console.log('currentValue' + e.target.value);
                              setAddress(e.target.value)
                            }}
                            // onBlur={(e: any) => {
                            //   handleBlur(e);
                            //   dispatch({
                            //     type: 'SET_ADDRESS',
                            //     payload: e.target.value
                            //   });
                            // }}
                            labelWidth={0}
                            fullWidth
                          />
                        </StandaloneSearchBox>
                      </div>
                    </Grid>
                    {/* {touched.address && <InputFeedback error={errors.address} />} */}
                    <Grid item xs={10} md={8} style={{ margin: '20px 0' }}>
                      <h3 style={{ color: '#484848' }}>Toà nhà (Tuỳ chọn)</h3>
                      <FormControl fullWidth variant="outlined">
                        <OutlinedInput
                          placeholder="Thông tin thêm về toà nhà, khu nhà..."
                          id="component-outlined"
                          value={values.building}
                          onChange={(e) => {
                            setFieldValue('building', e.target.value);
                            // dispatch({
                            //   type: 'SET_BUILDING',
                            //   payload: e.currentTarget.value
                            // });
                          }}
                          onBlur={(e: any) => {
                            handleBlur(e);

                          }}
                          labelWidth={0}
                        />
                      </FormControl>
                    </Grid>
                  </LazyLoad>
                </Grid>
              ) : ''}
            </form>
          );
        }}
      />
      {addressInput ? (
        <Fragment>
          <Grid className="createListing-heading-2">Đây đã phải là địa chỉ đúng chưa?</Grid>
          <h3 className="createListing-subTitle">
            Nếu cần thiết, bạn có thể thay đổi vị trí cho chính xác. Chỉ những khách hàng xác nhận đặt
            phòng mới có thể thấy được
      </h3>
          {defaultCenter && (
            <MapWithAMarker
              containerElement={<div style={{ height: `350px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              defaultCenter={defaultCenter}
              coordinate={coordinateMarker}
              handleDragEnd={handleDragEnd}
            // onClickMap={onClickMap}
            />
          )}
        </Fragment>
      ) : ''}
    </div>
  );
};

export default Location;
