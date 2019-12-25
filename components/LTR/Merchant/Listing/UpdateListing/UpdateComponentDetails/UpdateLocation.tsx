/* global google */
import CitiesList from '@/components/LTR/Merchant/Listing/CreateListing/Location/CitiesList';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { getDataUpdateListing, UpdateDetailsActions, UpdateDetailsState } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import classNames from 'classnames';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import deepEqual from 'lodash.isequal';
import React, { FC, Fragment, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, WithGoogleMapProps } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import CardWrapperUpdate from '../CardWrapperUpdate';

interface IProps { }
interface Coordinate {
  lat: number;
  lng: number;
}

interface GoogleMapProps extends WithGoogleMapProps {
  defaultCenter: Coordinate | null;
  coordinate: Coordinate;
  onClickMap: (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => void;
}

interface FormValues {
  address: string;
  city: string;
  district: string;
  building: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    address: Yup.string().required(t('basic:addressRequired')),
    city: Yup.string().required(t('basic:cityRequired'))
  });

  return FormValidationSchema;
};

const UpdateLocation: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const {
    room_id,
    address,
    building,
    city_id,
    district_id,
    coordinate,
    disableSubmit
  } = useSelector<ReducersList, UpdateDetailsState>((state) => state.updateDetails);
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const [addressInput, setAddress] = useState<string>(address);
  const [buildingInput, setBuilding] = useState<string>(building);
  const [coordi, setCoordinate] = useState<Coordinate>(coordinate);
  // console.log(coordi);
  const [defaultCenter, setDefaultCenter] = useState<Coordinate>({
    lat: 21.027895,
    lng: 105.833896
  });
  const [district, setDistrict] = useState<number>(district_id);
  const [districtList, setDistrictList] = useState<any[]>(null);
  const [disabledDistrictField, setDisabledDistrictField] = useState<boolean>(true);
  const [disableSubmitForm, setDisableSubmit] = useState<boolean>(disableSubmit);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');

  const FormValidationSchema = useValidatation();

  let refStandaloneBox: any = null;
  const onSearchBoxMounted = (ref) => {
    refStandaloneBox = ref;
  };

  const onPlacesChanged = () => {
    const placeInfo = refStandaloneBox.getPlaces();
    const location = placeInfo[0].geometry.location;
    setAddress(placeInfo.formatted_address);
    setCoordinate({
      lat: location.lat(),
      lng: location.lng()
    });
    setDefaultCenter({
      lat: location.lat(),
      lng: location.lng()
    });
  };

  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);

  useMemo(() => {
    setAddress(address);
    setBuilding(building);
    setCoordinate(coordinate);
    setDistrict(district_id);
    setDisableSubmit(disableSubmit);
  }, [address, building, coordinate, district_id, disableSubmit]);

  useEffect(() => {
    dispatch({
      type: 'SET_COORDINATE',
      payload: coordi
    });
  }, [coordi]);
  useEffect(() => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: addressInput
    });
  }, [addressInput]);

  const onClickMap = (e: google.maps.MouseEvent) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setCoordinate({
      lat: lat,
      lng: lng
    });
  };
  const MapWithAMarker = withGoogleMap<GoogleMapProps>((props) => (
    <GoogleMap defaultZoom={14} defaultCenter={props.defaultCenter}>
      <Marker position={props.coordinate} />
    </GoogleMap>
  ));

  const handleChange = (event) => {
    setBuilding(event.target.value);
  };

  const callBackOnChange = (value) => {
    setDistrict(value);
    dispatch({
      type: 'SET_DISTRICT_ID',
      payload: parseInt(value)
    });
  };

  const initFormValue: any = useMemo(() => {
    return {
      address: address,
      city: '',
      building: building,
      district: ''
    };
  }, [address, city_id, building, district]);

  const handleFormSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    return {};
  };

  const handleChangeAddress = (setFieldValue: any) => (value: any) => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: value
    });
    setFieldValue('address', value);
  };

  const InputFeedback = ({ error }) =>
    error ? <div className={classNames('input-feedback')}>{error}</div> : null;

  const updateLocation: any = () => {
    const res = handleUpdateListing(room_id, {
      address: {
        address: addressInput,
        building: buildingInput,
        city_id: city_id,
        district_id: district_id,
        latitude: coordi.lat,
        longitude: coordi.lng
      }
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật địa chỉ căn hộ thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật địa chỉ căn hộ thất bại !');
    }
  };
  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <CardWrapperUpdate
        disabledSave={disableSubmit}
        handleSave={updateLocation}
        openSnack={openSnack}
        statusSnack={statusSnack}
        messageSnack={messageSnack}
        handleCloseSnack={handleCloseSnack}>
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
            //@ts-ignore
            onSubmit={handleFormSubmit}
            render={({
              values,
              handleSubmit,
              touched,
              errors,
              initialValues,
              isSubmitting,
              handleBlur,
              setFieldValue,
              setFieldTouched
            }: FormikProps<FormValues>) => {
              const hasChanged = !deepEqual(values, initialValues);
              const hasErrors = Object.keys(errors).length > 0;
              setDisableSubmit(!hasChanged || hasErrors || isSubmitting);
              return (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ color: '#484848' }}>Địa chỉ</h3>
                  <div data-standalone-searchbox="">
                    <StandaloneSearchBox ref={onSearchBoxMounted} onPlacesChanged={onPlacesChanged}>
                      <OutlinedInput
                        placeholder="Nhập địa chỉ"
                        id="component-outlined"
                        value={addressInput}
                        onChange={(e) => setAddress(e.target.value)}
                        labelWidth={0}
                        fullWidth
                      />
                    </StandaloneSearchBox>
                  </div>

                  {touched.address && <InputFeedback error={errors.address} />}
                  <Grid style={{ width: 'calc(80% - 8px)', margin: '20px 0' }}>
                    <h3 style={{ color: '#484848' }}>Toà nhà (Tuỳ chọn)</h3>

                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        placeholder="Nhập số căn hộ"
                        id="component-outlined"
                        value={values.building}
                        onChange={(e) => {
                          setFieldValue('building', e.target.value);
                        }}
                        onBlur={(e: any) => {
                          handleBlur(e);
                          dispatch({
                            type: 'SET_BUILDING',
                            payload: e.currentTarget.value
                          });
                        }}
                        labelWidth={0}
                      />
                    </FormControl>
                  </Grid>
                  <Grid container style={{ display: 'flex' }}>
                    <Grid item xs={7} style={{ paddingRight: 20 }}>
                      <Grid style={{ margin: '32px 0' }}>
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
                    <Grid item xs={5}>
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
                </form>
              );
            }}
          />

          <Grid className="createListing-heading-2">Đây đã phải là địa chỉ đúng chưa?</Grid>
          <h3 className="createListing-subTitle">
            Nếu cần thiết, bạn có thể thay đổi vị trí cho chính xác. Chỉ những khách hàng xác nhận
            đặt phòng mới có thể thấy được
          </h3>
          {defaultCenter && (
            <MapWithAMarker
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              defaultCenter={defaultCenter}
              coordinate={coordi}
              onClickMap={onClickMap}
            />
          )}
        </div>
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateLocation;
