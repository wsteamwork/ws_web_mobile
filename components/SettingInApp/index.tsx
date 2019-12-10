import React, { Fragment, FC, useContext, memo } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  Grid,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction, IconButton, Divider
} from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import { useCookies, withCookies, Cookies } from 'react-cookie';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { compose } from "recompose";
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';

interface IProps {
  classes?: any,
  cookies?: Cookies;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    txtName: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 22,
      lineHeight: '34px',
      color: '#252529'
    },
    bigAvatar: {
      width: 90,
      height: 90
    },
    imgFlag:{
      width: 30,
      height: 30,
    },
    chooseFlag:{
      border:'4px solid #54D3C2',
      borderRadius: '50%',
    },
    iconAction:{
      right: 0
    }
  })
);

const SettingInApp: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {cookies}      = props;
  const { t, i18n }: UseTranslationResponse = useTranslation();
  const [cookiesLanguage, setCookieLanguage] = useCookies(['initLanguage']);
  const { router } = useContext(GlobalContext);
  const isLogin = !!cookies.get('_token');
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  const handleChangeVN = () => {
    i18n.changeLanguage('vi');
    setCookieLanguage('initLanguage', 'vi', { maxAge: 2147483647, path: '/' });
  };

  const handleChangeEN = () => {
    i18n.changeLanguage('en');
    setCookieLanguage('initLanguage', 'en', { maxAge: 2147483647, path: '/' });
  };

  const logoutTrigger = () => {
    cookies.remove('_token', { path: '/' });
    router.push('/');
  };

  const arraySetting = [
    {
      name: t('home:changePassword'),
      icon: '/static/icons/Lock.svg',
      action: ()=>{alert('Dialog Change Password')},
    },
    {
      name: isLogin ? t('home:merchantChannelLogin') : t('home:becomeAHost'),
      icon: '/static/icons/becomehost.svg',
      action: ()=>{router.push(`${isLogin ? '/host/room-list' : '/auth'}`)},
    },
    {
      name: t('home:policyTerms'),
      icon: '/static/icons/Help.svg',
      action: ()=>{router.push('/terms-and-conditions')},
    },
    {
      name: 'Hotline 1: 0916 374 057',
      icon: '/static/icons/telephone.svg',
      action: ()=>{window.location.href="tel:0916374057"},
    },
    {
      name: 'Hotline 2: 0946 746 417',
      icon: '/static/icons/telephone.svg',
      action: ()=>{window.location.href="tel:0946746417"},
    },
    {
      name: `${t('home:supportHost')}: 0917 041 849`,
      icon: '/static/icons/telephone.svg',
      action: ()=>{window.location.href="tel:0917041849"},
    },
  ];

  const imgAvatar = isLogin ? `${IMAGE_STORAGE_SM}${profile.avatar}` : '@/../../../static/images/westay-avatar.jpg';

  return (
    <GridContainer xs = {10} sm = {9}>
      <Box my = {6}>
        <Grid container alignItems = 'center' spacing={1}>
          <Grid item xs = {8}>
            {!isLogin ? (
              <Fragment>
                <Typography variant = 'h5' className = {classes.txtName}>{profile.name}</Typography>
                <Typography variant = 'subtitle1'>{t('home:editProfile')}</Typography>
              </Fragment>
            ) : (
              <Fragment>
                <Typography variant = 'h5' className = {classes.txtName} onClick={()=>{alert('trang dang nhap')}}>{t('home:signUp/signIn')}</Typography>
                <Typography variant = 'subtitle1'>{t('home:letSignUp')}</Typography>
              </Fragment>
            )}
          </Grid>
          <Grid item xs = {4} container justify = 'flex-end'>
            <Avatar alt = 'Profile' src = {imgAvatar} className = {classes.bigAvatar} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <List>

          <ListItem disableGutters>
            <ListItemText
              primary = {t('home:language')}
            />
            <ListItemSecondaryAction classes={{root: classes.iconAction}}>
              <IconButton edge = 'end' onClick={handleChangeVN}
                          classes={{label: cookiesLanguage.initLanguage === 'vi' ? classes.chooseFlag : ''}}>
                <img src = {'/static/images/flagVN.svg'} className={classes.imgFlag} />
              </IconButton>
              <IconButton edge = 'end' onClick={handleChangeEN}
                          classes={{label: cookiesLanguage.initLanguage === 'en' ? classes.chooseFlag : ''}}>
                <img src = {'/static/images/flagEN.svg'} className={classes.imgFlag}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Box mt={1 + 1/2} mb={2}>
            <Divider />
          </Box>

          {arraySetting.map((o,i)=>(
            <Fragment key={i}>
              <ListItem button onClick={o.action} disableGutters>
                <ListItemText
                  primary = {o.name}
                />
                <ListItemSecondaryAction classes={{root: classes.iconAction}}>
                  <IconButton edge = 'end'>
                    <img src = {o.icon} width = {22} height = {22} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <Box mt={1 + 1/2} mb={2}>
                <Divider />
              </Box>
            </Fragment>
          ))}

          {isLogin ? (
            <ListItem button onClick={()=>logoutTrigger()} disableGutters>
              <ListItemText
                primary = {t('home:logout')}
              />
              <ListItemSecondaryAction classes={{root: classes.iconAction}}>
                <IconButton edge = 'end'>
                  <img src = {'/static/icons/shut-down.svg'} width = {22} height = {22} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ) : <Fragment/>}
        </List>
      </Box>
    </GridContainer>
  );
};
export default compose<IProps, any>(
  withCookies,
)(SettingInApp);
