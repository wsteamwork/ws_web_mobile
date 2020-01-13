import { ReducersList } from '@/store/Redux/Reducers';
import { getDataPlacesListing, UpdateDetailsActions, UpdateDetailsState } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { axios_merchant } from '@/utils/axiosInstance';
import { createStyles, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Theme, Tooltip, Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import RoomIcon from '@material-ui/icons/Room';
import _ from 'lodash';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import DialogGuideBookMap from '../GuideBookItem/DialogGuideBookMap';
interface IProps {
  classes?: any;
  guidebook_category_id: number;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapper: {
      textAlign: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper
    },
    title: {
      fontWeight: 600,
      margin: theme.spacing(0, 2)
    },
    marginBtn: {
      marginLeft: 3,
      marginRight: 1
    }
  })
);

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dce0e0'
  }
}))(Tooltip);

const GuideBookPlacesItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { guidebook_category_id } = props;
  const [openDialogMap, setOpenDialogMap] = useState(false);
  const [currentGuide, setCurrentGuide] = useState<number>(0);
  const [placeEdit, setPlaceEdit] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const { placesList, room_id } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const [placesListSort, setPlacesListSort] = useState<any[]>(placesList);
  useEffect(() => {
    if (placesList) {
      let filters = placesList.filter(
        (item) => item.guidebook_category_id === guidebook_category_id
      );
      setPlacesListSort(filters);
    }
  }, [placesList]);
  const handleCloseMap = () => {
    setPlaceEdit(null);
    isUpdate && setIsUpdate(false);
    setOpenDialogMap(false);
  };
  const updateItemPlace = async (item: any) => {
    setIsUpdate(true);
    setOpenDialogMap(true);
    setPlaceEdit(item);
    setCurrentGuide(item.guidebook_category_id);
  };

  const removeItemPlace = async (id: number) => {
    let idx = placesList.findIndex((i) => i.id === id);
    if (idx !== -1) {
      placesList.splice(idx, 1);
      await axios_merchant
        .post('places/update-room-place', {
          room_id: room_id,
          places: placesList
        })
        .then((response) => {
          getDataPlacesListing(room_id, dispatch);
        });
    }
  };
  const renderPlaceList = useMemo(
    () =>
      _.map(placesListSort, (i, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <RoomIcon />
          </ListItemAvatar>
          <ListItemText primary={i.name} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => updateItemPlace(i)}
              className={classes.marginBtn}>
              <img src={'/static/guidebook/edit.svg'} width={16} height={16} />
            </IconButton>
            <HtmlTooltip title={'Bạn có muốn xóa ?'} placement="bottom">
              <IconButton edge="end" aria-label="delete" onClick={() => removeItemPlace(i.id)}>
                <img src={'/static/guidebook/delete.svg'} width={16} height={16} />
              </IconButton>
            </HtmlTooltip>
          </ListItemSecondaryAction>
        </ListItem>
      )),
    [placesListSort]
  );
  return placesListSort && placesListSort.length ? (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.title}>
          {placesListSort[0].guidebook_category_text}
        </Typography>
        <div className={classes.paper}>
          <List>{renderPlaceList}</List>
        </div>
      </Grid>
      {placeEdit ? (
        <DialogGuideBookMap
          placeEditId={placeEdit.id}
          latPlace={placeEdit.latitude}
          lngPlace={placeEdit.longitude}
          isUpdate={isUpdate}
          nameDefault={placeEdit.name}
          descriptionDefault={placeEdit.description}
          distanceDefault={placeEdit.distance}
          clearAddress={false}
          guidebook_category_id={currentGuide}
          open={openDialogMap}
          handleClose={handleCloseMap}
        />
      ) : (
          ''
        )}
    </Grid>
  ) : (
      <Fragment></Fragment>
    );
};

export default GuideBookPlacesItem;
