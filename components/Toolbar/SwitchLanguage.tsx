// @ts-ignore
import flagEN from '@/static/images/flagEN.svg';
// @ts-ignore
import flagVN from '@/static/images/flagVN.svg';
import { Avatar, Button, Chip, Fade, ListItemIcon, ListItemText, MenuItem, Theme } from '@material-ui/core';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Fragment, FunctionComponent, MouseEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { compose } from 'recompose';


interface IProps {
  classes?: any;
}

const styles: any = (theme: Theme) =>
  createStyles({
    chip: {
      backgroundColor: '#f1f1f1',
      fontWeight: 600,
      cursor: 'pointer'
    },
    img: {
      width: 24,
      height: 24,
      marginLeft: 4
    },
    btnSwitch: {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  });

export const StyledMenu = withStyles({
  paper: {
    border: '1px solid #ebeef5',
    boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)'
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    TransitionComponent={Fade}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const SwitchLanguage: FunctionComponent<IProps> = (props) => {
  const { classes } = props;
  const { t, i18n }: UseTranslationResponse = useTranslation();
  const [cookiesLanguage, setCookieLanguage, removeCookieLanguage] = useCookies(['initLanguage']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleSwitch(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleChangeVN = () => {
    i18n.changeLanguage('vi');
    setCookieLanguage('initLanguage', 'vi', { maxAge: 2147483647, path: '/' });
    setAnchorEl(null);
    // reload browser
    process.browser && location.reload();
  };

  const handleChangeEN = () => {
    i18n.changeLanguage('en');
    setCookieLanguage('initLanguage', 'en', { maxAge: 2147483647, path: '/' });
    setAnchorEl(null);
    //reload browser
    process.browser && location.reload();
  };

  return (
    <Fragment>
      <Button onClick={handleSwitch} className={classes.btnSwitch}>
        <Chip
          avatar={
            <Avatar
              src={cookiesLanguage.initLanguage === 'en' ? flagEN : flagVN}
              className={classes.img}
            />
          }
          label={t('home:currency')}
          // onDelete={handleSwitch}
          // deleteIcon={<IconLanguage />}
          className={classes.chip}
        />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem onClick={handleChangeVN}>
          <ListItemIcon>
            <Avatar src={flagVN} className={classes.img} />
          </ListItemIcon>
          <ListItemText primary="Tiếng Việt - VND" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleChangeEN}>
          <ListItemIcon>
            <Avatar src={flagEN} className={classes.img} />
          </ListItemIcon>
          <ListItemText primary="English - USD" />
        </StyledMenuItem>
      </StyledMenu>
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles))(SwitchLanguage);
