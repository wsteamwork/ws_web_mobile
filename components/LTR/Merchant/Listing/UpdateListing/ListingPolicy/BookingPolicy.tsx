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

const BookingPolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const instant_book_txt =
    'Tất cả khách đều có thể đặt phòng ngay lập tức, điều này sẽ cần chủ nhà phải đảm bảo lịch trống trên hệ thống của Westay bằng cách khóa phòng những ngày không cho phép đặt';
  const normal_book_txt =
    'Tất cả khách đặt phòng đều phải chờ phản hồi từ phía bạn, sau đó mới có thể thanh toán và hoàn thành booking';
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/booking-policy`);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Hình thức đặt phòng" onClick={openUpdate}>
          <Typography variant="subtitle1" className={classes.name}>
            {listing.short_term_room.instant_book_txt}
          </Typography>
          <Grid container>
            <span>{listing.short_term_room.instant_book === 1 ? instant_book_txt : normal_book_txt}</span>
          </Grid>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default BookingPolicy;
