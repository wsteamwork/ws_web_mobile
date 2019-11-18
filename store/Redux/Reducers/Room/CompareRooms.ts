import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Reducer } from 'redux';
import { updateObject } from '@/store/Context/utility';

export type CompareRoomsState = {
  readonly compareRooms: RoomIndexRes[];
};

export type CompareRoomsActions = { type: 'SET_COMPARISON_LIST'; comparisonList: RoomIndexRes[] };

const init: CompareRoomsState = {
  compareRooms: []
};

export const ComparisonListReducer: Reducer<CompareRoomsState,CompareRoomsActions> = (
  state: CompareRoomsState = init,
  action: CompareRoomsActions
):CompareRoomsState =>{
  switch (action.type) {
    case 'SET_COMPARISON_LIST':
      return updateObject(state, { compareRooms: action.comparisonList });
    default:
      return state;
  }
}
