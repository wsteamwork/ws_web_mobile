import React, { FC, useState, SyntheticEvent, useContext, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Box, Hidden } from '@material-ui/core';
import CreateApartmentForListing from '@/components/LTR/Merchant/Listing/CreateListing/CreateApartment';
import BottomAction from '@/components/LTR/Merchant/Listing/CreateListing/CreateApartment/BottomAction';
import { CreateApartmentState, CreateApartmentActions, getDataBuilding, handleUpdateBuilding } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateApartment';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Dispatch } from 'redux';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxImgIntro: {
      backgroundImage: `url('../../../static/images/img_intro.jpg')`,
      position: 'fixed',
      width: '33.33%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      backgroundColor: '#f5f6f8',
      padding: '32px'
    },
    boxFeature: {
      padding: '32px'
    },
    imgType: {
      width: 300,
      height: 225,
      objectFit: 'cover',
      borderRadius: 16,
      WebkitFilter: 'grayscale(100%)',
      filter: 'grayscale(100%)',
      WebkitTransition: '.3s ease-in-out',
      transition: '.3s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        WebkitFilter: 'grayscale(0)',
        filter: 'grayscale(0)'
      }
    }
  })
);

const UpdateApartment: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router, width } = useContext(GlobalContext);
  const id = router.query.id;
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const dispatch = useDispatch<Dispatch<CreateApartmentActions>>();
  const {
    name,
    name_en,
    address,
    avatar,
    city_id,
    district_id,
    coordinate,
    disableSubmit
  } = useSelector<ReducersList, CreateApartmentState>((state) => state.createApartment);
  useEffect(() => {
    getDataBuilding(id, dispatch)
  }, []);
  const handleBack = () => {
    router.push(`/host/create-listing`);
  };
  const CreateBuilding: any = () => {
    const res = handleUpdateBuilding(id,{
      avatar: avatar,
      name: name,
      name_en: name_en,
      address: address,
      lat: coordinate.lat,
      lng: coordinate.lng,
      city_id: city_id,
      district_id: district_id
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật tòa nhà thành công !');
      router.push(`/host/building-list`);
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật tòa nhà thất bại !');
    }
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Grid container>
      <Hidden smDown>
        <Grid item md={4}>
          <div className={classes.boxImgIntro}>
            <a href="/">
              <img src="../../../static/images/Logo-westay.png" alt="westay.vn" width={150} />
            </a>
          </div>
        </Grid>
      </Hidden>
      <Grid item xs={11} md={8}>
        <Box pl={width === 'sm'|| width === 'xs' ? 5 : 14} pt={5}>
          <CreateApartmentForListing />
          <BottomAction
            widthMd={6}
            handleSave={CreateBuilding}
            handleBack={handleBack}
            openSnack={openSnack}
            messageSnack={messageSnack}
            statusSnack={statusSnack}
            disabledSave={disableSubmit}
            handleCloseSnack={handleCloseSnack}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpdateApartment;
