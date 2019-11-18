
export interface NotificationIndexRes {
  id: number;
  read_at: string | null;
  data: DataRes;
  number: number;
}

export interface DataRes {
  booking_id?: number | null;
  uuid?: number | null;
  conver_id? : number | null;
  avatar? : string | null;
  action_url? : string | null;
  sender_name: string | null;
  checkin?: string | null;       
  checkout?: string | null;
  total_fee?: number | null;
  booking_type?: number | null;
  payment_status_txt?: string | null;
  title: string | null;                 
  body: string | null;                
  room_name?: string | null;             
  room_avatar?: string | null;    
  created: string | null;          
  type: number | null;
  type_txt: string | null;
}
