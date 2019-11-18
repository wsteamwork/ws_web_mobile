import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import numeral from 'numeral';
import React, { FC, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
import { GlobalContext } from '@/store/Context/GlobalContext';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    margin: {
      marginBottom: 8
    },
    marginXs: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8
      }
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const PriceShortTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/price-short-term`);
  };
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Giá thuê ngắn hạn" onClick={openUpdate}>
          <Grid item xs={12}>
            <Grid container className={classes.margin}>
              {listing.short_term_room.rent_type !== 1 ? (
                <Grid item xs={12} sm={6} className={classes.marginXs}>
                  Giá theo ngày:{' '}
                  <span className={classes.name}>
                    {numeral(listing.short_term_room.price_day).format('0,0')} vnđ
                  </span>
                </Grid>
              ) : (
                  ''
                )}
              {listing.short_term_room.rent_type !== 2 ? (
                <Grid item xs={12} sm={6}>
                  Giá theo giờ:{' '}
                  <span className={classes.name}>
                    {numeral(listing.short_term_room.price_hour).format('0,0')} vnđ
                  </span>
                </Grid>
              ) : (
                  ''
                )}
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.margin}>
                Phụ thu thêm người:{' '}
                <span className={classes.name}>
                  {numeral(listing.short_term_room.price_charge_guest).format('0,0')} vnđ
                </span>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.marginXs}>
                Phụ thu thêm giờ:{' '}
                <span className={classes.name}>
                  {numeral(listing.short_term_room.price_after_hour).format('0,0')} vnđ
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.margin}>
                Phí dọn dẹp:{' '}
                <span className={classes.name}>
                  {numeral(listing.short_term_room.cleaning_fee).format('0,0')} vnđ
                </span>
              </Grid>
            </Grid>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default PriceShortTerm;
