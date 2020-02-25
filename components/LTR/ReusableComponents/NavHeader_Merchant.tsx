import SlideDrawerMerchant from '@/components/LTR/ReusableComponents/SlideDrawerMerchant';
import Logo from '@/components/Toolbar/Logo';
import SwitchLanguage, { StyledMenu, StyledMenuItem } from '@/components/Toolbar/SwitchLanguage';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { AppBar, Avatar, Button, Grid, Hidden, IconButton, ListItemText, SwipeableDrawer, Theme, Toolbar, Tooltip, Zoom } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import PolicyIcon from '@material-ui/icons/GavelRounded';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import IconMenu from '@material-ui/icons/MenuRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, MouseEvent, useContext, useState } from 'react';
import { withCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { compose } from "recompose";
import Cookies from 'universal-cookie';
interface IProps {
  classes?: any,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    btnPolicy: {
      borderRadius: 4,
      color: '#74788d',
      textTransform: 'initial'
    },
    avatar: {
      alignSelf: 'center',
      borderRadius: '50%',
      cursor: 'pointer'
    },
    divActions: {
      display: 'flex',
      alignItems: 'center'
    },
    IconExit: {
      backgroundColor: '#FAE4FA',
      color: '#FD27EB',
      borderRadius: '50%',
      padding: 8,
      '&:hover': {
        background: '#FD27EB',
        color: '#fff'
      }
    },
    IconPolicy: {
      backgroundColor: '#DCEEF2',
      color: '#1DC9B7',
      borderRadius: '50%',
      padding: 8,
      '&:hover': {
        background: '#1DC9B7',
        color: '#fff'
      }
    },
    grow: {
      flexGrow: 1,
      marginLeft: '20px',
      [theme.breakpoints.only('xs')]: {
        marginLeft: 0
      }
    },
    drawer: {
      [theme.breakpoints.only('xs')]: {
        width: '80%'
      },
      width: '60%'
    },

  })
);

const NavHeader_Merchant: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const cookies = new Cookies();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  function handleSwitch(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const openLink = (url: string) => {
    router.push(url);
    setAnchorEl(null);
  };

  const logoutTrigger = () => {
    router.push('/');
    cookies.remove('_token', {
      path: '/'
    });
  };

  return (
    <div style={{ backgroundColor: '#F9F9FC' }}>
      <Grid container item xs={12}>
        <AppBar
          elevation={0}
          position='static'
          style={{ backgroundColor: '#F9F9FC' }}
        >
          <Toolbar className={classes.toolbar}>
            <Hidden smDown>
              <Grid container justify='space-between' alignItems='center'>
                <Grid item>
                  <Logo href="https://westay.vn" />
                </Grid>
                <Grid item>
                  <Grid container spacing={2} alignItems='center' justify='space-around'>
                    <Grid item>
                      <Button onClick={() => openLink('/host/booking-list')} className={classes.btnPolicy}>
                        {t('host:bookingList')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.btnPolicy} onClick={handleSwitch}>
                        {t('host:roomList')}
                        <ArrowDown />
                      </Button>

                      <StyledMenu
                        id='customized-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <StyledMenuItem onClick={() => openLink('/host/room-list')}>
                          <ListItemText primary={`${t('host:roomList')}`} />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={() => openLink('/host/building-list')}>
                          <ListItemText primary={`${t('host:buildingList')}`} />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={() => openLink('/host/create-listing/type-accommodation')}>
                          <ListItemText primary={`${t('host:createListing')}`} />
                        </StyledMenuItem>
                      </StyledMenu>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => openLink('/host/building-list')} className={classes.btnPolicy}>
                        {t('host:buildingList')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => openLink('/host/create-listing/type-accommodation')} className={classes.btnPolicy}>
                        {t('host:createListing')}
                      </Button>
                    </Grid>
                    {/* <Grid item>
                      <Button href={'#'} className={classes.btnPolicy}>
                        Tin nhắn
                      </Button>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2} alignItems='center' justify='flex-end'>
                    <Grid item>
                      <SwitchLanguage />
                    </Grid>
                    <Grid item>
                      <Tooltip TransitionComponent={Zoom} title='Chính sách và điều khoản'>
                        <IconButton onClick={() => openLink('/terms-and-conditions')} color='primary' className={classes.IconPolicy} aria-label='Policy'>
                          <PolicyIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip TransitionComponent={Zoom} title='Đăng xuất'>
                        <IconButton onClick={logoutTrigger} color='primary' className={classes.IconExit} aria-label='Logout'>
                          <ExitToAppIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip TransitionComponent={Zoom} title='Thông tin cá nhân'>
                        <Avatar alt='Profile' src={'@/../../../static/images/room_demo.jpg'}
                          className={classes.avatar} onClick={() => openLink('/profile')} />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Logo />
              <div className={classes.grow} />
              <IconMenu onClick={() => setOpenDrawer(true)} />

              <SwipeableDrawer
                disableSwipeToOpen
                open={openDrawer}
                onOpen={() => setOpenDrawer(true)}
                onClose={() => setOpenDrawer(false)}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
                classes={{
                  paper: classes.drawer
                }}>
                <SlideDrawerMerchant setOpen={setOpenDrawer} />
              </SwipeableDrawer>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default compose<IProps, any>(
  withCookies
)(NavHeader_Merchant);
