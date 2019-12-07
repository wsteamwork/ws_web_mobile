import SwitchLanguage from '@/components/Toolbar/SwitchLanguage';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Divider, List, ListItem, ListItemText, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { Dispatch, FC, Fragment, memo, SetStateAction, useContext } from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { compose } from 'recompose';

interface IProps {
  classes?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cookies: Cookies;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    list: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    },
    img: {
      width: '100%',
      backgroundPosition: 'center',
      maxHeight: 200,
      backgroundSize: 'cover',
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    signOut: {
      color: '#FFA712',
      fontSize: 16,
      lineHeight: '22px',
      letterSpacing: 'normal',
      fontWeight: 500,
      display: 'block',
      position: 'relative',
      textDecoration: 'none'
    },
    listItem: {
      padding: 0
    },
    listItemGutters: {
      paddingLeft: 24,
      paddingRight: 24
    },
    text: {
      fontSize: 16,
      lineHeight: '22px',
      letterSpacing: 'normal',
      fontWeight: 500,
      display: 'block',
      position: 'relative',
      textDecoration: 'none'
    },
    hotline: {
      fontWeight: 500
    },
    becomeHost: {
      textAlign: 'center',
      padding: '12px 20px',
      color: ' #FFFFFF',
      background: 'linear-gradient(to right, #FFC54D, #FFA712)',
      boxShadow: 'none',
      fontWeight: 500,
      borderRadius: '100px !important'
    }
  })
);

const SideDrawer: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { setOpen, cookies } = props;
  const { router } = useContext(GlobalContext);
  const isLogin = !!cookies.get('_token');
  const { t } = useTranslation();

  const logoutTrigger = () => {
    cookies.remove('_token', { path: '/' });
    setOpen(false);
    router.push('/');
  };

  return (
    <Fragment>
      <List className={classes.list}>
        <div className="top">
          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
            button>
            <SwitchLanguage />
          </ListItem>
          {/* <ListItem button {...to("/")} onClick={() => setOpen(false)}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            primary="Trang chủ"
            classes={{
              primary: classes.text
            }}
          />
        </ListItem> */}

          {isLogin ? (
            <Fragment>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                component="a"
                href="/"
                button
                onClick={() => setOpen(false)}>
                {/* <ListItemIcon>
                  <Home />
                </ListItemIcon> */}
                <ListItemText
                  primary={t('home:home')}
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                button
                onClick={() => setOpen(false)}
                href="/profile">
                {/* <ListItemIcon>
                <AccountCircle />
              </ListItemIcon> */}
                <ListItemText
                  primary={t('home:profile')}
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                button
                onClick={() => {
                  router.push(`${cookies.get('_token') ? '/host/room-list' : '/auth'}`);
                }}>
                <ListItemText
                  primary={t('home:becomeAHost')}
                  classes={{
                    primary: classes.text,
                    // root: classes.listItem
                  }}
                />
              </ListItem>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}>
                <ListItemText
                  primary={t('home:logout')}
                  onClick={logoutTrigger}
                  classes={{
                    primary: classes.signOut
                  }}
                />
              </ListItem>
            </Fragment>
          ) : (
              <Fragment>
                <ListItem
                  classes={{
                    gutters: classes.listItemGutters
                  }}
                  button
                  onClick={() => {
                    router.push('/auth');
                  }}>
                  <ListItemText
                    primary={t('home:signIn')}
                    classes={{
                      primary: classes.text
                    }}
                  />
                </ListItem>
                <ListItem
                  classes={{
                    gutters: classes.listItemGutters
                  }}
                  button
                  onClick={() => {
                    router.push('/auth');
                  }}>
                  <ListItemText
                    primary={t('home:signUp')}
                    classes={{
                      primary: classes.text
                    }}
                  />
                </ListItem>
                <ListItem
                  classes={{
                    gutters: classes.listItemGutters
                  }}
                  button
                  onClick={() => {
                    router.push(`${cookies.get('_token') ? '/host/room-list' : '/auth'}`);
                  }}>
                  <ListItemText
                    primary={t('home:becomeAHost')}
                    classes={{
                      primary: classes.text,
                      // root: classes.listItem
                    }}
                  />
                </ListItem>

              </Fragment>
            )}
        </div>

        <div className="bottom">

          {/* <ListItem
            button
            onClick={() => setOpen(false)}
            component="a"
            href="https://blog.westay.vn/"
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={t('home:blogContainer:blog')}
              classes={{
                primary: classes.text
              }}
            />
          </ListItem> */}

          <ListItem
            button
            component="a"
            onClick={() => setOpen(false)}
            href="/terms-and-conditions"
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={t('home:policyTerms')}
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>

          <Divider />

          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={
                <span>
                  Hotline <br />
                  <span className={classes.hotline}>0916 374 057</span>
                  <br />
                  <span className={classes.hotline}>0946 746 417</span>
                </span>
              }
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>
          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={
                <span>
                  {t('home:supportHost')} <br />
                  <span className={classes.hotline}>0917 041 849</span>
                </span>
              }
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>
        </div>
      </List>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withCookies,
  memo
)(SideDrawer);
