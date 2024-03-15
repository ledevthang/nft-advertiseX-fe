import { BlockActionTypeEnum } from 'enums/actions';
import blockSvc from 'services/blocks';
import { ApiError } from 'types/api';
import {
  BlockData,
  BlockGetAllRequest,
  GetBlocksByTimeRequest,
  BlockDataByTime,
} from 'types/block';
import { DispatchType } from 'types/store';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getBlockSuccessAction = (payload: BlockData[]) => {
  return {
    type: BlockActionTypeEnum.GET_ALL_BLOCK,
    payload,
  };
};

export const getBlocksByTimeSuccess = (payload: BlockDataByTime) => {
  return {
    type: BlockActionTypeEnum.GET_BLOCKS_BY_TIME,
    payload,
  };
};

export const getAllBlockAction = (params: BlockGetAllRequest) => {
  const taskId = BlockActionTypeEnum.GET_ALL_BLOCK;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await blockSvc.GetAllBlocks(params);
      dispatch(getBlockSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getBlocksByTimeAction = (params: GetBlocksByTimeRequest) => {
  const taskId = BlockActionTypeEnum.GET_BLOCKS_BY_TIME;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await blockSvc.GetBlocksBytime(params);
      dispatch(getBlocksByTimeSuccess(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
