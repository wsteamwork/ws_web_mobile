import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { updateRouter } from '@/store/Context/utility';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Grid } from '@material-ui/core';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import ListRoom from '../ListRoom';
import LoadingSkeleton from '../Loading/LoadingSkeleton';
import NotFound from './Lotte/NotFound';
import RoomCardListing from './RoomCardListing';

interface IProps {
  classes?: any;
  rooms: RoomIndexRes[];
  hoverAction?(id: number): void;
  pageChange?(current: number, pageSize: number): void;
  usingInMap?: boolean;
}
// @ts-ignore
const RoomListing: FC<IProps> = (props) => {
  const { rooms, hoverAction, usingInMap } = props;
  const { state, dispatch } = useContext(RoomIndexContext);
  const { meta, isLoading } = state;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const changePage = (current: number) => {
    setCurrentPage(current);
    updateRouter('/rooms', true, 'page', current);
  };
  const renderRooms = (room) => (
    <LazyLoad>
      <RoomCardListing room={room} />
    </LazyLoad>
  );

  useEffect(() => {
    if (meta && meta.pagination) setCurrentPage(meta.pagination.current_page);
  }, [meta]);

  useEffect(() => {
    setIsEmpty(meta !== null && rooms.length === 0 && !isLoading);
  }, [rooms, isLoading]);

  return (
    <Fragment>
      {rooms.length > 0 && !isLoading ? (
        <Fragment>
          <ListRoom
            customClass="listRoomContainerWithoutSlickCustom"
            roomData={rooms}
            usingSlider={false}
            title={''}
            spacing={1}
            render={renderRooms}
            usingInMap={usingInMap}
            hoverAction={hoverAction}
          />
          <Pagination
            className="rooms-pagination"
            total={meta.pagination.total}
            pageSize={meta.pagination.per_page}
            current={currentPage}
            onChange={changePage}
          />
        </Fragment>
      ) : !isEmpty ? (
        <Grid>
          <LoadingSkeleton type={'rooms'} duplicate={5} />
        </Grid>
      ) : (
            <NotFound height={250} width={250} />
          )}
    </Fragment>
  );
};

export default RoomListing;
