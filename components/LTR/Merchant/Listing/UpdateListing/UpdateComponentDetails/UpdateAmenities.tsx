import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { AmenitiesReducerAction, getDataAmenities } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
import { handleUpdateListing, ListingDetailsReducerAction } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment, useContext, useEffect, useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardAmenities from '../../CreateListing/Amenities/CardAmenities';
import CardWrapperUpdate from '../CardWrapperUpdate';
interface IProps {
  classes?: any;
}

const UpdateAmenities: FC<IProps> = (props) => {
  const [amenities, setAmenities] = useState<any>([]);
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const id = router.query.id;
  const dispatch_amen = useDispatch<Dispatch<AmenitiesReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<ListingDetailsReducerAction>>();
  const outdoorsClick = useSelector<ReducersList, number[]>((state) => state.amenities.outdoors);
  const facilitiesClick = useSelector<ReducersList, number[]>(
    (state) => state.amenities.facilities
  );
  const bathroomsClick = useSelector<ReducersList, number[]>((state) => state.amenities.bathrooms);
  const kitchensClick = useSelector<ReducersList, number[]>((state) => state.amenities.kitchens);
  const entertainmentClick = useSelector<ReducersList, number[]>(
    (state) => state.amenities.entertainment
  );
  const othersClick = useSelector<ReducersList, number[]>((state) => state.amenities.others);
  const countAmenities = useSelector<ReducersList, number>(
    (state) => state.amenities.count_amenities
  );
  const disable_save = useSelector<ReducersList, boolean>(
    (state) => state.listingdetails.disable_save
  );
  const room_id = useSelector<ReducersList, number>((state) => state.amenities.room_id);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>(null);
  const [statusSnack, setStatusSnack] = useState<string>("success");
  const getAmenitiesList = async () => {
    const url = `comforts`;
    const res: AxiosRes<any> = await axios_merchant.get(url);
    setAmenities(res.data);
    return res.data;
  };

  useEffect(() => {
    getDataAmenities(id, dispatch_amen);
  }, []);

  useEffect(() => {
    if (!amenities.length) {
      getAmenitiesList();
    }
  }, []);

  useEffect(() => {
    if (countAmenities < 10) {
      dispatch_detail({ type: 'setDisableSave', payload: true });
    } else {
      dispatch_detail({ type: 'setDisableSave', payload: false });
    }
  }, [countAmenities]);

  const updateAmenities: any = () => {
    const res = handleUpdateListing(room_id, {
      comforts: {
        facilities: facilitiesClick,
        kitchens: kitchensClick,
        bathrooms: bathroomsClick,
        entertainment: entertainmentClick,
        outdoors: outdoorsClick,
        others: othersClick
      }
    });
    if(res) {
      setOpenSnack(true);
      setMessageSnack("Cập nhật tiện ích căn hộ thành công !")
    }
    else {
      setOpenSnack(true);
      setStatusSnack("error");
      setMessageSnack("Cập nhật tiện ích căn hộ thất bại !")
    }
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <CardWrapperUpdate disabledSave={disable_save} handleSave={updateAmenities} openSnack={openSnack} statusSnack={statusSnack} messageSnack={messageSnack} handleCloseSnack={handleCloseSnack}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom className="label main_label">
              {t('details:amenities:titleAmenities')}
            </Typography>
            <Typography variant="h6">{t('details:amenities:subTitleAmenities')}</Typography>
          </Grid>
          <Grid item xs={12}>
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
      </CardWrapperUpdate>
    </Fragment>
  );
};
export default UpdateAmenities;
