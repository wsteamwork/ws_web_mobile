import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import mainColor from '@/styles/constants/colors';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useMemo, useState } from 'react';
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
  bathrooms: any
}

interface IArrayImage {
  imgURL: string,
  id: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.24,
      color: mainColor.titleText,
      fontWeight: 'bold'
    },
    btnViewAll: {
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.24,
      color: '#54D3C2',
      paddingRight: 28,
    },
    properyItemIcon: {
      display: 'flex',
      justifyContent: 'center',
    },
    itemIcon: {
      width: 103,
      height: 100,
      objectFit: 'cover',
      borderRadius: 15,
      zIndex: 2,
    }
  })
);


const BoxListImageRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms, cover_photo } = props;
  const { t } = useTranslation();
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);
  const [elImage, setElImage] = useState<string>('');

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenFullImage(!openFullImage);
  };

  const toggleDialog = (e: MouseEvent<HTMLElement>, idEl: string) => {
    e.preventDefault();
    setElImage(idEl);
    setOpenFullImage(!openFullImage);
  };

  let arrImage: IArrayImage[] = [];
  const funcPushImage = useMemo(() => {
    if (cover_photo.images && cover_photo.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + cover_photo.images[0].name}`,
        id: 'cover_photo'
      })
    }
    if (livingrooms.images && livingrooms.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + livingrooms.images[0].name}`,
        id: 'livingrooms'
      })
    }
    if (bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + bedrooms['bedroom_1'].images[0].name}`,
        id: 'bedrooms'
      })
    }
    if (bathrooms['bathroom_1'] && bathrooms['bathroom_1'].images && bathrooms['bathroom_1'].images.length) {
      arrImage.push({
        imgURL: `${bathrooms.bathroom_1 ? IMAGE_STORAGE_LG + bathrooms['bathroom_1'].images[0].name : ''}`,
        id: 'bathrooms'
      })
    }
    if (kitchens.images && kitchens.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + kitchens.images[0].name}`,
        id: 'kitchens'
      })
    }
    if (furnitures.images && furnitures.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + furnitures.images[0].name}`,
        id: 'furnitures'
      })
    }
  }, []);

  const renderRoomImages = (item) => (
    <Grid className={classes.properyItemIcon}>
      <img className={classes.itemIcon} src={item.imgURL} onClick={(e) => toggleDialog(e, item.id)} />
    </Grid>
  );

  return (
    <Fragment>
      <Grid container justify='space-between' alignContent='center'>
        <Grid item>
          <Typography variant='h5' className={classes.name} gutterBottom>
            {t('longtermroom:discover')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5' className={classes.btnViewAll} gutterBottom onClick={toggle}>
            {t('longtermroom:allImages')}
          </Typography>
        </Grid>
      </Grid>
      <PropertyListHorizontalScroll
        // itemWidth={'33,33%'}
        margin='14px 0 0'
        paddingItem='0 12px 0 0 !important'
        listData={arrImage}
        itemRender={renderRoomImages}
        isDependencies={false}
      />
      <DialogFullImage idEl={elImage} open={openFullImage} handleClose={() => setOpenFullImage(false)}
        livingrooms={livingrooms}
        kitchens={kitchens}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        outdoors={outdoors}
        furnitures={furnitures}
      />
    </Fragment>
  );
};

export default BoxListImageRoom;
