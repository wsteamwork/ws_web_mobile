import React, { FC, Fragment, Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import IOSSwitch from '../../FilterActions/SwitchMap/IOSSwitch';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Divider, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import mainColor from '@/styles/constants/colors';
import Collapse from '@material-ui/core/Collapse';

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
}
const RoomTypeMobile: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);

  const [state, setState] = useState({
    checkedAll: 0,
    privateHouse: 0,
    entireApartment: 0,
    villa: 0,
    privateRoom: 0,
    hotelRoom: 0,
  });

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked ? 1 : 0 });
  };

  return (
    <Fragment>
      <Grid container item xs={12}>
        <Grid item xs={6} className={classes.inline}>
          <Typography variant="subtitle2" className={classes.title}>
            Tất cả
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.itemRight}>
          <IOSSwitch checked={state.checkedAll === 1} onChange={handleChange('checkedAll')} value="checked" />
        </Grid>
        {state.checkedAll === 0 && (
          <Grid container item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
        )}
      </Grid>
      <Collapse in={state.checkedAll === 0}>
        <Grid container item xs={12}>
          <Grid item xs={6} className={classes.inline}>
            <Typography variant="subtitle2" className={classes.title}>
              Nhà riêng
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.itemRight}>
            <IOSSwitch checked={state.privateHouse === 1} onChange={handleChange('privateHouse')} value="checked" />
          </Grid>
          <Grid container item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6} className={classes.inline}>
            <Typography variant="subtitle2" className={classes.title}>
              Căn hộ
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.itemRight}>
            <IOSSwitch checked={state.entireApartment === 1} onChange={handleChange('entireApartment')} value="checked" />
          </Grid>
          <Grid container item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6} className={classes.inline}>
            <Typography variant="subtitle2" className={classes.title}>
              Biệt thự
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.itemRight}>
            <IOSSwitch checked={state.villa === 1} onChange={handleChange('villa')} value="checked" />
          </Grid>
          <Grid container item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6} className={classes.inline}>
            <Typography variant="subtitle2" className={classes.title}>
              Phòng riêng
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.itemRight}>
            <IOSSwitch checked={state.privateRoom === 1} onChange={handleChange('privateRoom')} value="checked" />
          </Grid>
          <Grid container item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6} className={classes.inline}>
            <Typography variant="subtitle2" className={classes.title}>
              Phòng khách sạn
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.itemRight}>
            <IOSSwitch checked={state.hotelRoom === 1} onChange={handleChange('hotelRoom')} value="checked" />
          </Grid>
        </Grid>
      </Collapse>
    </Fragment>
  );
};

export default RoomTypeMobile;
