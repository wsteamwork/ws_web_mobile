import { IncomingMessage } from 'http';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { ChangeEvent, useMemo } from 'react';

export const formatMoney = (
  amount: any,
  decimalCount: number = 0,
  decimal: string = '.',
  thousands: string = ','
): string | void => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j: number = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.error(e);
  }
};

export const formatTime = (
  date: string,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
): string => {
  let momentObject: Moment = moment(date, 'YYYY-MM-DD')
    .hours(hours)
    .minutes(minutes)
    .seconds(seconds);

  if (!momentObject.isValid()) throw 'Date format invalid';

  return momentObject.format('YYYY-MM-DD HH:mm:ss');
};

export const arrayFilterCheckBoxEvent = <E extends HTMLInputElement>(
  current: number[],
  event: ChangeEvent<E>,
  status: boolean
) => {
  let list = [...current];
  let value = parseInt(event.target.value);
  status ? list.push(value) : _.remove(list, (n) => n === value);

  return list;
};

export const selfMemo = <T = any>(value: T): T => {
  return useMemo(() => value, [value]);
};

export const formatPrice = (price: number): string => {
  try {
    let format = '';
    if (price >= 1000000) {
      format = (price / 1000000).toFixed(2) + 'tr ';
    } else {
      format = (price / 1000).toFixed(0) + 'k ';
    }
    return format;
  } catch (e) {
    console.error(e);
  }
};

export const getCookieFromReq = (req: IncomingMessage, cookie: string) => {
  if (!req || !req.headers || !req.headers.cookie) {
    return undefined;
  }

  const cookies = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${cookie}=`));

  if (!cookies) {
    return undefined;
  }

  return cookies.split('=')[1];
};

export const cleanAccents = (str: string): string => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

  return str;
};
export const getFirstLetterOfName = (name: string) => {
  let splitName = name.split(' ');
  let itemLast = splitName.slice(-1).pop();
  return itemLast!.substring(0, 1);
};

export const calcPercentage = (portion: number, total: number) => {
  const percent = parseInt(((portion / total) * 100).toFixed(2));

  if (portion > total) {
    return `Tăng ${percent - 100}%`;
  } else {
    return `Giảm ${100 - percent}%`;
  }
};

export const weekdayOptions = [
  {
    title: 'Thứ 2',
    weekday: 2,
    price_day: 0,
    price_hour: 0,
    price_after_hour: 0,
    status: 0
  },
  {
    title: 'Thứ 3',
    weekday: 3,
    price_day: 0,
    price_hour: 0,
    price_after_hour: 0,
    status: 0
  },
  {
    title: 'Thứ 4',
    weekday: 4,
    price_day: 0,
    price_hour: 0,
    price_after_hour: 0,
    status: 0
  },
  {
    title: 'Thứ 5',
    weekday: 5,
    price_day: 0,
    price_hour: 0,
    price_after_hour: 0,
    status: 0
  },
  {
    title: 'Thứ 6',
    weekday: 6,
    price_day: 0,
    price_hour: 0,
    price_after_hour: 0,
    status: 0
  },
  {
    title: 'Thứ 7',
    weekday: 7,
    price_day: 0,
    price_hour: 0,
    price_after_hour: 0,
    status: 0
  },
  {
    title: 'Chủ nhật',
    weekday: 1,
    price_day: 0,
    price_hour: 0,
    price_after_hour: 0,
    status: 0
  }
];

export const hoursList = [
  '00:00:00',
  '00:30:00',
  '01:00:00',
  '01:30:00',
  '02:00:00',
  '02:30:00',
  '03:00:00',
  '03:30:00',
  '04:00:00',
  '04:30:00',
  '05:00:00',
  '05:30:00',
  '06:00:00',
  '06:30:00',
  '07:00:00',
  '07:30:00',
  '08:00:00',
  '08:30:00',
  '09:00:00',
  '09:30:00',
  '10:00:00',
  '10:30:00',
  '11:00:00',
  '11:30:00',
  '12:00:00',
  '12:30:00',
  '13:00:00',
  '13:30:00',
  '14:00:00',
  '14:30:00',
  '15:00:00',
  '15:30:00',
  '16:00:00',
  '16:30:00',
  '17:00:00',
  '17:30:00',
  '18:00:00',
  '18:30:00',
  '19:00:00',
  '19:30:00',
  '20:00:00',
  '20:30:00',
  '21:00:00',
  '21:30:00',
  '22:00:00',
  '22:30:00',
  '23:00:00',
  '23:30:00'
];

export const statusBookingList = [
    {
      id: 0,
      name: 'Tất cả',
    },
    {
      id: 1,
      name: 'Đơn mới',
    },
    {
      id: 2,
      name: 'Xác nhận',
    },
    {
      id: 4,
      name: 'Hoàn thành',
    },
    {
      id: 5,
      name: 'Đã hủy',
    },
];
