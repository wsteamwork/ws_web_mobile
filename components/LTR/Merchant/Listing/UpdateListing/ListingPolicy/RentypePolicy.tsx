import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
import { GlobalContext } from '@/store/Context/GlobalContext';

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
      }
    },
    rentType: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const RentTypePolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/rent-type-policy`);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Chính sách đặt phòng (Thuê ngắn hạn)" onClick={openUpdate}>
          <Typography variant="subtitle1" className={classes.name}>
            {listing.short_term_rent_type.rent_type_txt}
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.marginBottom}>
              Giờ nhận phòng: <span className={classes.rentType}>{listing.short_term_room.checkin}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              Giờ trả phòng: <span className={classes.rentType}>{listing.short_term_room.checkout}</span>
            </Grid>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default RentTypePolicy;
