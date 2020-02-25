import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, makeStyles, Theme, Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardWrapperItem from '../CardWrapperItem';
import { GlobalContext } from '@/store/Context/GlobalContext';
import {
  getWeekdayPrice,
  StepPricesActions
} from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { Dispatch } from 'redux';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapperContent: {
      marginBottom: 16
    },
    margin: {
      marginBottom: 8
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    wrapperValue: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    mdDown: {
      marginBottom: 8
    }
  })
);

const WeekdayPrice: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { t } = useTranslation();

  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/weekday`);
  };
  const { weekday } = useSelector<ReducersList, any>((state) => state.stepPrice);
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  useEffect(() => {
    if (listing) {
      getWeekdayPrice(listing.room_id, dispatchStep);
    }
  }, []);
  return (
    <Fragment>
      <CardWrapperItem title="Giá cuối tuần" onClick={openUpdate}>
        {!!listing && weekday.length
          ? weekday.map((w, i) => (
            <Fragment key={i}>
              <Grid
                item
                xs={12}
                className={weekday.length !== i + 1 ? classes.wrapperContent : ''}>
                <Grid item xs={12} className={classes.margin}>
                  <Typography variant="subtitle2" className={classes.name}>
                    {w.weekday === 1 ? 'Chủ nhật' : `Thứ ${w.weekday}`}
                  </Typography>
                </Grid>
                <Grid container className={classes.wrapperValue}>
                  {listing.short_term_room.rent_type !== 1 ? (
                    <Grid item lg={6} sm={6} xs={12} className={classes.mdDown}>
                      Theo ngày:{' '}
                      <span className={classes.name}>
                        {numeral(w.price_day).format('0,0')} {t('shared:currency')}
                      </span>
                    </Grid>
                  ) : (
                      ''
                    )}
                  {listing.short_term_room.rent_type !== 2 ? (
                    <Grid item lg={6} sm={6} xs={12} className={classes.mdDown}>
                      Theo giờ:{' '}
                      <span className={classes.name}>
                        {numeral(w.price_hour).format('0,0')} {t('shared:currency')}
                      </span>
                    </Grid>
                  ) : (
                      ''
                    )}
                  {listing.short_term_room.rent_type !== 2 ? (
                    <Grid item lg={6} sm={6} xs={12}>
                      Phụ thu thêm giờ:{' '}
                      <span className={classes.name}>
                        {numeral(w.price_after_hour).format('0,0')} {t('shared:currency')}
                      </span>
                    </Grid>
                  ) : (
                      ''
                    )}
                </Grid>
              </Grid>
            </Fragment>
          ))
          : ''}
      </CardWrapperItem>
    </Fragment>
  );
};
export default WeekdayPrice;
