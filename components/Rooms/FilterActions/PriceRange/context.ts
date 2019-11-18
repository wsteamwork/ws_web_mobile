import { GlobalContext } from '@/store/Context/GlobalContext';
import { MAX_PRICE, MIN_PRICE, RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import numeral from 'numeral';
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useSelector } from 'react-redux';

type ReturnUsePriceRange = {
  open: boolean;
  onHide?: () => void;
  checkPrice: string;
  hanldeOpen?: MouseEventHandler;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleRemove?: MouseEventHandler;
};

export const usePriceRange = (): ReturnUsePriceRange => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(RoomFilterContext);
  const { router } = useContext(GlobalContext);
  const { query } = router;
  const { price_day_from, price_day_to } = state;
  const leaseTypePathName = useSelector<ReducersList, string>(
    (state) => state.searchFilter.leaseTypePathName
  );
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );

  const queryMinPrice = leaseTypeGlobal ? query.min_price : query.price_day_from;
  const queryMaxPrice = leaseTypeGlobal ? query.max_price : query.price_day_to;
  const paramMinPrice = leaseTypeGlobal ? 'min_price' : 'price_day_from';
  const paramMaxPrice = leaseTypeGlobal ? 'max_price' : 'price_day_to';

  const checkPrice = useMemo<string>(() => {
    if (price_day_from === MIN_PRICE && price_day_to === MAX_PRICE) {
      return '';
    } else if (price_day_to !== MIN_PRICE && price_day_from === MIN_PRICE) {
      return `đ 0 - ${numeral(price_day_to).format('0,0')}`;
    } else if (price_day_from !== MIN_PRICE && price_day_to > price_day_from) {
      return `đ ${numeral(price_day_from).format('0,0')} - ${numeral(price_day_to).format('0,0')}`;
    }

    return '';
  }, [price_day_from, price_day_to]);

  useEffect(() => {
    if (!!queryMinPrice && !!queryMaxPrice) {
      dispatch({
        type: 'setPrices',
        price_day_from: parseInt(queryMinPrice as string, 10),
        price_day_to: parseInt(queryMaxPrice as string, 10)
      });
    }
  }, [query]);

  const onHide = () => {
    setOpen(false);
  };

  const hanldeOpen = () => {
    setOpen(true);
  };

  const handleRemove = () => {
    setOpen(false);
    dispatch({ type: 'setPrices', price_day_from: MIN_PRICE, price_day_to: MAX_PRICE });
    updateRouter(leaseTypePathName, true, paramMinPrice, MIN_PRICE, paramMaxPrice, MAX_PRICE);
  };

  return {
    open,
    onHide,
    checkPrice,
    hanldeOpen,
    setOpen,
    handleRemove
  };
};
