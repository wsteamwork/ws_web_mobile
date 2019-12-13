import { GlobalContext } from '@/store/Context/GlobalContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { FC, useContext } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import { useSelector } from 'react-redux';

interface IProps { }

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    maxWidthContainer: {
      marginTop: '1.2rem',
      maxWidth: '16.5%',
    },
    propertyItemIcon: {
      display: 'flex',
      justifyContent: 'center'
    },
    itemIcon: {
      padding: '3px',
      objectFit: 'cover',
      borderRadius: '50%',
      minWidth: '65px'
    }
  }))

const RoomTypeList: FC<IProps> = (props) => {
  const classes = useStyles(props)
  const { width } = useContext(GlobalContext);
  const propertyImgs = ['house', 'apartment', 'villa', 'room', 'hotels', 'studio'];
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );

  const redirectByProperty = (type: any) => {
    updateRouter(leaseTypeGlobal ? '/long-term-rooms' : '/rooms', true, 'accommodation_type', type);
  };
  const arrayData = [
    { id: 1, value: "Full House", img: "/static/images/property/house.jpg" },
    { id: 2, value: "Apartment", img: "/static/images/property/apartment.jpg" },
    { id: 3, value: "Villa", img: "/static/images/property/villa.jpg" },
    { id: 4, value: "Private Room", img: "/static/images/property/room.jpg" },
    { id: 5, value: "Hotel", img: "/static/images/property/hotels.jpg" },
    { id: 6, value: "Studio", img: "/static/images/property/studio.jpg" }
  ]
  const params = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  }
  return (
    <div style={{ paddingLeft: '18px' }}>
      <Swiper {...params}>
        {
          arrayData.map((item, index) => (
            <Grid key={index} onClick={() => redirectByProperty(item.id)}>
              <Grid className={classes.propertyItemIcon}>
                <img className={classes.itemIcon} style={{ width: 65, height: 65 }} src={item.img}></img>
              </Grid>
              <Typography style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: 4 }}>
                {item.value}
              </Typography>
            </Grid>
          ))
        }
      </Swiper>
    </div>

  );
};
export default RoomTypeList;
