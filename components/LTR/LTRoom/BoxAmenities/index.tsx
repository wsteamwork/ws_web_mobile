import DialogFullAmenities from '@/components/LTR/LTRoom/BoxAmenities/DialogFullAmenities';
import { ReducersList } from '@/store/Redux/Reducers';
import mainColor from '@/styles/constants/colors';
import { AmenitiesIndexRes } from '@/types/Requests/LTR/Amenities/AmenitiesResponses';
import { Theme } from '@material-ui/core';
// import deepPurple from '@material-ui/core/colors/deepPurple';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import Grow from '@material-ui/core/Grow';

interface IProps {
  classes?: any,
  facilities: AmenitiesIndexRes[],
  bedrooms?: AmenitiesIndexRes[],
  kitchens?: AmenitiesIndexRes[],
  bathrooms?: AmenitiesIndexRes[],
  common?: AmenitiesIndexRes[],
  livingrooms?: AmenitiesIndexRes[],
  others?: AmenitiesIndexRes[],
  entertainment?: AmenitiesIndexRes[],
  outdoors?: AmenitiesIndexRes[],
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.24,
      color: mainColor.titleText,
      fontWeight: 'bold'
    },
    rowMargin: {
      marginTop: 24,
    },
    nameIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    roomAmenitiesIcon: {
      verticalAlign: 'bottom',
      width: 20,
      height: 20
    },
    roomName: {
      margin: '12px 0',
      fontWeight: 600,
      fontSize: 13
    },
    btnViewAll:{
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.24,
      color: '#54D3C2',
    },
    button: {
      margin: '30px 0 16px',
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: '12px',
        paddingLeft: '10px !important'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '13px',
        paddingLeft: '0 !important'
      }
    },
    readLess: {
      // color: deepPurple[500],
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px'
      }
    },
    buttonLess: {
      paddingLeft: '0 !important',
      [theme.breakpoints.up('md')]: {
        padding: '10px 0 !important'
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '0 !important'
      }
    },
    iconPlus: {
      fontSize: '15px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '19px'
      }
    }
  })
);

const BoxAmenities: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { facilities, bedrooms, kitchens, bathrooms, livingrooms, common, entertainment, others, outdoors } = props;
  const { t } = useTranslation();
  const [openFullAmen, setOpenFullAmen] = useState<boolean>(false);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenFullAmen(!openFullAmen);
  };

  return (
    <Fragment>
      <Grid container justify='space-between' alignContent='center'>
        <Grid item>
          <Typography variant='h5' className={classes.name} gutterBottom>
            {t('rooms:amenities')}
          </Typography>
          <Typography variant='subtitle2' className={classes.subName} gutterBottom>
            {t('longtermroom:amenitiesOfRoom')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5' className={classes.btnViewAll} gutterBottom onClick={toggle} >
            {t('longtermroom:viewAll')}
          </Typography>
        </Grid>
      </Grid>

      <div>
        <Typography variant='subtitle1' className={classes.roomName}>
          {t('longtermroom:amenitiesCommon')}
        </Typography>
        {facilities === undefined || facilities.length === 0 ? (
          <Typography>{t('longtermroom:notFoundData')}</Typography>
        ) : (
            <Grid container spacing={2} justify='space-between'>
              {facilities.map((o, i) => {
                if (i < 6) return (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                )
              })}
            </Grid>
          )}
      </div>

      <DialogFullAmenities open={openFullAmen} handleClose={() => setOpenFullAmen(false)}
        facilities={facilities} kitchens={kitchens} bedrooms={bedrooms}
        bathrooms={bathrooms} common={common} livingrooms={livingrooms}
        entertainment={entertainment} others={others} outdoors={outdoors} />
    </Fragment>
  );
};

export default BoxAmenities;
