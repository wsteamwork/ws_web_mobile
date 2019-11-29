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
      color: '#484848'
    }
  })
);

const CancelPolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/cancel-policy`);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Chính sách hủy phòng (Thuê ngắn hạn)" onClick={openUpdate}>
          <Typography variant="subtitle1" className={classes.name}>
            {listing.short_term_room.settings.booking_cancel_type_text}
          </Typography>
          <Grid container>
            <span>
              {listing.short_term_room.settings.booking_cancel_text}
            </span>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default CancelPolicy;
