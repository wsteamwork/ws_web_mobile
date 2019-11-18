import { GlobalContext } from '@/store/Context/GlobalContext';
import { Avatar, Collapse, Divider, List, ListItem, ListItemText, Theme } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { Dispatch, FC, Fragment, memo, SetStateAction, useContext, useState } from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { compose } from "recompose";

interface IProps {
  classes?: any
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
    signOut: {
      color: '#FFA712',
      fontSize: 16,
      lineHeight: '22px',
      letterSpacing: 'normal',
      fontWeight: 600,
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
      fontWeight: 600,
      display: 'block',
      position: 'relative',
      textDecoration: 'none'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    bigAvatar: {
      alignSelf: 'center',
      borderRadius: '50%',
      width: 80,
      height: 80,
    },
  })
);

const SlideDrawerMerchant: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { setOpen, cookies } = props;
  const { router } = useContext(GlobalContext);
  const isLogin = !!cookies.get('_token');
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<boolean>(false);

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
            button
            onClick={() => setOpen(false)}
            href="/profile">
            <Avatar alt='Profile' src={'@/../../../static/images/room_demo.jpg'}
              className={classes.bigAvatar} />
          </ListItem>

          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
            button
            onClick={() => setOpen(false)}
            href="/">
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
            onClick={() => setOpen(false)}
            href="/host/booking-list">
            <ListItemText
              primary={'Danh sách booking'}
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
            onClick={() => setOpenItem(!openItem)}
          >
            <ListItemText
              primary={'Quản lý phòng'}
              classes={{
                primary: classes.text
              }}
            />
            {openItem ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openItem} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} href="/host/room-list">
                <ListItemText primary="Danh sách phòng" />
              </ListItem>
              <ListItem button className={classes.nested} href="/host/create-listing/basic">
                <ListItemText primary="Đăng phòng" />
              </ListItem>
            </List>
          </Collapse>

          {/* <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
            button
            onClick={() => setOpen(false)}
            href="/profile">
            <ListItemText
              primary={'Khuyến mãi'}
              classes={{
                primary: classes.text
              }}
            />
          </ListItem> */}
          {/* <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
            button
            onClick={() => setOpen(false)}
            href="/profile">
            <ListItemText
              primary={'Tin nhắn'}
              classes={{
                primary: classes.text
              }}
            />
          </ListItem> */}
        </div>
        <div className="bottom">
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
                  <span className={classes.hotline}>0916 374 057 - 0946 746 417</span>
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

          {isLogin ? (
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
          ) : (
              ''
            )}
        </div>
      </List>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withCookies,
  memo
)(SlideDrawerMerchant);
