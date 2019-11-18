import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import _ from 'lodash';
import numeral from 'numeral';
import React, { FC, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    value: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 8
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const IncludedFee: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/included-fee`);
  };
  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title="Phí dịch vụ dài hạn" onClick={openUpdate}>
          {listing.prices && listing.prices.prices && listing.prices.prices.term_1_month == 0 ? <b>Chưa cập nhật</b> : (
            <Grid container>
              {_.map(listing.prices.included_fee, (o, i) =>
                o.included === 0 ? (
                  <Grid item xs={12} sm={6} key={i} className={classes.value}>
                    {o.name}:&nbsp;
                <span className={classes.name}>
                      {o.calculate_function == 3 ? `${o.calculate_function_txt}` : `${numeral(o.value).format('0,0')} vnđ | ${o.calculate_function_txt}`}
                    </span>
                  </Grid>
                ) : (
                    <Grid item xs={12} sm={6} key={i} className={classes.value}>
                      {o.name}:&nbsp;
                      <span className={classes.name}>Đã bao gồm trong giá thuê nhà</span>
                    </Grid>
                  )
              )}
            </Grid>)}
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default IncludedFee;
