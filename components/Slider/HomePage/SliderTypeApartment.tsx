import CardIntro from '@/components/Cards/CardIntro';
import ListRoom from '@/components/ListRoom';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { TypeApartment } from '@/types/Requests/Rooms/RoomResponses';
import { Grid, Hidden, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { FC, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';

interface Iprops {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8)
    },
    paddingGrid: {
      padding: 4
    }
  })
);

const SliderTypeApartment: FC<Iprops> = (props: Iprops) => {
  const classes = useStyles(props);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  const apartments = useSelector<ReducersList, TypeApartment[]>(
    (state) => state.roomHomepage.apartments
  );

  const SearchType = (idType: number) => {
    updateRouter('/rooms', true, 'type_room', idType);
  };

  const settings = {
    slidesPerView: 1.5,
    speed: 800,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => <PrevArrow className="swiper-button-prev"></PrevArrow>,
    renderNextButton: () => <NextArrow className="swiper-button-next"></NextArrow>,
    breakpoints: {
      1920: {
        slidesPerView: 5
      },
      1366: {
        slidesPerView: 4
      },
      960: {
        slidesPerView: 1.9,
        freeMode: true
      },
      600: {
        slidesPerView: 1.2
      }
    }
  };

  const renderRoom = (room) => (<div className={classes.paddingGrid}>
    <CardIntro
      imgHeight={width === 'xl' ? 250 : 200}
      imgSrc={room.image}
      title={room.value}
      onClickCard={() => SearchType(room.id)}
    />
  </div>);

  return (
    apartments && (
      <Fragment>
        <Hidden xsDown implementation="css">
          <Grid container spacing={2} justify="flex-start" className={classes.root}>
            {_.map(apartments, (obj, i) =>
              obj.status === 1 ? (
                <Grid item xs={4} sm={4} md={4} lg={3} key={i}>
                  <CardIntro
                    imgHeight={width === 'xl' ? 250 : 200}
                    imgSrc={obj.image}
                    title={obj.value}
                    onClickCard={() => SearchType(obj.id)}
                  />
                </Grid>
              ) : (
                  ''
                )
            )}
          </Grid>
        </Hidden>

        <Hidden smUp implementation="css">
          <div className={classes.root}>
            <ListRoom
              roomData={apartments}
              usingSlider={true}
              render={renderRoom}
            />
            {/* <Swiper {...settings}>
              {_.map(apartments, (obj, i) =>
                // obj.status === 1 ?
                (
                  <div key={i} className={classes.paddingGrid}>
                    <CardIntro
                      imgHeight={width === 'xl' ? 250 : 200}
                      imgSrc={obj.image}
                      title={obj.value}
                      onClickCard={() => SearchType(obj.id)}
                    />
                  </div>
                ) : (
                  ''
                )
              )}
            </Swiper> */}
          </div>
        </Hidden>
      </Fragment>
    )
  );
};

export default SliderTypeApartment;
