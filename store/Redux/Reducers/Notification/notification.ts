import { CountUnreadRes } from '@/types/Requests/Notification/CountUnread';
import { Pagination } from '@/types/Requests/ResponseTemplate';
import { NotificationIndexRes } from '@/types/Requests/Notification/NotificationResponse';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { Reducer, Dispatch } from 'redux';
import { NextRouter } from 'next/router';
import qs from 'query-string';

export type NotificationReducerState = {
  readonly notifications: NotificationIndexRes[];
  readonly count_unread: CountUnreadRes;
  readonly meta: Pagination | null;
  readonly error: boolean;
};

export type NotificationReducerAction =
  | { type: 'setNotifications'; payload: NotificationIndexRes[]; meta?: Pagination | null }
  | { type: 'setCountUnread'; payload: CountUnreadRes }
  | { type: 'setMarkAllRead'; payload: CountUnreadRes }
  | { type: 'setMeta'; meta: Pagination }
  | { type: 'setError'; payload: boolean };

export const init: NotificationReducerState = {
  notifications: [],
  count_unread: null,
  meta: null,
  error: false
};

export const notificationReducer: Reducer<NotificationReducerState, NotificationReducerAction> = (
  state: NotificationReducerState = init,
  action: NotificationReducerAction
): NotificationReducerState => {
  switch (action.type) {
    case 'setNotifications':
      return updateObject(state, { notifications: action.payload, meta: action.meta || null });
    case 'setCountUnread':
      return updateObject(state, { count_unread: action.payload });
    case 'setMarkAllRead':
      return updateObject(state, { count_unread: action.payload });
    case 'setMeta':
      return updateObject(state, { meta: action.meta });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getNotifications = async (router: NextRouter) => {
  let params = router.query;
  let query = {
    page: params.page
  };
  const url = `notifications?${qs.stringify(query)}`;

  const res: AxiosRes<NotificationIndexRes[]> = await axios.get(url);

  return res.data;
};
const getCountUnread = async (): Promise<any> => {
  const res: AxiosRes<CountUnreadRes> = await axios.get(`count-unread-notification`);
  return res.data;
};
export const setMarkAllRead = async (): Promise<any> => {
  const res: AxiosRes<any> = await axios.post(`notifications/mark-all-read`);
  return res.data;
};

export const getDataNotifications = async (
  router: NextRouter,
  dispatch: Dispatch<NotificationReducerAction>
): Promise<Omit<NotificationReducerState, 'error'>> => {
  try {
    const res = await getNotifications(router);
    const count_unread = await getCountUnread();
    const notifications = res.data;
    const meta = res.meta;
    dispatch({ type: 'setNotifications', payload: notifications, meta: meta });
    dispatch({ type: 'setCountUnread', payload: count_unread });
    return { notifications, meta, count_unread };
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
