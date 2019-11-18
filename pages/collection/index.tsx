// import CardIntro from '@/components/Cards/CardIntro';
// import GridContainer from '@/components/Layout/Grid/Container';
// import RoomCard from '@/components/RoomCard';
import NavHeader from '@/components/Toolbar/NavHeader';
import { NextContextPage, ReducersList } from '@/store/Redux/Reducers';
// import { getCollectionById } from '@/store/Redux/Reducers/Home/roomHomepage';
import { getCookieFromReq } from '@/utils/mixins';
// import { IMAGE_STORAGE_LG } from '@/utils/store/global';
// import Grid from '@material-ui/core/Grid/Grid';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import { NextPage } from 'next';
// import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
// import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import React, { Fragment, useState } from 'react';
// import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll/modules';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
// import { Collections } from '../../types/Requests/Rooms/RoomResponses';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    boxTitle: {
      textAlign: 'center',
      width: '50%',
      transform: 'translateX(-50%)',
      left: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '85%'
      }
    },
    title: {
      fontSize: '2.3rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.9rem'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.7rem'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.3rem'
      }
    },
    subTitle: {
      fontSize: '1rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1rem'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem'
      }
    },
    boxPagination: {
      display: 'flex',
      justifyContent: 'center'
    },
    width: {
      width: '25%'
    },
    wrapper: {
      marginTop: theme.spacing(3)
    }
  })
);

const Collection: NextPage = (props) => {
  const classes = useStyles(props);
  // const collection = useSelector<ReducersList, Collections>(
  //   (state) => state.roomHomepage.collectionById
  // );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(12);
  // const [rooms, setRooms] = useState<any>(collection.rooms.data);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  // const newData = rooms.slice(indexOfFirst, indexOfLast);

  const scrollTop = () => {
    let duration = 500 + window.scrollY * 0.1;
    let effect: Partial<ReactScrollLinkProps> = {
      smooth: 'easeInOutQuad',
      isDynamic: true,
      duration
    };
    scroll.scrollToTop(effect);
  };

  const ChangePage = (current: number) => {
    setCurrentPage(current);
    scrollTop();
  };
  return (
    <Fragment>
      <NavHeader></NavHeader>
      {/* {collection && (
        <Fragment>
          <Grid container>
            <Grid item xs={12}>
              <CardIntro
                imgHeight={400}
                imgSrc={`${IMAGE_STORAGE_LG}${collection.image}`}
                title={collection.details.data[0].name}
                showSubTitle={true}
                customClasses={{
                  boxTitle: classes.boxTitle,
                  title: classes.title,
                  subTitle: classes.subTitle
                }}
                subTitle={collection.details.data[0].description}
              />
            </Grid>
          </Grid>
          <GridContainer xs={11} lg={10}>
            <Grid
              container
              className={classes.wrapper}
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}>
              {_.map(newData, (room, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <RoomCard
                    room={room}
                    isHomepage={false}
                    showIcon={true}
                    showBedRoom={true}
                    showAddress={false}></RoomCard>
                </Grid>
              ))}
            </Grid>
            {collection.rooms.data.length > 12 ? (
              <Grid item xs={12} className={classes.boxPagination}>
                <Pagination
                  className="rooms-pagination"
                  total={rooms.length}
                  locale={localeInfo}
                  pageSize={pageSize}
                  current={currentPage}
                  onChange={ChangePage}
                />
              </Grid>
            ) : (
                ''
              )}
          </GridContainer>
        </Fragment>
      )} */}
    </Fragment>
  );
};

Collection.getInitialProps = async ({ query, store, req }: NextContextPage) => {
  const initLanguage = getCookieFromReq(req, 'initLanguage');

  // if (!store.getState().roomHomepage.collectionById) {
  //   const data = await getCollectionById(query.id, store.dispatch, initLanguage);
  // }
  return {};
};

export default Collection;
