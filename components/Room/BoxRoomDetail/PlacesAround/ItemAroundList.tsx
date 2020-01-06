import React, { FC, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import RoomIcon from '@material-ui/icons/Room';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface IProps {
  classes?: any;
  guidebook_category_id: number;
  nameGuidebook: string;
}
type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  distance?: number;
  labelText: string;
};
const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:focus > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`
      }
    },
    content: {
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular
      }
    },
    group: {
      marginLeft: 0
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
      fontWeight: 600
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      flexGrow: 1
    }
  })
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles(props);
  const { labelText, labelIcon: LabelIcon, distance, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          {LabelIcon ? <LabelIcon className={classes.labelIcon} /> : ''}
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          {LabelIcon ? (
            <Typography variant="caption">
              {distance > 100 ? `${(distance / 1000).toFixed(2)} km` : `${distance} m`}
            </Typography>
          ) : (
            ''
          )}
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        group: classes.group
      }}
      {...other}
    />
  );
}

const ItemAroundList: FC<IProps> = (props) => {
  const { guidebook_category_id, nameGuidebook } = props;
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const placesList = useSelector<ReducersList, any>((state) =>
    leaseTypeGlobal ? state.ltroomPage.placesList : state.roomPage.placesList
  );
  const [placesListSort, setPlacesListSort] = useState<any>(placesList);
  useEffect(() => {
    if (placesList.length) {
      let filters = placesList.filter(
        (item) => item.guidebook_category_id === guidebook_category_id
      );
      setPlacesListSort(filters);
    }
  }, []);
  const itemsPlaces = _.map(placesListSort, (item, i) => {
    return (
      <StyledTreeItem
        key={i}
        nodeId={(guidebook_category_id + i + 1).toString()}
        labelText={item.name}
        labelIcon={RoomIcon}
        distance={item.distance ? item.distance : 0}
        color="#1a73e8"
        bgColor="#e8f0fe"
      />
    );
  });
  return (
    <StyledTreeItem nodeId={guidebook_category_id.toString()} labelText={nameGuidebook}>
      {itemsPlaces}
    </StyledTreeItem>
  );
};

export default ItemAroundList;
