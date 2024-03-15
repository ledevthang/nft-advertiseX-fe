import { BlockCategoriesActionTypeEnum } from 'enums/actions';
import {
  BlockCategoriesActionType,
  DataBlockCategoriesBlock,
} from 'types/categories';

export const initialBlockCategoriesState: DataBlockCategoriesBlock = {
  blockCategories: {
    data: [],
    category: '',
  },
  searchBlock: {
    data: [],
    pageNumber: 1,
    pageSize: 10,
    total: 1,
    totalInactive: 1,
  },
};

export const blockCategoriesReducer = (
  state = initialBlockCategoriesState,
  action: BlockCategoriesActionType,
) => {
  switch (action.type) {
    case BlockCategoriesActionTypeEnum.GET_CATEGORIES_BLOCK: {
      return {
        ...state,
        blockCategories: action.payload,
      };
    }
    case BlockCategoriesActionTypeEnum.SEARCH_DATA_CATEGORIES_BLOCK: {
      return {
        ...state,
        searchBlock: action.payload,
      };
    }
    case BlockCategoriesActionTypeEnum.RESET_BLOCK: {
      return initialBlockCategoriesState;
    }
    default:
      return state;
  }
};
