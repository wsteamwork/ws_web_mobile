// import DialogFullImage from '../BoxListImageRoom/DialogFullImage';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useContext, useMemo, useState } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { useTranslation } from 'react-i18next';
import '/styles/pages/LTR/room/index.scss';
interface IProps {
  classes?: any,
  livingrooms: ImagesRes | any,
  cover_photo: ImagesRes | any,
  furnitures?: ImagesRes | any,
  kitchens?: ImagesRes | any,
  bedrooms: any,
  bathrooms: any,
  isPreviewPage?: boolean,
}

interface IArrayImage {
  imgURL: string,
  title: string,
  subTitle: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      height: '55vh',
      margin: '64px 0 48px',
      [theme.breakpoints.down('sm')]: {
        height: '35vh',
        margin: '20px 0 48px',
      }
    },
    txtName: {
      fontSize: '1.5rem'
    },
    txtDes: {
      overflow: 'hidden',
      display: '-webkit-box',
      maxHeight: '52px',
      height: '52px',
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical'
    }
  })
);

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { livingrooms, furnitures, kitchens, bedrooms, bathrooms, cover_photo, isPreviewPage } = props;
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenFullImage(!openFullImage);
  };
  let arrImage: IArrayImage[] = [];
  const funcPushImage = useMemo(() => {
    if (isPreviewPage && !cover_photo.images && !livingrooms.images && !bedrooms[`bedroom_1`].images) {
      arrImage.push({
        imgURL: '/static/images/image-room-default.png',
        title: '',
        subTitle: ''
      })
    }
    if (cover_photo.images && cover_photo.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + cover_photo.images[0].name}`,
        title: '',
        subTitle: cover_photo.images[0].caption
      })
    }
    if (livingrooms.images && livingrooms.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + livingrooms.images[0].name}`,
        title: t('longtermroom:livingrooms'),
        subTitle: livingrooms.images[0].caption
      })
    }
    if (bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images && bedrooms[`bedroom_1`].images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + bedrooms['bedroom_1'].images[0].name}`,
        title: t('longtermroom:bedrooms'),
        subTitle: bedrooms['bedroom_1'].images[0].caption
      })
    }
    if (bathrooms['bathroom_1'] && bathrooms['bathroom_1'].images && bathrooms['bathroom_1'].images.length) {
      arrImage.push({
        imgURL: `${bathrooms.bathroom_1 ? IMAGE_STORAGE_LG + bathrooms['bathroom_1'].images[0].name : ''}`,
        title: t('longtermroom:bathrooms'),
        subTitle: `${bathrooms.bathroom_1 ? bathrooms['bathroom_1'].images[0].caption : ''}`
      })
    }
    if (kitchens.images && kitchens.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + kitchens.images[0].name}`,
        title: t('longtermroom:kitchens'),
        subTitle: kitchens.images[0].caption
      })
    }
    if (furnitures.images && furnitures.images.length) {
      arrImage.push({
        imgURL: `${IMAGE_STORAGE_LG + furnitures.images[0].name}`,
        title: t('longtermroom:furnitures'),
        subTitle: furnitures.images[0].caption
      })
    }
  }, []);
  return (
    <Fragment>
      <Grid container spacing={1} className={classes.boxContainer}>
        {
          width === 'sm' || width === 'xs' ? (
            <div
              className="slider-content"
              style={{ width: '100%', background: `url('${cover_photo.images && cover_photo.images.length ? IMAGE_STORAGE_LG + cover_photo.images[0].name : '/static/images/image-room-default.png'}') no-repeat center center` }}
            >
            </div>
          ) : (
              <Slider className="slider-wrapper" autoplay={3000}>
                {arrImage.map((item, i) => (
                  <div
                    key={item.title}
                    className="slider-content"
                    style={{ background: `url('${item.imgURL}') no-repeat center center` }}
                  >
                    <div className="inner">
                      <h1 className={classes.txtName}>{item.title}</h1>
                      <p className={classes.txtDes}>{item.subTitle}</p>
                      {/* <button>{item.button}</button> */}
                    </div>
                  </div>
                ))}
              </Slider>
            )
        }
      </Grid>
      {/* <DialogFullImage open={openFullImage} handleClose={() => setOpenFullImage(false)}
        livingrooms={livingrooms}
        kitchens={kitchens}
        cover_photo={cover_photo}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        outdoors={outdoors}
        furnitures={furnitures}
        roomName={roomName}
      /> */}
    </Fragment>
  );
};

export default BoxImageLT;
