import { GlobalContext } from '@/store/Context/GlobalContext';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useContext, useMemo, useState } from 'react';
import 'react-animated-slider/build/horizontal.css';
import { useTranslation } from 'react-i18next';
import '/styles/pages/LTR/room/index.scss';
import BoxInfoBasic from '../BoxInfoBasic';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ButtonGlobal from '@/components/ButtonGlobal';
interface IProps {
  classes?: any,
  isPreviewPage?: boolean,
  backgroundImage?: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      height: '100vh',
      width: '100%',
      backgroundImage: (props) => props.backgroundImage || 'url(@/../../../../static/images/room_demo.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative',
    },
    boxInfo: {
      position: 'absolute',
      width: '90%',
      height: 204,
      borderRadius: 20,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, 25%)',
      background: 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(27.1828px)',
      padding: '14px 18px'
    },
    rowMarginTop:{
      marginTop:'8px'
    },
    iconEmpty:{
      color:'#51ccbb'
    },
    colorStar:{
      color:'#54D3C2'
    },
    txtReview:{
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

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { isPreviewPage } = props;
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();

  return (
    <div className={classes.boxContainer}>
      <div className={classes.boxInfo}>
        <BoxInfoBasic />
        <Grid container>
          <Grid item xs={12} className={classes.rowMarginTop} container alignItems='center'>
            <Rating
              name="customized-empty"
              readOnly
              size="small"
              value={2}
              precision={0.5}
              classes={{ root: classes.colorStar }}
              emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.iconEmpty} />}
            />
            <span className={classes.txtReview}>
              80 Đánh giá
            </span>
          </Grid>
          <Grid item xs={12} className={classes.rowMarginTop}>
            <ButtonGlobal 
              width='100%'
              textColor='#fff'
              background='#54D3C2'
              onClick={()=>{alert('ok')}}
              >
              Đặt phòng
            </ButtonGlobal>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default BoxImageLT;
