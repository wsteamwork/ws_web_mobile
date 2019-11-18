import VisitedRoom from '@/components/Rooms/VisitedRooms/VisitedRoom';
import DialogComparison from '@/components/Toolbar/DialogComparison';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxCompare: {
      position: 'sticky',
      top: '15%'
    },
    label: {
      textAlign: 'left',
      fontWeight: 700,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4)
    },
    boxEmpty: {
      padding: 16,
      border: '2px dashed #ddd',
      borderRadius: 2,
      textAlign: 'center',
      color: '#ddd'
    },
    btnShow: {
      color: '#41C9BC',
      border: '1px solid #41C9BC',
      textTransform: 'initial',
      marginTop: theme.spacing(1),
      float: 'right'
    },
  })
);

const CompareRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();
  const comparisonList = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.compareRooms.compareRooms
  );
  const [openCompare, setOpenCompare] = useState(false);

  const hanldeShow = () => {
    setOpenCompare(true);
  };

  return (
    <div className={classes.boxCompare}>
      <Typography variant="h6" className={classes.label}>
        {t('rooms:compareRooms')}
      </Typography>
      {
        comparisonList[0] ? (
          <VisitedRoom room={comparisonList[0]} />
        ) : (
            <div className={classes.boxEmpty}>
              <FontAwesomeIcon size='2x' icon={faTags} />
              <Typography variant='h6'>{t('rooms:emptyItem')}</Typography>
            </div>
          )
      }
      {
        comparisonList[1] ? (
          <VisitedRoom room={comparisonList[1]} />
        ) : (
            <div className={classes.boxEmpty}>
              <FontAwesomeIcon size='2x' icon={faTags} />
              <Typography variant='h6'>{t('rooms:emptyItem')}</Typography>
            </div>
          )
      }

      {
        comparisonList.length < 2 ? '' : (
          <Button
            variant="outlined"
            className={classes.btnShow}
            size='small'
            onClick={hanldeShow}
          >
            {t('rooms:showCompare')}
          </Button>
        )
      }

      <DialogComparison open={openCompare} handleClose={() => setOpenCompare(false)} />

    </div>
  );
};

export default CompareRooms;
