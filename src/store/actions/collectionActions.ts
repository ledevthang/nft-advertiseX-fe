import { CollectionActionTypeEnum } from 'enums/actions';
import collectionSvc from 'services/collections';
import { ApiError } from 'types/api';
import { CollectionData, CollectionGetAllRequest } from 'types/collections';
import { DispatchType } from 'types/store';
import { PaginationData } from '../../enums/pagination';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getCollectionsSuccessAction = (
  payload: PaginationData<CollectionData>,
) => {
  return {
    type: CollectionActionTypeEnum.GET_COLLECTIONS,
    payload,
  };
};

export const getCollectionsAction = (params: CollectionGetAllRequest) => {
  const taskId = CollectionActionTypeEnum.GET_COLLECTIONS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await collectionSvc.GetCollections(params);
      dispatch(getCollectionsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const resetCollectionsAction = () => ({
  type: CollectionActionTypeEnum.RESET_COLLECTIONS,
});
