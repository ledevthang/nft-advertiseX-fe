import { PaginationData } from 'enums/pagination';
import { CollectionActionTypes, CollectionData } from 'types/collections';
import { CollectionActionTypeEnum } from '../../enums/actions';

export const initialCollections: PaginationData<CollectionData> = {
  pageNumber: 1,
  pageSize: 4,
  total: 0,
  data: [],
};

export const collectionsReducer = (
  state = initialCollections,
  action: CollectionActionTypes,
) => {
  switch (action.type) {
    case CollectionActionTypeEnum.GET_COLLECTIONS: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case CollectionActionTypeEnum.RESET_COLLECTIONS: {
      return initialCollections;
    }
    default:
      return state;
  }
};
