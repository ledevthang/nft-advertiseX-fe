import { SummarizeActionTypeEnum } from '../enums/actions';

export interface SummarizeData {
  nfts: number;
  owners: number;
  collections: number;
  firstPlace: number;
  lastPlace: number;
  _24HrVolume: number;
  allTimeVolume: number;
}

export interface GetSummarizeAction {
  type: typeof SummarizeActionTypeEnum.GET_SUMMARIZE;
  payload: SummarizeData;
}

export type SummarizeActionTypes = GetSummarizeAction;
