/*global google*/
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { OutlinedInput, Snackbar } from '@material-ui/core';
import React, { FC, Fragment, SyntheticEvent, useRef, useState } from 'react';

interface IProps {
  setCoordinateMarker: any;
  setDefaultCenter: any;
  setAddress: any;
  addressInput: string;
  startAdornment?: React.ReactNode;
}

let autocomplete = null;

const SearchPlaceCustom: FC<IProps> = (props) => {
  const { setCoordinateMarker, setDefaultCenter, setAddress, addressInput, startAdornment } = props;
  const loaded = useRef(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [addresStemp, setAddressTemp] = useState<string>(addressInput);
  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  const handleScriptLoad = () => {
    const inputEl = document.getElementById('standalone-search-box');
    if (typeof google === 'object' && typeof google.maps === 'object') {
      autocomplete = new (window as any).google.maps.places.Autocomplete(
        inputEl as HTMLInputElement
      );
      autocomplete.setComponentRestrictions({ country: 'vn' });
      autocomplete.setFields([
        'formatted_address',
        'address_components',
        'geometry',
        'icon',
        'name'
      ]);
      autocomplete.addListener('place_changed', () => {
        const placeInfo = autocomplete.getPlace();
        const location = placeInfo.geometry.location;
        setAddressTemp(placeInfo.formatted_address)
        setAddress(placeInfo.formatted_address);
        setCoordinateMarker({
          lat: location.lat(),
          lng: location.lng()
        });
        setDefaultCenter({
          lat: location.lat(),
          lng: location.lng()
        });
      });
    }
  };

  const loadGoogleMapScript = (url: string, position: HTMLElement | null, id: string) => {
    if (!position) return;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', '');
    scriptTag.setAttribute('id', id);
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.addEventListener('load', handleScriptLoad);
    scriptTag.src = url;
    position.appendChild(scriptTag);
  };

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadGoogleMapScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=geometry,places`,
        document.querySelector('head'),
        'google-maps-api'
      );
    }

    loaded.current = true;
  }

  return (
    <Fragment>
      <OutlinedInput
        onPaste={(e) => {
          setOpenSnack(true);
          e.preventDefault();
        }}
        type="text"
        placeholder="Nhập địa chỉ"
        startAdornment={startAdornment}
        inputProps={{ id: 'standalone-search-box' }}
        value={addresStemp}
        onChange={(e) => {
          setAddressTemp(e.target.value);
        }}
        // onBlur={() => setAddress(addresStemp)}
        labelWidth={0}
        fullWidth
      />
      <Snackbar
        style={{
          zIndex: 100000
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={openSnack}
        autoHideDuration={3000}>
        <MySnackbarContentWrapper
          variant={'warning'}
          message={'Copy/Paste không có hiệu lực cho mục này'}
          onClose={handleCloseSnack}></MySnackbarContentWrapper>
      </Snackbar>
    </Fragment>
  );
};

export default SearchPlaceCustom;
