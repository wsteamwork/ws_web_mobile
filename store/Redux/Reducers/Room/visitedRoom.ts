import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Reducer } from 'redux';
import { updateObject } from '@/store/Context/utility';

export type VisitedRoomState = {
  readonly visitedRoom: RoomIndexRes[];
};

export type VisitedRoomActions = { type: 'SET_ROOM_VISITED'; payload: RoomIndexRes[] };

const init: VisitedRoomState = {
  visitedRoom: []
};

export const visitedRoomReducer: Reducer<VisitedRoomState, VisitedRoomActions> = (
  state: VisitedRoomState = init,
  action: VisitedRoomActions
): VisitedRoomState => {
  switch (action.type) {
    case 'SET_ROOM_VISITED':
      return updateObject(state, { visitedRoom: action.payload });
    default:
      return state;
  }
};
