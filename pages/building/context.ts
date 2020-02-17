import { BuildingIndexContext, getBuildings } from '@/store/Context/Building/BuildingListContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface ReturnUseRefresh {
  isMapOpen: boolean;
}

export const useRefreshListing = (): ReturnUseRefresh => {
  const { router } = useContext(GlobalContext);
  const { state: stateBuildingIndex, dispatch: dispatchIndexBuilding } = useContext(
    BuildingIndexContext
  );
  const { isMapOpen, coords } = stateBuildingIndex;
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );

  const getData = async () => {
    dispatchIndexBuilding({ type: 'setLoading', isLoading: true });
    try {
      const res = await getBuildings(router, coords);
      dispatchIndexBuilding({ type: 'setBuildings', buildings: res.data, meta: res.meta });
      dispatchIndexBuilding({ type: 'setLoading', isLoading: false });
    } catch (error) {
      dispatchIndexBuilding({ type: 'setLoading', isLoading: false });
    }
  };

  useEffect(() => {
    getData();
  }, [router.query, coords]);

  return { isMapOpen };
};
