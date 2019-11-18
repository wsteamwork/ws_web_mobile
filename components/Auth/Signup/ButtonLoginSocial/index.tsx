import React from 'react';
import { Grid, FormControl } from '@material-ui/core';
import ButtonGoogle from './ButtonGoogle';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import { ReactFacebookLoginInfo } from 'react-facebook-login';
import ButtonFacebook from './ButtonFacebook';

const ButtonLoginSocial = () => {
  // const responseFacebook = (userInfo: ReactFacebookLoginInfo) => {};
  const responseFacebook = () => { };

  return (
    <Grid item xs={12} container spacing={2}>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <ButtonGoogle></ButtonGoogle>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <FacebookLogin
            appId="1088597931155576"
            fields="name,email,picture"
            callback={responseFacebook}
            cookie
            render={(props) => <ButtonFacebook onClick={props.onClick}></ButtonFacebook>}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ButtonLoginSocial;
