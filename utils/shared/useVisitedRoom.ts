import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { VisitedRoomActions } from '@/store/Redux/Reducers/Room/visitedRoom';

export const useVisitedRoom = () => {
  const dispatch = useDispatch<Dispatch<VisitedRoomActions>>();
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const visitedRoom = useSelector<ReducersList, RoomIndexRes[]>(
    (state) => state.visitedRoom.visitedRoom
  );

  useEffect(() => {
    !!room && dispathVisited();
  }, [room]);

  const dispathVisited = () => {
    const visited = visitedRoom.slice(0, 2);

    if (!visitedRoom.some((item) => item.id === room.id)) {
      visited.unshift(room);
      dispatch({ type: 'SET_ROOM_VISITED', payload: visited });
    }
  };

  return [];
};
