import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
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
    }
  })
);

const Location: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/location`);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Vị trí" onClick={openUpdate}>
          <Typography variant="subtitle1" className={classes.name}>
            {listing.address}
          </Typography>
        </CardWrapperItem>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default Location;
