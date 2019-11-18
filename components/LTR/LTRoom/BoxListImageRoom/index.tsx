import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { ButtonBase, Grid, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogFullImage from './DialogFullImage';

interface IProps {
  classes?: any,
  livingrooms: ImagesRes | any,
  outdoors: ImagesRes | any,
  furnitures: ImagesRes | any,
  kitchens: ImagesRes | any,
  cover_photo: ImagesRes | any,
  bedrooms: any,
  bathrooms: any,
  roomName: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 700,
      margin: '1rem 0 0.35rem 0'
    },
    marginImage: {
      margin: '16px 0 0'
    },
    images: {
      width: '100%',
      borderRadius: 4,
      cursor: 'pointer',
      maxHeight: 150,
      height: 150,
      objectFit: 'cover',
      backgroundSize: 'cover !important',
      backgroundPosition: '50% 50% !important',
      backgroundRepeat: 'no-repeat !important',
    },
    btnImage: {
      position: 'relative',
      borderRadius: 4,
      overflow: 'hidden',
      verticalAlign: 'initial',
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
        padding: '12px 8px'
      },
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  })
);


const BoxListImageRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms, cover_photo, roomName } = props;
  const { t } = useTranslation();
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenFullImage(!openFullImage);
  };
  return (
    <Fragment>
      <Typography variant='h5' className={classes.name}>
        {t('longtermroom:discover')}
      </Typography>
      <Typography variant='subtitle2' gutterBottom>
        {t('longtermroom:discoverSubTitle')}
      </Typography>

      <Grid container spacing={2} alignItems='center'>
        {livingrooms.images && livingrooms.images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <div
                style={{ backgroundImage: `url('${IMAGE_STORAGE_LG + livingrooms.images[0].name}')` }}
                className={classes.images}/>
              <Typography variant='subtitle2'>
                {t('longtermroom:livingrooms')}
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <div
                style={{ backgroundImage: `url('${IMAGE_STORAGE_LG + bedrooms.bedroom_1.images[0].name}')` }}
                className={classes.images}/>
              <Typography variant='subtitle2'>
                {t('longtermroom:bedrooms')}
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {bathrooms['bathroom_1'] && bathrooms[`bathroom_1`].images && bathrooms['bathroom_1'].images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <div
                style={{ backgroundImage: `url('${IMAGE_STORAGE_LG + bathrooms['bathroom_1'].images[0].name}')` }}
                className={classes.images}/>
              <Typography variant='subtitle2'>
                {t('longtermroom:bathrooms')}
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {kitchens.images && kitchens.images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <div
                style={{ backgroundImage: `url('${IMAGE_STORAGE_LG + kitchens.images[0].name}')` }}
                className={classes.images}/>
              <Typography variant='subtitle2'>
                {t('longtermroom:kitchens')}
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {furnitures.images && furnitures.images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <div
                style={{ backgroundImage: `url('${IMAGE_STORAGE_LG + furnitures.images[0].name}')` }}
                className={classes.images}/>
              <Typography variant='subtitle2'>
                {t('longtermroom:furnitures')}
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {outdoors.images && outdoors.images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <div
                style={{ backgroundImage: `url('${IMAGE_STORAGE_LG + outdoors.images[0].name}')` }}
                className={classes.images}/>
              <Typography variant='subtitle2'>
                {t('longtermroom:outdoors')}
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}
        {cover_photo.images && cover_photo.images.length ? (
          <Grid item xs={6} sm={3}>
            <ButtonBase
              onClick={toggle}
              focusRipple
              className={classes.btnImage}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '100%',
              }}
            >
              <div
                style={{ backgroundImage: `url('${IMAGE_STORAGE_LG + cover_photo.images[0].name}')` }} className={classes.images}/>

              <span
                className={classes.imageSrc}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {t('longtermroom:allImages')}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant='subtitle2' gutterBottom>
              {t('room:notFoundContent')}
            </Typography>
          </Grid>
        )}
      </Grid>

      <DialogFullImage open={openFullImage} handleClose={() => setOpenFullImage(false)}
        livingrooms={livingrooms}
        kitchens={kitchens}
        cover_photo={cover_photo}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        outdoors={outdoors}
        furnitures={furnitures}
        roomName={roomName}
      />
    </Fragment>
  );
};

export default BoxListImageRoom;
