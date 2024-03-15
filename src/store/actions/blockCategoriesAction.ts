import { BlockCategoriesActionTypeEnum } from 'enums/actions';
import { BlockCategories, GetDataBlockCategories } from 'services/categories';
import { ApiError } from 'types/api';
import {
  DataBlockCategories,
  DataCategoriesBlock,
  ParamsBlockCategories,
  ParamsDataBlockCategories,
} from 'types/categories';
import { DispatchType } from 'types/store';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getBlockCategoriesSuccessAction = (
  payload: DataBlockCategories,
) => {
  return {
    type: BlockCategoriesActionTypeEnum.GET_CATEGORIES_BLOCK,
    payload,
  };
};

export const dataBlockCategoriesSuccessAction = (
  payload: DataCategoriesBlock,
) => {
  return {
    type: BlockCategoriesActionTypeEnum.SEARCH_DATA_CATEGORIES_BLOCK,
    payload,
  };
};

export const getBlockCategoriesAction = (params: ParamsBlockCategories) => {
  const taskId = BlockCategoriesActionTypeEnum.GET_CATEGORIES_BLOCK;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await BlockCategories(params);
      dispatch(getBlockCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const resetBlockCategoriesAction = () => {
  return {
    type: BlockCategoriesActionTypeEnum.RESET_BLOCK,
  };
};

export const dataBlockCategoriesAction = (
  params: ParamsDataBlockCategories,
) => {
  const taskId = BlockCategoriesActionTypeEnum.SEARCH_DATA_CATEGORIES_BLOCK;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await GetDataBlockCategories(params);
      dispatch(dataBlockCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
