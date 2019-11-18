import { useContext, useEffect } from 'react';
import { RoomIndexContext, getRooms, getLTRooms } from '@/store/Context/Room/RoomListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface ReturnUseRefresh {
  isMapOpen: boolean;
}

export const useRefreshListing = (): ReturnUseRefresh => {
  const { router } = useContext(GlobalContext);
  const { state: stateRoomIndex, dispatch: dispatchIndexRoom } = useContext(RoomIndexContext);
  const { isMapOpen, coords } = stateRoomIndex;
  const leaseTypeGlobal = useSelector<ReducersList, 0|1>((state) => state.searchFilter.leaseTypeGlobal);

  const getData = async () => {
    dispatchIndexRoom({ type: 'setLoading', isLoading: true });

    try {
      if (leaseTypeGlobal){
        const res = await getLTRooms(router,coords);
        dispatchIndexRoom({ type: 'setlongtermRooms', longtermRooms: res.data, meta: res.meta });
        // dispatchIndexRoom({ type: 'setMeta', meta: res.meta });
      } else {
        const res = await getRooms(router, coords);
        dispatchIndexRoom({ type: 'setRooms', rooms: res.data, meta: res.meta });
      }
      dispatchIndexRoom({ type: 'setLoading', isLoading: false });
    } catch (error) {
      dispatchIndexRoom({ type: 'setLoading', isLoading: false });
    }
  };

  useEffect(() => {
    getData();
  }, [router.query, coords]);


  return { isMapOpen };
};
