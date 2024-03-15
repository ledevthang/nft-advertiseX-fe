import { BlockActionTypeEnum } from '../enums/actions';

export interface BlockData {
  id: number;
  imageUrl: string;
}
export interface BlockDataByTime {
  id: string;
  path: string;
}

export interface BlockGetAllRequest {
  include12Blocks: boolean;
}

export interface GetBlocksByTimeRequest {
  date: string | Date;
}

export interface GetBlockAction {
  type: typeof BlockActionTypeEnum.GET_ALL_BLOCK;
  payload: BlockData[];
}

export interface GetBlocksByTimeAction {
  type: typeof BlockActionTypeEnum.GET_BLOCKS_BY_TIME;
  payload: BlockDataByTime;
}

export type BlockActionTypes = GetBlockAction;

export type BlocksByTimeActionTypes = GetBlocksByTimeAction;
