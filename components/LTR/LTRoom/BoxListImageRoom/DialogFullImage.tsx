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
import React, { FC, Fragment, Ref } from 'react';

interface IProps {
  classes?: any,
  open: boolean,
  handleClose: () => void,
  livingrooms: ImagesRes,
  outdoors?: ImagesRes,
  furnitures?: ImagesRes,
  kitchens?: ImagesRes,
  cover_photo?: ImagesRes,
  bedrooms?: any,
  bathrooms?: any,
  roomName: string,
  refKit?: Ref<any>
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    dialogTitle: {
      borderBottom: '1px solid #eee'
    },
    dialogContent: {

    },
    btClose: {
      marginLeft: 16,
      padding: 8,
    },
    iconClose: {
      width: '1.6rem',
      height: '1.6rem',
    },
    roomName: {
      textAlign: 'right',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
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
      maxHeight: 320,
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
      margin: '64px 0'
    },
    subHeader: {
      top: '-2%',
      fontSize: '1.6rem',
      marginBottom: 16,
    },
    titleSticky: {
      position: 'sticky',
      top: '5%',
    },
    stikyMobi: {
      backgroundColor: '#fff',
      [theme.breakpoints.down('sm')]: {
        position: 'sticky',
        top: '-1.1%',
      }
    }
  })
);

// const Link = ScrollAnim.Link;
// const Element = ScrollAnim.Element;

const DialogFullImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms, cover_photo, roomName, refKit } = props;
  // console?
  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={TransitionCustom}>
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Grid container alignItems='center'>
          <Hidden smDown>
            <Grid item xs>
              <Typography variant="h6" className={classes.roomName}>
                {roomName}
              </Typography>
            </Grid>
          </Hidden>
          <Grid item>
            <IconButton className={classes.btClose} aria-label="Close" onClick={handleClose}>
              <CloseIcon className={classes.iconClose} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <GridContainer xs={11} sm={11} md={11} lg={10} xl={9}>
          <List className={classes.root} subheader={<li />}>

            {livingrooms && livingrooms.images && livingrooms.images.length ? (
              <li className={classes.listSection}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} className={classes.stikyMobi} >
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>Phòng khách</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
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

            {_.times(bedrooms.number_bedroom, (i) => (
              <li className={classes.listSection} key={i}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>Phòng ngủ {i + 1}</Typography>
                    </div>
                  </Grid>
                  {
                    bedrooms[`bedroom_${i + 1}`] && bedrooms[`bedroom_${i + 1}`].images && bedrooms[`bedroom_${i + 1}`].images.length ? (
                      <Grid item xs={12} sm={12} md={9}>
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

            {_.times(bathrooms.number_bathroom, (i) => (
              <li className={classes.listSection} key={i}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>Phòng tắm {i + 1}</Typography>
                    </div>
                  </Grid>
                  
                </Grid>
              </li>
            ))}

            {kitchens && kitchens.images && kitchens.images.length ? (
              <li className={classes.listSection} ref={refKit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>Phòng bếp</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
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

            {furnitures && furnitures.images && furnitures.images.length ? (
              <li className={classes.listSection}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>Nội thất</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
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

            {outdoors && outdoors.images && outdoors.images.length ? (
              <li className={classes.listSection}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} className={classes.stikyMobi}>
                    <div className={classes.titleSticky}>
                      <Typography variant='h5'>Môi trường xung quanh</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
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
          </List>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFullImage;
