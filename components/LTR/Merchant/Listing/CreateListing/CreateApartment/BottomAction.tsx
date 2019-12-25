import { GlobalContext } from '@/store/Context/GlobalContext';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, createStyles, Theme, Snackbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FC, useContext, useEffect, useState, Fragment } from 'react';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { useTranslation } from 'react-i18next';

interface IProps {
  handleSave?: any;
  handleBack?: any;
  disabledSave?: boolean;
  children?: any;
  openSnack?: boolean;
  handleCloseSnack?: any;
  messageSnack?: string;
  statusSnack?: any;
  widthMd?: any;
  widthLg?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(18),
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'fixed',
      alignItems: 'center',
      bottom: 0,
      width: '100%',
      borderTop: '1px solid lightgrey',
      padding: '24px 0',
      zIndex: 100,
      backgroundColor: '#ffffff'
    },
    boxShadow: {
      boxShadow: '0px -9px 10px -7px rgba(0, 0, 0, 0.1) !important'
    },
    buttonBack: {
      fontSize: 17,
      textTransform: 'initial',
      paddingLeft: 0,
      color: '#1d8df7',
      '&:hover': {
        backgroundColor: '#ffffff',
        textDecoration: 'underline'
      }
    },
    icon: {
      marginRight: 5
    },
    buttonSave: {
      fontSize: 17,
      textTransform: 'initial',
      color: '#ffffff',
      backgroundColor: '#1d8df7',
      '&:hover': {
        color: '#ffffff',
        backgroundColor: '#1d8df7'
      }
    }
  })
);

const BottomAction: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { handleSave, disabledSave, handleBack, openSnack, handleCloseSnack, messageSnack, statusSnack , widthMd, widthLg } = props;
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const [isBottom, setIsBottom] = useState<boolean>(true);
  useEffect(() => {
    window.onscroll = (ev) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsBottom(false);
      } else {
        setIsBottom(true);
      }
    };
  }, []);
  return (
    <Fragment>
      <Grid container>
        <Grid
          item
          xs={10}
          sm={11}
          md={widthMd}
          lg={widthLg}
          className={classNames(classes.wrapper, isBottom ? classes.boxShadow : '')}>
          <Grid>
            <Button onClick={handleBack} size="large" className={classes.buttonBack}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="1x"
                color="#1d8df7"
                className={classes.icon}></FontAwesomeIcon>
              <span>{t('host:back')}</span>
            </Button>
          </Grid>
          <Grid>
            <Button
              className={classes.buttonSave}
              size="large"
              onClick={handleSave}
              disabled={disabledSave}>
              {t('host:save')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}>
        <MySnackbarContentWrapper
          variant={statusSnack}
          message={messageSnack}
          onClose={handleCloseSnack}></MySnackbarContentWrapper>
      </Snackbar>
    </Fragment>
  );
};
BottomAction.defaultProps = {
  disabledSave: false,
  statusSnack: "success",
  widthLg: 5,
  widthMd: 7
};
export default BottomAction;
