import { ListCategoriesActionTypeEnum } from 'enums/actions';
import { ParamsGetCategories, ResponseCategories } from 'types/categories';
import { DispatchType, ThunkActionType } from 'types/store';

import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import { GetDataCategories } from 'services/categories';
import { ApiError } from 'types/api';

const getListCategoriesSuccessAction = (payload: ResponseCategories) => ({
  type: ListCategoriesActionTypeEnum.GET_LIST_CATEGORIES,
  payload,
});

export const getListCategoriesAction = (
  params: ParamsGetCategories,
  callback?: () => void,
): ThunkActionType => {
  const taskId = ListCategoriesActionTypeEnum.GET_LIST_CATEGORIES;
  return async (dispatch: DispatchType, getState): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const state = getState();
      const {
        data: oldData,
        total,
        ...oldParams
      } = state.listCategoriesReducer;
      const newParams = {
        ...oldParams,
        ...params,
      };
      const data = await GetDataCategories(newParams);
      dispatch(getListCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
      callback && callback();
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
