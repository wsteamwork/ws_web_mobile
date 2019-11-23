import React, { Fragment, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/mixins';

interface IProps {
  classes?: any,
  textColor?: string,
  subTextColor?: string,
  showRating?: boolean,
  showButtonBook?: boolean,
  name: string,
  isPreviewPage?: boolean,
  district: string,
  city: string,
  price:number
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    txtName: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: '34px',
      letterSpacing: 0.36,
      color: (props) => (props.textColor ? props.textColor : 'white'),
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      display: '-webkit-box'
    },
    txtPrice: {
      fontSize: 22,
      lineHeight: '28px',
      textAlign: 'right',
      letterSpacing: 0.32,
      fontWeight: 'bold',
      color: (props) => (props.textColor ? props.textColor : 'white'),
    },
    txtAddress: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0.07,
      color: (props) => (props.textColor ? props.subTextColor : 'white'),
    },
    txtPer: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13,
      lineHeight: '18px',
      letterSpacing: -0.08,
      color: (props) => (props.textColor ? props.subTextColor : 'white'),
      textAlign: 'center'
    },
    rowMarginTop: {
      marginTop: '8px'
    },
    iconEmpty: {
      color: '#51ccbb'
    },
    colorStar: {
      color: '#54D3C2'
    },
    txtReview: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0.07,
      color: '#FFFFFF',
      marginLeft: 8
    },
  })
);

const BoxInfoBasic: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {showButtonBook, showRating, name, isPreviewPage, district, city, price } = props;
  const { t } = useTranslation();
  
  return (
    <Grid container>
      <Grid item xs={9}>
        <Typography variant='h1' className={classes.txtName}>
          {isPreviewPage && !name ? t('room:updateRoomName') : name}
        </Typography>
      </Grid>
      <Grid item xs={3} container justify='flex-end' alignItems='flex-end'>
        <Grid item>
          <Typography variant='subtitle1' className={classes.txtPrice}>
            {formatPrice(price)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.rowMarginTop}>
        <Typography variant='subtitle2' className={classes.txtAddress}>
          {district}, {city}
        </Typography>
      </Grid>
      <Grid item xs={3} container justify='flex-end' alignItems='flex-end'>
        <Grid item>
          <Typography variant='subtitle2' className={classes.txtPer}>
            {t('longtermroom:perMonth')}
          </Typography>
        </Grid>
      </Grid>
      {showRating && (
        <Grid item xs={12} className={classes.rowMarginTop} container alignItems='center'>
          <Rating
            name="customized-empty"
            readOnly
            size="small"
            value={4.5}
            precision={0.5}
            classes={{ root: classes.colorStar }}
            emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.iconEmpty} />}
          />
          <span className={classes.txtReview}>
            80 Đánh giá
          </span>
        </Grid>
      )}
      
      {showButtonBook && (
        <Grid item xs={12} className={classes.rowMarginTop}>
        <ButtonGlobal
          width='100%'
          textColor='#fff'
          background='#54D3C2'
          onClick={() => { alert('ok') }}
        >
          Đặt phòng
            </ButtonGlobal>
      </Grid>
      )}
    </Grid>
  );
};

export default BoxInfoBasic;
