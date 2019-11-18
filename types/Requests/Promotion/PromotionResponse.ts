import { TransformerInclude } from '@/types/Requests/ResponseTemplate';
import { CouponRes } from '@/types/Requests/Coupon/CouponResponse';

export interface PromotionRes {
  id: number;
  name: string;
  description: string;
  date_start: string;
  date_end: string;
  status: number;
  image: string;
  status_txt: string;
  created_at: string;
  updated_at: string;
  coupons: TransformerInclude<Coupons[]>;
}

export interface Coupons {
  id: number;
  code: string;
  discount: number;
  max_discount: number;
  usable: number;
  used: number;
  status: number;
  status_txt: string;
  all_day: number;
  all_day_txt: string;
  settings: Settings;
  term_of_uses?: (string)[] | null;
  promotion_id: number;
  day_finish: number;
}
export interface Settings {
  bind?: (string | null)[] | null;
  rooms?: (number)[] | null;
  cities?: (number | null)[] | null;
  districts?: (number | null)[] | null;
  days?: (string | null)[] | null;
  booking_type?: number | (null)[] | null;
  booking_create?: (string)[] | null;
  booking_stay?: (string)[] | null;
  merchants?: (null)[] | null;
  users?: (null)[] | null;
  days_of_week?: (number | null)[] | null;
  room_type?: (number | null)[] | null;
  min_price: number;
  date_start?: string | null;
  date_end?: string | null;
}
