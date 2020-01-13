import React, { Fragment, FC, useContext, useState, useMemo, useEffect, ChangeEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  Dialog,
  Typography,
  DialogContent,
  Grid,
  InputAdornment,
  Link,
  TextField
} from '@material-ui/core';
import { TransitionCustom } from '@/components/Book/BookingForm';
import { GlobalContext } from '@/store/Context/GlobalContext';
import SearchPlaceCustom from '../LTR/Merchant/Listing/CreateListing/Location/SearchPlaceCustom';
import { Coordinate } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { withGoogleMap, GoogleMap, Marker, WithGoogleMapProps } from 'react-google-maps';
import RoomIcon from '@material-ui/icons/Room';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  UpdateDetailsState,
  UpdateDetailsActions,
  getDataPlacesListing
} from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import ButtonGlobal from '../ButtonGlobal';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import { axios_merchant } from '@/utils/axiosInstance';
import { Dispatch } from 'redux';

interface IProps {
  classes?: any;
  open: boolean;
  handleClose: () => void;
  guidebook_category_id: number;
  clearAddress: boolean;
  nameDefault?: string;
  descriptionDefault?: string;
  distanceDefault?: number;
  isUpdate?: boolean;
  placeEditId?: number;
  latPlace?: number | string;
  lngPlace?: number | string;
}

interface GoogleMapProps extends WithGoogleMapProps {
  defaultCenter: Coordinate | null;
  coordinate: Coordinate;
}
// @ts-ignore
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      padding: '16px 24px',
      margin: 30,
      borderRadius: 16,
      [theme.breakpoints.down('xs')]: {
        minWidth: 'auto'
      },
      minWidth: 550
    },
    boxContent: {
      minHeight: 64,
      padding: 0,
      overflowY: 'unset'
    },
    cancelBtn: {
      color: '#1d8df7',
      marginTop: 16
    },
    margin: {
      margin: '30px 0'
    },
    label: {
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightBold,
      color: '#1d8df7'
    },
    customBtnSubmit: {
      float: 'right',
      borderRadius: 5,
      boxShadow: 'none',
      height: '40px',
      fontSize: '14px',
      background: '#1d8df7',
      '&:hover': {
        background: '#1d8df7'
      }
    },
    textCancelBtn: {
      fontWeight: 600
    },
    multilineColor: {
      color: '#484848',
      fontWeight: theme.typography.fontWeightBold
    }
  })
);

const DialogGuideBookMap: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {
    open,
    handleClose,
    guidebook_category_id,
    clearAddress,
    nameDefault,
    descriptionDefault,
    distanceDefault,
    placeEditId,
    latPlace,
    lngPlace,
    isUpdate
  } = props;
  const { width } = useContext(GlobalContext);
  const { coordinate, room_id } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const [coordinateMarker, setCoordinateMarker] = useState<Coordinate | null>(coordinate);
  const [defaultCenter, setDefaultCenter] = useState<Coordinate | null>(coordinate);
  const [addressInput, setAddress] = useState<string>(nameDefault ? nameDefault : '');
  const [addressTemp, setAddressTemp] = useState<string>(nameDefault ? nameDefault : '');
  const [distance, setDistance] = useState<number>(distanceDefault ? distanceDefault : null);
  const [description, setDescription] = useState<string>(
    descriptionDefault ? descriptionDefault : ''
  );
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  useEffect(() => {
    if (!isUpdate && coordinateMarker && coordinateMarker.lat) {
      let distanceM = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(coordinateMarker.lat, coordinateMarker.lng),
        new google.maps.LatLng(coordinate.lat, coordinate.lng)
      );
      let roundsNumber = Number(distanceM.toFixed(0));
      setDistance(roundsNumber);
    }
  }, [coordinateMarker]);
  useEffect(() => {
    setAddressTemp(addressInput);
  }, [addressInput]);
  useEffect(() => {
    if (clearAddress) {
      handleBack();
    }
  }, [clearAddress]);
  useEffect(() => {
    if (addressInput.length < 5 || !distance) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [addressInput, distance]);
  const MapWithAMarker = withGoogleMap<GoogleMapProps>((props) => (
    <Fragment>
      {useMemo(
        () => (
          <GoogleMap defaultZoom={14} defaultCenter={props.defaultCenter} streetView={null}>
            <Marker position={props.coordinate} defaultDraggable />
          </GoogleMap>
        ),
        [props.defaultCenter]
      )}
    </Fragment>
  ));
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressTemp(event.target.value);
  };
  const handleBlurName = () => {
    setAddress(addressTemp);
  };
  const handleChangeDistance = (event: ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value));
  };
  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleBack = () => {
    setAddress('');
    setDescription('');
    setCoordinateMarker(coordinate);
    setDefaultCenter(coordinate);
  };
  const handleAddPlace = async () => {
    const response = await axios_merchant.post('places', {
      name: addressInput,
      distance: distance,
      description: description,
      longitude: guidebook_category_id !== 12 ? coordinateMarker.lat : null,
      latitude: guidebook_category_id !== 12 ? coordinateMarker.lng : null,
      guidebook_category_id: guidebook_category_id,
      room_id: room_id
    });
    if (response) {
      handleClose();
      handleBack();
      getDataPlacesListing(room_id, dispatch);
    }
  };
  const handleUpdatePlace = async () => {
    const response = await axios_merchant.put(`places/${placeEditId}`, {
      name: addressInput,
      distance: distance,
      description: description,
      longitude: latPlace,
      latitude: lngPlace,
      guidebook_category_id: guidebook_category_id,
      room_id: room_id
    });
    if (response) {
      handleClose();
      handleBack();
      getDataPlacesListing(room_id, dispatch);
    }
  };
  return (
    <Fragment>
      <Dialog
        aria-labelledby="dialog-guide-book-map"
        scroll="body"
        maxWidth={'sm'}
        TransitionComponent={TransitionCustom}
        fullScreen={width === 'xs'}
        onClose={handleClose}
        open={open}
        classes={{ paper: classes.root, root: 'custom-zIndex-Dialog' }}>
        <DialogContent className={classes.boxContent}>
          <Typography variant="body1" className={classes.label}>
            Thông tin địa điểm
          </Typography>
          {!addressInput.length ? (
            <Grid item className={classes.margin}>
              <div data-standalone-searchbox="">
                <SearchPlaceCustom
                  setCoordinateMarker={setCoordinateMarker}
                  setDefaultCenter={setDefaultCenter}
                  setAddress={setAddress}
                  addressInput={addressInput}
                  startAdornment={
                    <InputAdornment position="start">
                      <RoomIcon />
                    </InputAdornment>
                  }
                />
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} className={classes.margin}>
              <TextField
                fullWidth
                variant="outlined"
                id="search-name"
                type="search"
                name="search"
                label="Tên địa điểm*"
                placeholder="Hồ Hoàn Kiếm"
                onChange={handleChangeName}
                onBlur={handleBlurName}
                value={addressTemp}
                inputProps={{ maxLength: 30 }}
                InputLabelProps={{
                  className: classes.multilineColor
                }}
              />
            </Grid>
          )}
          {addressInput.length ? (
            <Fragment>
              <Grid item xs={12} className={classes.margin}>
                <ValidatorForm
                  onSubmit={() => {
                    return null;
                  }}>
                  <TextValidator
                    fullWidth
                    id="distance"
                    name="distance"
                    label="Khoảng cách*"
                    placeholder="300"
                    validators={['required', 'isNumber']}
                    errorMessages={['Khoảng cách là bắt buộc', 'Khoảng cách là số nguyên']}
                    variant="outlined"
                    value={distance ? distance : ''}
                    onChange={handleChangeDistance}
                    InputLabelProps={{
                      className: classes.multilineColor
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                      endAdornment: (
                        <InputAdornment disableTypography position="end">
                          m
                        </InputAdornment>
                      )
                    }}
                  />
                </ValidatorForm>
              </Grid>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  name="description"
                  id="description"
                  value={description}
                  aria-label="minimum height"
                  rows={3}
                  rowsMax={5}
                  onChange={handleChangeDescription}
                  variant="outlined"
                  type="search"
                  multiline={true}
                  placeholder="Đây là điểm du lịch nổi tiếng, nhiều món ăn ngon,..."
                  label="Mô tả chi tiết"
                  InputLabelProps={{
                    className: classes.multilineColor
                  }}
                />
              </Grid>
            </Fragment>
          ) : (
            ''
          )}

          {!addressInput.length ? (
            <Fragment>
              <Grid item xs={12}>
                {coordinateMarker && coordinateMarker.lat && (
                  <MapWithAMarker
                    containerElement={<div style={{ height: `350px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    defaultCenter={defaultCenter}
                    coordinate={coordinateMarker}
                  />
                )}
              </Grid>
              <Link
                component="button"
                variant="body2"
                className={classes.cancelBtn}
                onClick={handleClose}>
                <Typography className={classes.textCancelBtn}>Cancel</Typography>
              </Link>
            </Fragment>
          ) : isUpdate ? (
            <ButtonGlobal
              className={classes.customBtnSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              width="auto"
              onClick={handleUpdatePlace}
              disabled={disableSubmit}>
              Cập nhật
            </ButtonGlobal>
          ) : (
            <Fragment>
              <Link
                component="button"
                variant="body2"
                className={classes.cancelBtn}
                onClick={handleBack}>
                <Typography className={classes.textCancelBtn}>Back</Typography>
              </Link>
              <ButtonGlobal
                className={classes.customBtnSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                width="auto"
                onClick={handleAddPlace}
                disabled={disableSubmit}>
                Thêm
              </ButtonGlobal>
            </Fragment>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DialogGuideBookMap;
