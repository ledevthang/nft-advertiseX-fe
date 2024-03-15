import { ReadListAuthorsParams } from 'types/authors';
import { ThunkActionType, DispatchType } from 'types/store';
import authorServices from 'services/authors';
import { AuthorsActionTypeEnum } from 'enums/actions';
import {
  asyncTaskStartAction,
  asyncTaskStopAction,
} from 'store/actions/asyncTaskActions';
import { ApiError } from 'types/api';

export const readListAuthorsAction = (
  params: ReadListAuthorsParams,
): ThunkActionType => {
  const taskId = AuthorsActionTypeEnum.READ_LIST_AUTHORS_REQUEST;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await authorServices.ReadListAuthors(params);
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
