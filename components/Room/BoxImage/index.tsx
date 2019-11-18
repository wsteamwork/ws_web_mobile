import GridContainer from '@/components/Layout/Grid/Container';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import FavoriteAnimation from '@/components/Rooms/Lotte/FavoriteAnimation';
// import { handleCompareList } from '@/components/Rooms/RoomCardListing';
// import SnackBarCompareRoom from '@/components/Toolbar/SnackBarCompareRoom';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
// import { CompareRoomsActions } from '@/store/Redux/Reducers/Room/CompareRooms';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { IMAGE_STORAGE_LG, IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Button, Grid, Theme, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { FC, forwardRef, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useSelector } from 'react-redux';
import '../../../styles/pages/room/boxImage/index.scss';

interface IProps {
  classes?: any;
  isPreview?: boolean;
}

const Transition = forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      margin: '32px 0'
    },
    imgRoom: {
      // maxHeight: '60vh',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      MozTransition: 'all 0.5s',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s',
      '&:hover': {
        MsTransform: 'scale(1.008)' /* IE  */,
        WebkitTransform: 'scale(1.008)' /* Safari */,
        transform: 'scale(1.008)'
      },
    },
    parallaxContainer: {
      width: '100%',
      borderRadius: 4
    },
    contentParallax: {
      display: 'flex',
      justifyContent: 'center',
      height: '55vh',
      [theme.breakpoints.down('xs')]: {
        height: '30vh',
      },
      position: 'relative',
      borderRadius: 4,
      overflow: 'hidden'
    },
    insideParalax: {
      position: 'absolute',
      padding: 12,
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      textAlign: 'center'
      // backgroundColor: 'rgba(255, 255, 255, 0.95)',
      // borderRadius: 8,
      // boxShadow: '2px 4px 17px 0px rgba(0,0,0,0.3)',
      // display: 'initial',
    },
    button: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      textTransform: 'none',
      padding: '8px 12px'
    },
    iconScope: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(0),
      }
    },
    dialog: {
      // maxHeight:'100vh'
    },
    dialogTitle: {
      padding: theme.spacing(3),
      position: 'relative'
    },
    dialogContent: {
      [theme.breakpoints.down('sm')]: {
        padding: 0
      }
    },
    btClose: {
      right: '4%',
      position: 'absolute',
      margin: '0 auto',
      top: '50%',
      transform: 'translateY(-50%)',
      opacity: 1,
      transition: ' opacity 150ms ease-in-out 0s, transform 150ms ease-in-out 0s'
    },
    iconClose: {
      width: '2rem',
      height: '2rem'
    },
    roomName: {
      textAlign: 'center',
      width: '80%',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
    },
    boxHeart: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 'auto',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: 4
    },
    iconCompare: {
      color: '#d64d57',
      padding: 6,
      fontSize: '1.15rem',
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      width: 60,
      height: 60,
    },
    boxSnackBar: {
      backgroundColor: '#fff',
      color: '#323232'
    }
  })
);

const BoxImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { isPreview } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  // const dispatch = useDispatch<Dispatch<CompareRoomsActions>>();
  // const comparisonList = useSelector<ReducersList, RoomIndexRes[]>(
  //   (state) => state.compareRooms.compareRooms
  // );
  // const [openCompare, setOpenCompare] = useState<boolean>(false);

  const handleClick = () => {
    if (isPreview && room.media.data.length === 0) {
      setOpenDialog(false);
    } else {
      setOpenDialog(!openDialog);
    }
  };

  // const handldeSnackBar = () => {
  //   setOpenCompare(!openCompare);
  // };

  // const handleCompare = () => {
  //   handleCompareList(comparisonList, room, dispatch);
  //   handldeSnackBar();
  // };

  const images = room
    ? _.map(room.media.data, (o) => {
      return {
        original: `${IMAGE_STORAGE_LG}${o.image}`,
        thumbnail: `${IMAGE_STORAGE_SM}${o.image}`
      };
    })
    : [];

  if (room === null) {
    return <ContentPlaceHolder />;
  }

  return (
    <GridContainer xs={12} className={classes.root}>
      {/*<Parallax*/}
      {/*  bgImage={`${IMAGE_STORAGE_LG + room.media.data[0].image}`}*/}
      {/*  strength={300}*/}
      {/*  bgClassName={classes.imgRoom}*/}
      {/*  className={classes.parallaxContainer}*/}
      {/*  contentClassName={classes.contentParallax}>*/}
      {/*  <div className={classes.insideParalax}>*/}
      {/*    <Button variant="contained" className={classes.button} onClick={handleClick}>*/}
      {/*      <img*/}
      {/*        src="../../../static/images/telescope.svg"*/}
      {/*        alt="iconScope"*/}
      {/*        className={classes.iconScope}*/}
      {/*      />*/}
      {/*      {width === 'sm' || width === 'xs' ? '' : 'Thăm quan căn hộ'}*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</Parallax>*/}

      <div className={classes.contentParallax}>
        <img
          src={isPreview && room.media.data.length === 0 ? '/static/images/image-room-default.png' : `${IMAGE_STORAGE_LG}${room.media && room.media.data.length ? room.media.data[0].image : room.avatar_image}`}
          alt={isPreview && !room.details.data[0].name ? t('room:updateRoomName') : room.details.data[0].name}
          className={classes.imgRoom}
          onClick={handleClick}
        />
        <div className={classes.insideParalax}>
          <Button variant="contained" className={classes.button} onClick={handleClick} disabled={isPreview && room.media.data.length === 0}>

            {width === 'sm' || width === 'xs' ? t('room:imageRoom') :
              <img
                src="../../../static/images/telescope.svg"
                alt="iconScope"
                className={classes.iconScope}
              />
            }

            {width === 'sm' || width === 'xs' ? '' : t('room:viewPhotos')}
          </Button>
        </div>
        <div className={classes.boxHeart}>
          {/* <Hidden smDown>
            <IconButton aria-label="compare" className={classes.iconCompare} onClick={handleCompare}>
              <FontAwesomeIcon size='1x' icon={faBalanceScaleRight} />
            </IconButton>
          </Hidden> */}
          <FavoriteAnimation />
        </div>
      </div>

      <Dialog
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        scroll="body"
        fullScreen={true}
        maxWidth="xs"
        className={classes.dialog}
        open={openDialog}
        onClose={handleClick}>
        <Grid>
          <DialogTitle className={classes.dialogTitle}>
            <Grid>
              <Typography variant="h4" className={classes.roomName}>
                {isPreview && !room.details.data[0].name ? t('room:updateRoomName') : room.details.data[0].name}
              </Typography>

              <IconButton className={classes.btClose} aria-label="Close" onClick={handleClick}>
                <CloseIcon className={classes.iconClose} />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <GridContainer xs={11} sm={11} md={11} lg={10} xl={9}>
              <ImageGallery
                items={images}
                lazyLoad={true}
                showPlayButton={false}
                showIndex={true}
              />
            </GridContainer>
          </DialogContent>
        </Grid>
      </Dialog>

      {/* <SnackBarCompareRoom open={openCompare} onClose={() => handldeSnackBar()} /> */}

    </GridContainer>
  );
};

export default BoxImage;
