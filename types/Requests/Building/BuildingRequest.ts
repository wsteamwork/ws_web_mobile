import { BaseGetRequestParams } from '@/types/Requests/RequestTemplate';

export interface BuildingRequestParams extends BaseGetRequestParams, Partial<MapCoords> {
  name?: string;
  city_id?: number;
  district_id?: number;
  bedrooms?: number;
  number_guest?: number;
  min_price?: number;
  max_price?: number;
  page?: number;
}
export interface BuildingURLParams {
  name?: string;
  city_id?: number;
  district_id?: number;
  bedrooms?: number;
  number_guest?: number;
  min_price?: number;
  max_price?: number;
  page?: number;
}

export interface MapCoords {
  lat_min: number;
  lat_max: number;
  long_min: number;
  long_max: number;
}
