import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
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
      color: '#484848',
      marginBottom: theme.spacing(1)
    },
    marginBottom: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1)
      },
    },
    guest: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const Guests: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/number-guest`);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Thông tin khách" onClick={openUpdate}>
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.marginBottom}>
              Số khách tiêu chuẩn:{' '}
              <span className={classes.guest}>{listing.guests.recommendation}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              Số khách thêm tối đa:{' '}
              <span className={classes.guest}>{listing.guests.max_additional_guest}</span>
            </Grid>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default Guests;
