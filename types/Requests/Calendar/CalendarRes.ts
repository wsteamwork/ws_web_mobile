import { TransformerInclude } from '@/types/Requests/ResponseTemplate';

export interface ScheduleRes{
  blocks: string[]
}

export interface UpdateBlockRes{
  id: number,
  merchant_id: number,
  room_type: number,
  room_type_txt: string,
  max_guest: number,
  max_additional_guest: number,
  number_bed: number,
  number_room: number,
  bathroom: number,
  city_id: number,
  district_id: number,
  checkin: string,
  checkout: string,
  price_day: number,
  price_hour: number,
  price_after_hour: number,
  price_charge_guest: number,
  cleaning_fee: number,
  standard_point: number,
  is_manager: number,
  manager_txt: string,
  instant_book: number,
  instant_book_txt: string,
  latest_deal: number,
  latest_deal_txt: number,
  is_discount: number,
  is_discount_txt: string,
  price_day_discount: number,
  price_hour_discount: number | null,
  rent_type: number,
  rent_type_txt: string,
  rules: any,
  longitude: string,
  latitude: string,
  total_booking: number,
  status: number,
  merchant_status: number,
  status_txt: string,
  merchant_status_txt: string,
  cleanliness: number,
  quality: number,
  service: number,
  valuable: number,
  avg_rating: number,
  avg_cleanliness: number,
  avg_quality: number,
  avg_service: number,
  avg_valuable: number,
  total_review: number,
  total_recommend: number | null,
  settings: {
    refunds: [
      {
        days: number,
        amount: number
      }
      ],
    no_booking_cancel: number
  },
  airbnb_calendar: string | null,
  westay_calendar:string,
  percent: number,
  created_at: string,
  updated_at: string
}

export interface BookingCalendarRes{
  events:[TransformerInclude<BookingEvents>]
  color: string,
  textColor: string
}

export interface BookingEvents{
  id: number,
  booking_id: number,
  uuid: string,
  title: string,
  start: string,
  end: string
}
