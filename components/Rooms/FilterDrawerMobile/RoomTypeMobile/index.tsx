import createStyles from '@material-ui/core/styles/createStyles';
import React, { FC, Fragment, useState, useEffect, Dispatch, SetStateAction } from 'react';
import _ from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Paper from '@material-ui/core/Paper/Paper';
import Grey from '@material-ui/core/colors/grey';
import Blue from '@material-ui/core/colors/blue';
import { TypeSelect } from '@/types/Requests/ResponseTemplate';
import { useExpandableList } from '@/store/Hooks/filterHooks';
import { Theme, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useRoomTypeChecbox, getRoomType } from '../../FilterActions/RoomType/context';
interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  dataClick: number[];
  setDataClick: Dispatch<SetStateAction<number[]>>;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    ul: {
      listStyleType: 'none',
      marginBlockStart: '0px',
      paddingInlineStart: '0.4rem',
      paddingBlockStart: '0.5rem',
      marginBlockEnd: 0
    },
    checkboxRoot: {
      padding: 5
    },
    showMore: {
      textAlign: 'center',
      padding: 5,
      backgroundColor: Grey[200],
      color: Blue[400]
    },
    title: {
      fontWeight: 700
    }
  })
);

const RoomTypeMobile: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { setOpen, dataClick, setDataClick } = props;

  const [roomTypes, setRoomTypes] = useState<TypeSelect[]>([]);

  const [roomTypeChunks, isRoomTypeExpand, setRoomTypeExpand] = useExpandableList<TypeSelect>(
    roomTypes
  );

  const { data, handleChange } = useRoomTypeChecbox(
    setOpen,
    dataClick,
    setDataClick
  );

  useEffect(() => {
    if (roomTypes.length === 0) getRoomType(setRoomTypes);
  }, []);

  return (
    <Fragment>
      {roomTypes.length > 0 ? (
        <Fragment>
          <ul className={classes.ul}>
            {_.map(roomTypeChunks, (item) => (
              <li key={item.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={item.id.toString()}
                      color="primary"
                      onChange={handleChange(item.id)}
                      value={item.id.toString()}
                      checked={dataClick.some((i) => i === item.id)}
                      classes={{
                        root: classes.checkboxRoot
                      }}
                    />
                  }
                  label={item.value}
                />
              </li>
            ))}
          </ul>
          <Paper
            elevation={0}
            className={classes.showMore}
            onClick={() => setRoomTypeExpand(!isRoomTypeExpand)}>
            {isRoomTypeExpand ? t('rooms:readLess') : t('rooms:readMore')}
          </Paper>
        </Fragment>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default RoomTypeMobile;
