import { CategoriesActionEnum, CategoriesActionTypeEnum } from 'enums/actions';
import categoriesSvc, { GetDataCategories } from 'services/categories';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import { PaginationData } from '../../enums/pagination';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import {
  DataCategories,
  ParamsGetCategories,
  ResponseCategories,
  GetCategoriesStartAction,
} from 'types/categories';

export const getCategoriesSuccessAction = (
  payload: PaginationData<DataCategories>,
) => {
  return {
    type: CategoriesActionEnum.GET_FILTER_CATEGORIES,
    payload,
  };
};

export const getDataCategoriesStartAction = (
  params: ParamsGetCategories,
): GetCategoriesStartAction => {
  return {
    type: CategoriesActionTypeEnum.GET_CATEGORIES_START,
    payload: params,
  };
};

export const getTableCategoriesSuccessAction = (
  payload: ResponseCategories,
) => {
  return {
    type: CategoriesActionTypeEnum.GET_TABLE_CATEGORIES,
    payload,
  };
};

export const getAllCategoriesSuccessAction = (payload: ResponseCategories) => {
  return {
    type: CategoriesActionTypeEnum.GET_ALL_CATEGORIES,
    payload,
  };
};

export const getAllSearchCategoriesSuccessAction = (
  payload: ResponseCategories,
) => {
  return {
    type: CategoriesActionTypeEnum.GET_SEARCH_CATEGORIES,
    payload,
  };
};

export const getCategoriesAction = (params: ParamsGetCategories) => {
  const taskId = CategoriesActionEnum.GET_FILTER_CATEGORIES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await categoriesSvc.GetCategories(params);
      dispatch(getCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const resetFilterCategoriesAction = () => ({
  type: CategoriesActionEnum.RESET_FILTER_CATEGORIES,
});

export const getTableCategoriesAction = (params: ParamsGetCategories) => {
  const taskId = CategoriesActionTypeEnum.GET_TABLE_CATEGORIES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await GetDataCategories(params);
      dispatch(getTableCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getAllCategoriesAction = (params: ParamsGetCategories) => {
  const taskId = CategoriesActionTypeEnum.GET_ALL_CATEGORIES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await GetDataCategories(params);
      dispatch(getAllCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getAllSearchCategoriesAction = (params: ParamsGetCategories) => {
  const taskId = CategoriesActionTypeEnum.GET_SEARCH_CATEGORIES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await GetDataCategories(params);
      dispatch(getAllSearchCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
