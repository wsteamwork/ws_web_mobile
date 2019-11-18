import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
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
    rentType: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const RentAndRoomType: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/rent-and-roomtype`);
  };
  const openLongTermRoomProcess = () => {
    router.push(`/host/create-listing/${id}/process`);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Loại phòng và hình thức thuê" onClick={openUpdate}>
          <Typography variant="subtitle1" className={classes.name}>
            {listing.accommodation_type_txt}
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.marginBottom}>
              Ngắn hạn:{' '}
              <span className={classes.rentType}>{listing.short_term_rent_type.rent_type_txt}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              Dài hạn:{' '}
              {listing.prices && listing.prices.prices && listing.prices.prices.term_1_month == 0 ? <b style={{ cursor: 'pointer' }} onClick={openLongTermRoomProcess}>Cập nhật thông tin</b> : (
                <span className={classes.rentType}>{listing.long_term_rent_type.rent_type_txt}</span>
              )}
            </Grid>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default RentAndRoomType;
