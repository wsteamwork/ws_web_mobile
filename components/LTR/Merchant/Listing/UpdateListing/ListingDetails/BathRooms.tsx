import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import _ from 'lodash';
import React, { FC, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    margin: {
      marginBottom: 8,
    },
    marginTop: {
      marginTop: 16,
    }
  })
);

const BathRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/bathrooms`);
  };
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title={`Phòng tắm (${listing.bathrooms.number_bathroom})`} onClick={openUpdate}>
          {_.times(listing.bathrooms.number_bathroom, (i) => (
            <Fragment key={i}>
              <Grid item xs={6} sm={4} className={i > 2 ? classes.marginTop : ''}>
                <Grid item xs={12} className={classes.margin}>
                  <Typography variant="subtitle2" className={classes.name}>
                    Phòng tắm {i + 1}
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item xs={12} className={classes.nameIcon}>
                    Số ảnh:{' '}
                    <span className={classes.name}>
                      {listing.bathrooms[`bathroom_${i + 1}`]
                        ? listing.bathrooms[`bathroom_${i + 1}`].images.length
                        : 0}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          ))}
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default BathRooms;
