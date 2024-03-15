export interface GetMiniumPricePerDayRequest {
  key: 'miniumPricePerday';
}

export interface UpdateMinPricePerDayRequest {
  id: number;
  newValue: string;
}

export interface MiniumPricePerDayResponse {
  id: number;
  key: 'miniumPricePerDay';
  value: string;
}
