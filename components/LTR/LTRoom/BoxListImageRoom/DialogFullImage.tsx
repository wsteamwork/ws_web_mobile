import GridContainer from '@/components/Layout/Grid/Container';
import { TransitionCustom } from '@/components/Rooms/BottomNav';
// import ScrollableAnchor from 'react-scrollable-anchor';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Dialog, DialogContent, DialogTitle, Grid, Hidden, IconButton, List, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
// import ScrollAnim from 'rc-scroll-anim';
import 'rc-scroll-anim/assets/index.css';
import React, { FC, Fragment, Ref, useMemo, useRef, useEffect } from 'react';
import { Element, Events, scroller } from 'react-scroll';

interface IProps {
  classes?: any,
  open: boolean,
  handleClose: () => void,
  livingrooms: ImagesRes,
  outdoors?: ImagesRes,
  furnitures?: ImagesRes,
  kitchens?: ImagesRes,
  bedrooms?: any,
  bathrooms?: any,
  refKit?: Ref<any>,
  idEl:string
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    dialogTitle: {
      borderBottom: '1px solid #eee',
      padding: '8px 16px'
    },
    dialogContent: {
      padding: '0px !important'
    },
    btClose: {
      padding: 8,
      position: 'absolute',
      top: '0.5%',
      zIndex: 9,
      right: '1%',
      [theme.breakpoints.only('sm')]: {
        right: '2%',
      },
      [theme.breakpoints.only('md')]: {
        right: '3%',
      },
    },
    iconClose: {
      width: '1.6rem',
      height: '1.6rem',
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative'
    },
    ul: {
      padding: 0,
      backgroundColor: '#fff',
    },
    images: {
      width: '100%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      borderRadius: 4,
      [theme.breakpoints.up('md')]: {
        height: 320,
      },
      // maxHeight: 320,
      objectFit: 'cover'
    },
    bigImage: {
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      width: '100%',
      borderRadius: 4,
      maxHeight: 500,
      height: 'auto',
      objectFit: 'cover',
      [theme.breakpoints.up('md')]: {
        height: 500,
      },
    },
    listSection: {
      backgroundColor: '#fff',
      margin: '0 0 32px'
    },
    subHeader: {
      top: '-2%',
      fontSize: '1.6rem',
      marginBottom: 16,
    },
    stikyMobi: {
      backgroundColor: '#fff',
      position: 'sticky',
      top: '0%',
    }
  })
);

const DialogFullImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms, refKit, idEl } = props;
  const outdoorRef = useRef(null);

  const scrollToWithDialog = useMemo(() => {
    let goToDialog = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-dialog-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToDialog.then(() =>
      scroller.scrollTo(idEl, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-dialog-container'
      }));
  },[]);
  
  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={TransitionCustom} >
      <DialogContent className={classes.dialogContent} id='scroll-dialog-container'>
        <IconButton className={classes.btClose} aria-label="Close" onClick={handleClose}>
          <CloseIcon className={classes.iconClose} />
        </IconButton>
        <GridContainer xs={11} sm={11} md={11} lg={10} xl={9}>
        
          <List className={classes.root} subheader={<li />}>
            <Element name='livingrooms'>
              {livingrooms && livingrooms.images && livingrooms.images.length ? (
                <li className={classes.listSection} >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} className={classes.stikyMobi} >
                      <Typography variant='h5'>Phòng khách</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <img src={IMAGE_STORAGE_LG + livingrooms.images[0].name} alt={livingrooms.images[0].caption} className={classes.bigImage} />
                          {/* <div className={classes.bigImage} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + livingrooms.images[0].name}")` }}></div> */}
                        </Grid>

                        {livingrooms.images.map((o, i) => {
                          if (i > 0) return (
                            <Grid item xs={12} sm={6} key={i}>
                              <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                              {/* <div className={classes.images} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + o.name}")` }}></div> */}
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </li>
              ) : <Fragment />}
            </Element>

            <Element name='bedrooms'>
              {_.times(bedrooms.number_bedroom, (i) => (
                <li className={classes.listSection} key={i}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.stikyMobi}>
                      <Typography variant='h5'>Phòng ngủ {i + 1}</Typography>
                    </Grid>
                    {
                      bedrooms[`bedroom_${i + 1}`] && bedrooms[`bedroom_${i + 1}`].images && bedrooms[`bedroom_${i + 1}`].images.length ? (
                        <Grid item xs={12} sm={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <img src={IMAGE_STORAGE_LG + bedrooms[`bedroom_${i + 1}`].images[0].name} alt={bedrooms[`bedroom_${i + 1}`].images[0].caption} className={classes.bigImage} />
                              {/* <div className={classes.bigImage} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + bedrooms[`bedroom_${i + 1}`].images[0].name}")` }}></div> */}
                            </Grid>

                            {bedrooms[`bedroom_${i + 1}`].images.map((o, i) => {
                              if (i > 0) return (
                                <Grid item xs={12} sm={6} key={i}>
                                  <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                                  {/* <div className={classes.images} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + o.name}")` }}></div> */}
                                </Grid>
                              )
                            })}
                          </Grid>
                        </Grid>) : ''
                    }
                  </Grid>
                </li>
              ))}
            </Element>
            <Element name='bathrooms'>
              {_.times(bathrooms.number_bathroom, (i) => (
                <li className={classes.listSection} key={i}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.stikyMobi}>
                      <Typography variant='h5'>Phòng tắm {i + 1}</Typography>
                    </Grid>

                  </Grid>
                </li>
              ))}
            </Element>
            <Element name='kitchens'>
              {kitchens && kitchens.images && kitchens.images.length ? (
                <li className={classes.listSection} ref={refKit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.stikyMobi}>
                      <Typography variant='h5'>Phòng bếp</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <img src={IMAGE_STORAGE_LG + kitchens.images[0].name} alt={kitchens.images[0].caption} className={classes.bigImage} />
                          {/* <div className={classes.bigImage} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + kitchens.images[0].name}")` }}></div> */}

                        </Grid>

                        {kitchens.images.map((o, i) => {
                          if (i > 0) return (
                            <Grid item xs={12} sm={6} key={i}>
                              <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                              {/* <div className={classes.images} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + o.name}")` }}></div> */}
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </li>
              ) : <Fragment />}
            </Element>
            <Element name='furnitures'>
              {furnitures && furnitures.images && furnitures.images.length ? (
                <li className={classes.listSection}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.stikyMobi}>
                      <Typography variant='h5'>Nội thất</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <img src={IMAGE_STORAGE_LG + furnitures.images[0].name} alt={furnitures.images[0].caption} className={classes.bigImage} />
                          {/* <div className={classes.bigImage} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + furnitures.images[0].name}")` }}></div> */}


                        </Grid>

                        {furnitures.images.map((o, i) => {
                          if (i > 0) return (
                            <Grid item xs={12} sm={6} key={i}>
                              <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                              {/* <div className={classes.images} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + o.name}")` }}></div> */}

                            </Grid>
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </li>
              ) : <Fragment />}
            </Element>

            <Element name='outdoors'>
              {outdoors && outdoors.images && outdoors.images.length ? (
                <li className={classes.listSection} ref={outdoorRef}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.stikyMobi}>
                      <Typography variant='h5'>Môi trường xung quanh</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <img src={IMAGE_STORAGE_LG + outdoors.images[0].name} alt={outdoors.images[0].caption} className={classes.bigImage} />
                          {/* <div className={classes.bigImage} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + outdoors.images[0].name}")` }}></div> */}

                        </Grid>

                        {outdoors.images.map((o, i) => {
                          if (i > 0) return (
                            <Grid item xs={12} sm={6} key={i}>
                              <img src={IMAGE_STORAGE_LG + o.name} alt={o.caption} className={classes.images} />
                              {/* <div className={classes.images} style={{ backgroundImage: `url("${IMAGE_STORAGE_LG + o.name}")` }}></div> */}

                            </Grid>
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </li>
              ) : <Fragment />}
            </Element>
          </List>
        
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFullImage;
