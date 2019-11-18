import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { getDataImages, ImageReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import React, { FC, Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import UppyImage from './UppyImage';
interface IProps {
  classes?: any;
}

const UploadImage: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const id = router.query.id;
  const dispatch_img = useDispatch<Dispatch<ImageReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();

  const listing = useSelector<ReducersList, any>((state) => state.details.listing);
  const avatar_image = useSelector<ReducersList, ImagesRes>((state) => state.images.avatar_image);
  const cover_photo = useSelector<ReducersList, ImagesRes>((state) => state.images.cover_photo);
  const livingrooms = useSelector<ReducersList, ImagesRes>((state) => state.images.livingrooms);
  const kitchens = useSelector<ReducersList, ImagesRes>((state) => state.images.kitchens);
  const outdoors = useSelector<ReducersList, ImagesRes>((state) => state.images.outdoors);
  const furnitures = useSelector<ReducersList, ImagesRes>((state) => state.images.furnitures);
  const bedrooms = useSelector<ReducersList, any>((state) => state.images.bedrooms);
  const bathrooms = useSelector<ReducersList, any>((state) => state.images.bathrooms);

  useEffect(() => {
    getDataImages(id, dispatch_img);
  }, []);

  useEffect(() => {
    dispatch_detail({ type: 'setStep', payload: 'tab3' });
  }, []);

  return (
    <Fragment>
      {listing ? (
        <Fragment>
          <Grid container justify="center" alignContent="center">
            <Grid item xs={11}>
              <UppyImage
                label={t('details:images:labelAvatar')}
                subLabel={t('details:images:subLabelAvatar')}
                height={350}
                maxImage={1}
                typeImage={1}
                typeUpload={{ type: 'setAvatarImage' }}
                initImages={avatar_image.images.length ? avatar_image.images : []}
              />
            </Grid>
            <Grid item xs={11}>
              <UppyImage
                label={t('details:images:labelCover')}
                subLabel={t('details:images:subLabelCover')}
                height={350}
                maxImage={1}
                typeImage={4}
                typeUpload={{ type: 'setCoverImage' }}
                initImages={cover_photo.images.length ? cover_photo.images : []}
              />
            </Grid>
            <Grid item xs={11}>
              <UppyImage
                label={t('details:images:labelLivingRooms')}
                subLabel={t('details:images:subLabelLivingRooms')}
                typeUpload={{ type: 'setLivingRoomImage' }}
                typeImage={7}
                initImages={livingrooms.images.length ? livingrooms.images : []}
              />
            </Grid>

            {_.times(listing.bedrooms.number_bedroom, (i) => (
              <Grid item key={i} xs={11}>
                <UppyImage
                  label={`${t('details:images:labelBedRooms')} ${i + 1}`}
                  subLabel={t('details:images:subLabelBedRooms')}
                  type_txt={`bedroom_${i + 1}`}
                  typeUpload={{ type: 'setBedRoomImage' }}
                  typeImage={5}
                  initImages={
                    bedrooms[`bedroom_${i + 1}`] && bedrooms[`bedroom_${i + 1}`].images ? bedrooms[`bedroom_${i + 1}`].images : []
                  }
                />
              </Grid>
            ))}
            {_.times(listing.bathrooms.number_bathroom, (i) => (
              <Grid item key={i} xs={11}>
                <UppyImage
                  key={i}
                  label={`${t('details:images:labelBathRooms')} ${i + 1}`}
                  subLabel={t('details:images:subLabelBathRooms')}
                  type_txt={`bathroom_${i + 1}`}
                  typeUpload={{ type: 'setBathRoomImage' }}
                  typeImage={6}
                  initImages={
                    bathrooms[`bathroom_${i + 1}`] && bathrooms[`bathroom_${i + 1}`].images ? bathrooms[`bathroom_${i + 1}`].images : []
                  }
                />
              </Grid>
            ))}
            <Grid item xs={11}>
              <UppyImage
                label={t('details:images:labelKitchens')}
                subLabel={t('details:images:subLabelKitchens')}
                typeImage={8}
                typeUpload={{ type: 'setKitchensImage' }}
                initImages={kitchens.images.length ? kitchens.images : []}
              />
            </Grid>
            <Grid item xs={11}>
              <UppyImage
                label={t('details:images:labelFurnitures')}
                subLabel={t('details:images:subLabelFurnitures')}
                typeUpload={{ type: 'setFurnituresImage' }}
                typeImage={10}
                initImages={furnitures.images.length ? furnitures.images : []}
              />
            </Grid>
            <Grid item xs={11}>
              <UppyImage
                label={t('details:images:labelOutdoors')}
                subLabel={t('details:images:subLabelOutdoors')}
                typeImage={9}
                typeUpload={{ type: 'setOutdoorsImage' }}
                initImages={outdoors.images.length ? outdoors.images : []}
              />
            </Grid>
          </Grid>
        </Fragment>
      ) : (
          ''
        )}
    </Fragment>
  );
};

export default UploadImage;
