import GuideBookItem from '@/components/GuideBookItem';
import DialogGuideBookMap from '@/components/GuideBookItem/DialogGuideBookMap';
import GuideBookPlacesList from '@/components/GuideBookPlacesList';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { getDataPlacesListing, getGuideBookList, UpdateDetailsActions, UpdateDetailsState } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 64
    },
    boxLeft: {
      marginBottom: 100,
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 20
      }
    },
    marginTop: {
      marginTop: 32
    },
    alignCenter: {
      textAlign: 'center',
      marginBottom: 20
    }
  })
);
interface IProps {
  classes?: any;
}

const UpdateGuideBook: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [openDialogMap, setOpenDialogMap] = useState(false);
  const [currentGuide, setcurrentGuide] = useState<number>(0);
  const [clearAddress, setClearAddress] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { room_id, guidebooks } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const iconUrls = [
    'park.svg',
    'drinks.svg',
    'food.svg',
    'shopping.svg',
    'entertainment.svg',
    'bus.svg'
  ];
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  useEffect(() => {
    getDataPlacesListing(id, dispatch);
  }, [room_id]);
  useEffect(() => {
    getGuideBookList(dispatch);
  }, []);
  const handleOpenMap = (i: number) => {
    if (currentGuide !== i) {
      setClearAddress(true);
      setcurrentGuide(i);
    } else {
      setClearAddress(false);
    }
    setOpenDialogMap(true);
  };
  return (
    <Fragment>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={10} className={classes.boxLeft}>
          <Grid item xs={12} sm={12} md={7} style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item container xs={12} sm={11} md={11} className={classes.wrapper}>
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.alignCenter}>
                <Typography variant="h1" gutterBottom className="label main_label">
                  Bổ sung địa điểm xung quanh căn hộ
                </Typography>
                <Typography variant="h6" className="normal_text">
                  Dưới đây là bộ địa điểm được người dùng quan tâm nhiều nhất, để bổ sung địa điểm, vui lòng click vào nhóm điạ điểm tương ứng
                </Typography>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} lg={12} className={classes.boxLeft}>
                {guidebooks.length > 0
                  ? guidebooks.map((o, i) => (
                    <Grid key={i} item xs={4} className={i > 2 ? classes.marginTop : ''}>
                      <GuideBookItem
                        handleOpenDialogMap={() => handleOpenMap(o.id)}
                        iconUrl={`/static/guidebook/${iconUrls[i]}`}
                        text={o.name}
                        selected={currentGuide === o.id}
                      />
                    </Grid>
                  ))
                  : ''}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={5} className={classes.wrapper}>
            <Grid item xs={11} sm={9} md={9}>
              <GuideBookPlacesList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogGuideBookMap
        clearAddress={clearAddress}
        guidebook_category_id={currentGuide}
        open={openDialogMap}
        handleClose={() => setOpenDialogMap(false)}
      />
    </Fragment>
  );
};

export default UpdateGuideBook;
