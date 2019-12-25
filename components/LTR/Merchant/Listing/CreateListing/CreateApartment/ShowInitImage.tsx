import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import React, { FC, Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any;
  label?: string;
  subLabel?: string;
  img?: string;
  reload?: boolean;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapper: {
      marginBottom: theme.spacing(3)
    },
    textField: {
      width: '100%'
    },
    cardContent: {
      padding: '0 10px',
      '&:last-child': {
        paddingBottom: 0
      }
    },
    card: {
      position: 'relative'
    },
    media: {
      height: 250,
      border: '3px solid #ededed',
      borderRadius: 5
    },
    marginLabel: {
      marginBottom: theme.spacing(3)
    },
    cardAction: {
      color: '#ffffff',
      padding: theme.spacing(0, 1),
      position: 'absolute',
      top: '7%',
      left: '5%',
      zIndex: 10,
      boxSizing: 'border-box',
      display: 'flex',
      cursor: 'pointer',
      width: '30px',
      height: '30px',
      backgroundColor: '#484848',
      border: '1px solid lightgray',
      borderRadius: '50%'
    }
  })
);

const ShowInitImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { label, subLabel, img, reload } = props;
  // const imageExists = useMemo(
  //   () => {
  //     let http = new XMLHttpRequest();
  //     http.open('GET', IMAGE_STORAGE_LG + img, false);
  //     http.setRequestHeader('Accept', 'application/json');
  //     http.send();
  //     return http.status != 404;
  //   },
  //   [img]
  // );
  return useMemo(
    () => (
      <Fragment>
        <Grid className={classes.wrapper}>
          <Grid container className={classes.marginLabel}>
            <Grid container item xs={12}>
              <Typography variant="h1" className="label sub_label">
                {label}
              </Typography>
            </Grid>
            <Grid item className="normal_text">
              <span>{subLabel}</span>
            </Grid>
          </Grid>
          {img.length > 0 && (
            <Grid container spacing={3}>
              <Grid className={classes.card} item xs={12}>
                <Card>
                  <CardMedia
                    className={classes.media}
                    image={IMAGE_STORAGE_LG + img}
                    title="Image"
                  />
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Fragment>
    ),
    [img, reload]
  );
};

export default ShowInitImage;
