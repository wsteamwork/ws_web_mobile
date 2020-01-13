import { GlobalContext } from '@/store/Context/GlobalContext';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { FC, Fragment, useContext } from 'react';
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
      }
    }
  })
);

const GuideBook: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const openUpdate = () => {
    router.push(`/host/update-listing/${id}/guidebook`);
  };
  return (
    <Fragment>
      <CardWrapperItem title="Xung quanh căn hộ" onClick={openUpdate}>
        <Grid container>
          <Grid item xs={12} className={classes.marginBottom}>
            Để giúp khách hàng hiểu rõ hơn về căn hộ, vui lòng cập nhật thêm các địa diểm lân cận của căn hộ này.
          </Grid>
        </Grid>
      </CardWrapperItem>
    </Fragment>
  );
};
export default GuideBook;
