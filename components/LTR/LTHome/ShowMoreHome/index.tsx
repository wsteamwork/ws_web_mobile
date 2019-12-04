import { Theme, Grid, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { KeyboardArrowRightRounded } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any;
  top?: string | number;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapperShowMore: {
      padding: '0 12px',
      position: 'relative',
      top: (props) => (props.top ? props.top : '-50px')
    },
    showMore: {
      textAlign: 'center',
      padding: 6,
      color: '#57D4C3'
    },
    iconMore: {
      display: 'flex',
      alignItems: 'end',
      fontWeight: 'bold'
    }
  })
);
const ShowMoreHome: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  return (
    <Grid item xs={12} className={classes.wrapperShowMore}>
      <Link component="button" variant="body2" className={classes.showMore}>
        <Typography className={classes.iconMore}>
          {t('home:show_all')} (230+)
          <KeyboardArrowRightRounded />
        </Typography>
      </Link>
    </Grid>
  );
};

export default ShowMoreHome;
