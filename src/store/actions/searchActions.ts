import { CategoriesActionTypeEnum } from 'enums/actions';
import { SearchCategories } from 'services/categories';
import { ApiError } from 'types/api';
import { DataSearchCategories } from 'types/search';
import { DispatchType } from 'types/store';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const searchCategoriesSuccessAction = (
  payload: DataSearchCategories,
) => {
  return {
    type: CategoriesActionTypeEnum.SEARCH_CATEOGRIES_COLLECTIONS,
    payload,
  };
};

export const searchCategoriesAction = (params: string) => {
  const taskId = CategoriesActionTypeEnum.SEARCH_CATEOGRIES_COLLECTIONS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await SearchCategories(params);
      dispatch(searchCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const resetSearchAction = () => {
  return {
    type: CategoriesActionTypeEnum.RESET_SEARCH,
  };
};
