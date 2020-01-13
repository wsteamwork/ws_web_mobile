import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC } from 'react';
import GuideBookPlacesItem from './GuideBookPlacesItem';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({

  })
);

const GuideBookPlacesList: FC<IProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Grid container>
      <GuideBookPlacesItem guidebook_category_id={7} />
      <GuideBookPlacesItem guidebook_category_id={8} />
      <GuideBookPlacesItem guidebook_category_id={9} />
      <GuideBookPlacesItem guidebook_category_id={10} />
      <GuideBookPlacesItem guidebook_category_id={11} />
      <GuideBookPlacesItem guidebook_category_id={12} />
    </Grid>
  );
};

export default GuideBookPlacesList;
