import { GlobalContext } from '@/store/Context/GlobalContext';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useContext, useMemo, useState } from 'react';
import 'react-animated-slider/build/horizontal.css';
import { useTranslation } from 'react-i18next';
import '/styles/pages/LTR/room/index.scss';
import BoxInfoBasic from '../BoxInfoBasic';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
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
    boxViewMore:{
      position: 'absolute',
      width: '90%',
      borderRadius: 20,
      bottom: '0%',
      left: '50%',
      transform: 'translate(-50%, -35%)',
      background: 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(27.1828px)',
      padding: '14px 18px'
    }
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
        <BoxInfoBasic showRating showButtonBook />
      </div>
      <Grid container justify='center' alignItems='center' className={classes.boxViewMore}>
        <span style={{color:'#fff'}}>Xem chi tiết</span>
        <KeyboardArrowDownRounded style={{color:'#fff'}}/>
      </Grid>
    </div>
  );
};

export default BoxImageLT;
