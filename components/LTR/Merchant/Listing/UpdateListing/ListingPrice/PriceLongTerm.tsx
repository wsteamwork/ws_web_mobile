import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
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

const PriceLongTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/price-long-term`);
  };

  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Giá thuê dài hạn" onClick={openUpdate}>
          {listing.prices && listing.prices.prices && listing.prices.prices.term_1_month == 0 ? <b>Chưa cập nhật</b> : (
            <Grid item xs={12}>
              <Grid item xs={12} className={classes.margin}>
                <Typography variant="subtitle2" className={classes.name}>
                  Giá cơ bản: {numeral(listing.prices.prices.term_1_month).format('0,0')} vnđ/ tháng
                </Typography>
              </Grid>
              <Grid container className={classes.margin}>
                <Grid item xs={12} sm={6} className={classes.marginXs}>
                  Kì hạn 2 - 3 tháng:{' '}
                  <span className={classes.name}>
                    {numeral(listing.prices.prices.term_2_month).format('0,0')} vnđ
                </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  Kì hạn 3 - 6 tháng:{' '}
                  <span className={classes.name}>
                    {numeral(listing.prices.prices.term_3_month).format('0,0')} vnđ
                </span>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.margin}>
                  Kì hạn 6 - 12 tháng:{' '}
                  <span className={classes.name}>
                    {numeral(listing.prices.prices.term_6_month).format('0,0')} vnđ
                </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  Kì hạn 1 năm trở lên:{' '}
                  <span className={classes.name}>
                    {numeral(listing.prices.prices.term_12_month).format('0,0')} vnđ
                </span>
                </Grid>
              </Grid>
            </Grid>
          )}
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default PriceLongTerm;
