import React, { FC, Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ItemAroundList from './ItemAroundList';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  RoomReducerState,
  getGuideBookList,
  RoomReducerAction
} from '@/store/Redux/Reducers/Room/roomReducer';
import { useTranslation } from 'react-i18next';
import { Dispatch } from 'redux';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      fontWeight: 700,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    titleLT: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: theme.spacing(2)
    }
  })
);

const PlacesAroundList: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { guidebooks } = useSelector<ReducersList, RoomReducerState>((state) => state.roomPage);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const dispatch = useDispatch<Dispatch<RoomReducerAction>>();
  useEffect(() => {
    getGuideBookList(dispatch);
  }, []);
  return (
    <Fragment>
      <Typography variant="h5" className={leaseTypeGlobal ? classes.titleLT : classes.title}>
        {t('room:nearbyPlaces')}
      </Typography>
      {guidebooks.length > 0 ? (
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 16 }} />}>
          {guidebooks.map((o, i) => (
            <ItemAroundList key={i} guidebook_category_id={o.id} nameGuidebook={o.name} />
          ))}
        </TreeView>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default PlacesAroundList;
