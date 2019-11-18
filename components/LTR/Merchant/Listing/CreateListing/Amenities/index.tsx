import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { AmenitiesReducerAction, getDataAmenities } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { getDataImages, ImageReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardAmenities from './CardAmenities';

interface IProps {
  classes?: any;
}
const Amenities: FC<IProps> = (props) => {
  const [amenities, setAmenities] = useState<any>([]);
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const id = router.query.id;
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  const dispatch_amen = useDispatch<Dispatch<AmenitiesReducerAction>>();
  const outdoorsClick = useSelector<ReducersList, number[]>((state) => state.amenities.outdoors);
  const facilitiesClick = useSelector<ReducersList, number[]>(
    (state) => state.amenities.facilities
  );
  const dispatch_img = useDispatch<Dispatch<ImageReducerAction>>();

  const bathroomsClick = useSelector<ReducersList, number[]>((state) => state.amenities.bathrooms);
  const kitchensClick = useSelector<ReducersList, number[]>((state) => state.amenities.kitchens);
  const entertainmentClick = useSelector<ReducersList, number[]>(
    (state) => state.amenities.entertainment
  );
  const othersClick = useSelector<ReducersList, number[]>((state) => state.amenities.others);

  const getAmenitiesList = async () => {
    const url = `comforts`;
    const res: AxiosRes<any> = await axios_merchant.get(url);
    setAmenities(res.data);
    return res.data;
  };

  useEffect(() => {
    dispatch_detail({ type: 'setStep', payload: 'tab2' });
    getDataAmenities(id, dispatch_amen);
    getDataImages(id, dispatch_img);
  }, []);

  useEffect(() => {
    if (!amenities.length) {
      getAmenitiesList();
    }
  }, []);

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11}>
          <Typography variant="h1" gutterBottom className="label main_label">
            {t('details:amenities:titleAmenities')}
          </Typography>
          <Typography variant="h6">{t('details:amenities:subTitleAmenities')}</Typography>
        </Grid>
        <Grid item xs={11}>
          {amenities['facilities'] ? (
            <CardAmenities
              label={amenities['facilities'][0].type_txt}
              sub_label={t('details:amenities:subLabelFacilities')}
              amenities={amenities['facilities']}
              dataClick={facilitiesClick}
              typeUpload={{ type: 'setFacilities' }}
            />
          ) : (
              ''
            )}
          {amenities['bathrooms'] ? (
            <CardAmenities
              label={amenities['bathrooms'][0].type_txt}
              sub_label={t('details:amenities:subLabelBathrooms')}
              amenities={amenities['bathrooms']}
              dataClick={bathroomsClick}
              typeUpload={{ type: 'setBathRooms' }}
            />
          ) : (
              ''
            )}
          {amenities['kitchens'] ? (
            <CardAmenities
              label={amenities['kitchens'][0].type_txt}
              sub_label={t('details:amenities:subLabelKitchens')}
              amenities={amenities['kitchens']}
              dataClick={kitchensClick}
              typeUpload={{ type: 'setKitChens' }}
            />
          ) : (
              ''
            )}
          {amenities['entertainments'] ? (
            <CardAmenities
              label={amenities['entertainments'][0].type_txt}
              sub_label={t('details:amenities:subLabelEntertainments')}
              amenities={amenities['entertainments']}
              dataClick={entertainmentClick}
              typeUpload={{ type: 'setEntertainment' }}
            />
          ) : (
              ''
            )}
          {amenities['outdoors'] ? (
            <CardAmenities
              label={amenities['outdoors'][0].type_txt}
              sub_label={t('details:amenities:subLabelOutdoors')}
              amenities={amenities['outdoors']}
              dataClick={outdoorsClick}
              typeUpload={{ type: 'setOutdoors' }}
            />
          ) : (
              ''
            )}
          {amenities['others'] ? (
            <CardAmenities
              label={amenities['others'][0].type_txt}
              sub_label={t('details:amenities:subLabelOtherAmen')}
              amenities={amenities['others']}
              dataClick={othersClick}
              typeUpload={{ type: 'setOthers' }}
            />
          ) : (
              ''
            )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Amenities;
