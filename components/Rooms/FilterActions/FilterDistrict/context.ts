import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { DistrictRes } from '@/types/Requests/Districts/DistrictResponse';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { useSelector } from 'react-redux';

export type ResDataFilter = ReturnType<typeof changeDataWithEntries>;

export const getDataFilter = async (
  setData: Dispatch<SetStateAction<ResDataFilter>>,
  city_id: string | string[]
): Promise<ResDataFilter> => {
  const res: AxiosRes<DistrictRes[]> = await axios.get(`districts?city_id=${city_id}`);
  //   console.log(res);
  const resChangeWithReducer = changeDataWithReduce(res.data.data);
  const resChangeWithEntries = changeDataWithEntries(resChangeWithReducer);
  setData(resChangeWithEntries);
  return resChangeWithEntries;
};

interface ChangeWithReduce {
  [key: string]: DistrictRes[];
}

const changeDataWithReduce = (data: DistrictRes[]): ChangeWithReduce => {
  //   console.log(data);
  return data.reduce((a, b) => {
    // console.log(a, b);
    if (a[b.name]) {
      a[b.name] = [...a[b.name], b];
    } else {
      a[b.name] = [b];
    }
    // console.log(a);
    return a;
  }, {});
};

const changeDataWithEntries = (data: ChangeWithReduce): [string, DistrictRes[]][] => {
  return Object.entries(data);
};

interface ReturnUseFilterRoom {
  data: ResDataFilter;
  dataClick: number[];
  handleChange: (id: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  handleSubmit: MouseEventHandler;
  handleClose: MouseEventHandler;
}

export const useFilterRoom = (
  setDataClick: Dispatch<SetStateAction<number[]>>,
  dataClick: number[],
  setOpen: Dispatch<SetStateAction<boolean>>
): ReturnUseFilterRoom => {
  const [data, setData] = useState<ResDataFilter>([]);
  const { state, dispatch } = useContext(RoomFilterContext);
  const { router } = useContext(GlobalContext);
  //   console.log(router);
  const city_id = router.query.city_id ? router.query.city_id : undefined;
  const { query } = router;
  const { districts } = state;
  const leaseTypePathName = useSelector<ReducersList, string>(
    (state) => state.searchFilter.leaseTypePathName
  );
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );

  const queryDistricts = leaseTypeGlobal ? query.district_id : query.districts;
  const paramDistricts = leaseTypeGlobal ? 'district_id' : 'districts';

  useEffect(() => {
    getDataFilter(setData, city_id);
  }, [city_id]);

  useEffect(() => {
    if (!!queryDistricts) {
      const data = queryDistricts as string;
      const res: number[] = data.split(',').map(function(i) {
        return parseInt(i, 10);
      });

      dispatch({ type: 'setDistrictsFilter', districts: res });
    }
  }, [query]);

  const handleChange = (id: number) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked === true) {
      setDataClick([...dataClick, id]);
    } else {
      const dataCheckboxUnCheck = dataClick.filter((i) => i !== id);
      setDataClick(dataCheckboxUnCheck);
    }
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch({ type: 'setDistrictsFilter', districts: dataClick });
    updateRouter(leaseTypePathName, false, paramDistricts, dataClick, 'page', 1);
  };

  const handleClose = () => {
    setOpen(false);
    setDataClick(districts);
  };

  return { data, handleChange, dataClick, handleClose, handleSubmit };
};
