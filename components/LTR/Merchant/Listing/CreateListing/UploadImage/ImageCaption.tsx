import { ReducersList } from '@/store/Redux/Reducers';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import _ from 'lodash';
import React, { FC, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardImageCaption from './CardImageCaption';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    margin: {
      marginBottom: theme.spacing(3)
    }
  })
);

const ImageCaption: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();

  const avatar_image = useSelector<ReducersList, ImagesRes>((state) => state.images.avatar_image);
  const cover_photo = useSelector<ReducersList, ImagesRes>((state) => state.images.cover_photo);
  const livingrooms = useSelector<ReducersList, ImagesRes>((state) => state.images.livingrooms);
  const kitchens = useSelector<ReducersList, ImagesRes>((state) => state.images.kitchens);
  const outdoors = useSelector<ReducersList, ImagesRes>((state) => state.images.outdoors);
  const furnitures = useSelector<ReducersList, ImagesRes>((state) => state.images.furnitures);
  const bedrooms = useSelector<ReducersList, any>((state) => state.images.bedrooms);
  const bathrooms = useSelector<ReducersList, any>((state) => state.images.bathrooms);

  useEffect(() => {
    dispatch_detail({ type: 'setStep', payload: 'tab3' });
  }, []);

  const countBedRoom = Object.keys(bedrooms).length;
  const countBathRoom = Object.keys(bathrooms).length;

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {avatar_image.images && avatar_image.images.length && (
            <CardImageCaption
              label={t('details:images:labelAvatar')}
              // subLabel="Thêm chú thích cho ảnh đại diện"
              typeUpload={{ type: 'setAvatarImage' }}
              typeImage={1}
              arrImage={avatar_image.images}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {cover_photo.images && cover_photo.images.length && (
            <CardImageCaption
              label={t('details:images:labelCover')}
              // subLabel="Thêm chú thích cho ảnh bìa"
              typeUpload={{ type: 'setCoverImage' }}
              typeImage={4}
              arrImage={cover_photo.images}
            />
          )}
        </Grid>
      </Grid>
      {livingrooms.images && livingrooms.images.length && (
        <CardImageCaption
          label={t('details:images:labelLivingRooms')}
          // subLabel="Thêm chú thích cho ảnh phòng khách căn hộ"
          typeUpload={{ type: 'setLivingRoomImage' }}
          typeImage={7}
          arrImage={livingrooms.images}
        />
      )}
      {countBedRoom &&
        _.times(countBedRoom, (i) =>
          bedrooms[`bedroom_${i + 1}`] && bedrooms[`bedroom_${i + 1}`].images && bedrooms[`bedroom_${i + 1}`].images.length ? (
            <CardImageCaption
              key={i}
              label={`${t('details:images:labelBedRooms')} ${i + 1}`}
              typeImage={5}
              type_txt={`bedroom_${i + 1}`}
              typeUpload={{ type: 'setBedRoomImage' }}
              // subLabel="Thêm chú thích cho ảnh phòng ngủ"
              arrImage={bedrooms[`bedroom_${i + 1}`].images}
            />
          ) : (
              ''
            )
        )}
      {countBathRoom &&
        _.times(countBathRoom, (i) =>
          bathrooms[`bathroom_${i + 1}`] && bathrooms[`bathroom_${i + 1}`].images && bathrooms[`bathroom_${i + 1}`].images.length ? (
            <CardImageCaption
              key={i}
              label={`${t('details:images:labelBathRooms')} ${i + 1}`}
              type_txt={`bathroom_${i + 1}`}
              typeUpload={{ type: 'setBathRoomImage' }}
              typeImage={6}
              // subLabel="Thêm chú thích cho ảnh phòng tắm"
              arrImage={bathrooms[`bathroom_${i + 1}`].images}
            />
          ) : (
              ''
            )
        )}
      {kitchens.images && kitchens.images.length && (
        <CardImageCaption
          label={t('details:images:labelKitchens')}
          // subLabel="Thêm chú thích cho ảnh phòng bếp căn hộ"
          typeUpload={{ type: 'setKitchensImage' }}
          typeImage={8}
          arrImage={kitchens.images}
        />
      )}
      {furnitures.images && furnitures.images.length && (
        <CardImageCaption
          label={t('details:images:labelFurnitures')}
          // subLabel="Thêm chú thích cho ảnh phòng khách căn hộ"
          typeUpload={{ type: 'setFurnituresImage' }}
          typeImage={10}
          arrImage={furnitures.images}
        />
      )}
      {outdoors.images && outdoors.images.length && (
        <CardImageCaption
          label={t('details:images:labelOutdoors')}
          // subLabel="Thêm chú thích cho ảnh phòng khách căn hộ"
          typeUpload={{ type: 'setOutdoorsImage' }}
          typeImage={9}
          arrImage={outdoors.images}
        />
      )}
    </Fragment>
  );
};

export default ImageCaption;
