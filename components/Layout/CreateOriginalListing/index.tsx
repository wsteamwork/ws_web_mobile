import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, useContext } from 'react';
interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxImgIntro: {
      backgroundImage: `url('../../../static/images/img_intro.jpg')`,
      width: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      backgroundColor: '#f5f6f8',
      padding: '32px'
    },
  })
);

const CreateOriginalListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { width } = useContext<IGlobalContext>(GlobalContext);

  return (
    <Grid container>
      {width !== 'xs' && width !== 'sm' ? (
        <Grid item md={4}>
          <div className={classes.boxImgIntro}>
            <a href='/'>
              <img src='../../../static/images/Logo-westay.png' alt='westay.vn' width={150} />
            </a>
          </div>
        </Grid>
      ) : ''}
      <Grid item xs={12} md={8}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default CreateOriginalListing;
