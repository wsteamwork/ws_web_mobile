import FormForgetPassword from '@/components/Auth/ForgetPassword/FormForgetPassword/ForgetPasswordForm';
import FormSignin from '@/components/Auth/Signin/FormSignin';
import FormSignup from '@/components/Auth/Signup/FormSignup';
import GridContainer from '@/components/Layout/Grid/Container';
import NextHead from '@/components/NextHead';
import NavHeader from '@/components/Toolbar/NavHeader';
import { Button, Fade, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { FC, Fragment, useState } from 'react';

interface IProps { };

const useStyles = makeStyles((theme: Theme) => ({
  authContainer: {
    background: '#eaeaea',
    width: '100%',
    height: '100vh'
  },
  formAuthContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '3vh',
    },
  }
}));

const Auth: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [authComponent, setAuthComponent] = useState(0);

  const switchAuthComponent = (param: number) => {
    setAuthComponent(param)
  }

  return (
    <Fragment>
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/signup"
        ogImage="/static/images/Bg_home.4023648f.jpg"></NextHead>

      <NavHeader></NavHeader>

      <GridContainer xs={11} md={8} lg={6} spacing={2} className={classes.authContainer}>
        <Grid container className={classes.formAuthContainer}>
          <Grid item container justify="center" alignItems="center" xs={12} md={5} style={{ borderRadius: '8px 0 0 8px', backgroundImage: 'url(https://image.freepik.com/free-vector/bokeh-effect-gradient-background_23-2148364520.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Grid container>
              <Grid item xs={4} md={12} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <Button fullWidth onClick={() => switchAuthComponent(0)} style={{ color: `${authComponent == 0 ? 'black' : 'white'}`, borderRadius: '0', height: 50, background: `${authComponent == 0 ? 'white' : 'transparent'}`, boxShadow: 'none' }} variant="contained">Sign in</Button>
              </Grid>
              <Grid item xs={4} md={12} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <Button fullWidth onClick={() => switchAuthComponent(1)} style={{ color: `${authComponent == 1 ? 'black' : 'white'}`, borderRadius: '0', height: 50, background: `${authComponent == 1 ? 'white' : 'transparent'}`, boxShadow: 'none' }} variant="contained">Sign Up</Button>
              </Grid>
              <Grid item xs={4} md={12} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <Button fullWidth onClick={() => switchAuthComponent(2)} style={{ color: `${authComponent == 2 ? 'black' : 'white'}`, borderRadius: '0', height: 50, background: `${authComponent == 2 ? 'white' : 'transparent'}`, boxShadow: 'none' }} variant="contained">Forget Password</Button>
              </Grid>
            </Grid>
          </Grid>
          <Fade in={authComponent == 0} timeout={3000}>
            <Fragment>
              {
                authComponent == 0 &&
                <FormSignin></FormSignin>
              }
              {
                authComponent == 1 &&
                <FormSignup></FormSignup>
              }
              {
                authComponent == 2 &&
                <FormForgetPassword></FormForgetPassword>
              }
            </Fragment>
          </Fade>
        </Grid>

      </GridContainer>
    </Fragment>
  )
}
export default Auth;