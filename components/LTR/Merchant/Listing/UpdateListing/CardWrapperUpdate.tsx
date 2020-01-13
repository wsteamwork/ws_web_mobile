import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, createStyles, Snackbar, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';

interface IProps {
  handleSave?: any;
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
      marginBottom: theme.spacing(18)
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

const CardWrapperUpdate: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { handleSave, disabledSave, children, openSnack, handleCloseSnack, messageSnack, statusSnack, widthMd, widthLg } = props;
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const [isBottom, setIsBottom] = useState<boolean>(true);
  const handleBack = () => {
    router.push(`/host/update-listing/${id}`);
  };
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
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={9} md={widthMd} lg={widthLg} className={classes.root}>
          {children}
        </Grid>
        <Grid
          item
          xs={11}
          sm={9}
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
              <span>Quay lại</span>
            </Button>
          </Grid>
          <Grid>
            <Button
              className={classes.buttonSave}
              size="large"
              onClick={handleSave}
              disabled={disabledSave}>
              Lưu
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
CardWrapperUpdate.defaultProps = {
  disabledSave: false,
  statusSnack: "success",
  widthLg: 5,
  widthMd: 7
};
export default CardWrapperUpdate;
