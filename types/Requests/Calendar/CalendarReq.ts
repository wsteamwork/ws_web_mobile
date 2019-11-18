export interface UnlockCalendarReq{
  room_id: number,
  unlock_days: [string[]]
}

export interface BlockCalendarReq{
  room_id: number,
  room_time_blocks: [string[]]
}
