import React, { FC, Fragment, Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import IOSSwitch from '../../FilterActions/SwitchMap/IOSSwitch';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Divider, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import mainColor from '@/styles/constants/colors';
import Collapse from '@material-ui/core/Collapse';
import { useRoomTypeChecbox } from '../../FilterActions/RoomType/context';
import _ from 'lodash';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
      color: mainColor.titleText
    },
    inline: {
      display: 'flex',
      alignItems: 'center'
    },
    itemRight: {
      alignItems: 'flex-end',
      textAlign: 'right'
    },
    divider: {
      margin: '16px 0',
      backgroundColor: '#D8D8D8',
      width: '100%'
    }
  })
);
interface IProps {
  classes?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  dataClick: number[];
  setDataClick: Dispatch<SetStateAction<number[]>>;
}
const RoomTypeMobile: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { setOpen, dataClick, setDataClick } = props;
  const { data, handleChange } = useRoomTypeChecbox(setOpen, dataClick, setDataClick);

  return (
    <Fragment>
      <Grid container item xs={12}>
        <Grid item xs={6} className={classes.inline}>
          <Typography variant="subtitle2" className={classes.title}>
            Tất cả
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.itemRight}>
          <IOSSwitch checked={dataClick.length === 5} onChange={handleChange(0)} value="checked" />
        </Grid>
        {dataClick.length < 5 && (
          <Grid container item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
        )}
      </Grid>
      <Collapse in={dataClick.length < 5}>
        {data.length > 0
          ? _.map(data, (item, idx) => (
              <Grid container item xs={12} key={idx}>
                <Grid item xs={6} className={classes.inline}>
                  <Typography variant="subtitle2" className={classes.title}>
                    {item.value}
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.itemRight}>
                  <IOSSwitch
                    checked={dataClick.some((i) => i === item.id)}
                    onChange={handleChange(item.id)}
                    value="checked"
                  />
                </Grid>
                {data.length !== idx + 1 ? (
                  <Grid container item xs={12}>
                    <Divider className={classes.divider} />
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
            ))
          : ''}
      </Collapse>
    </Fragment>
  );
};

export default RoomTypeMobile;
