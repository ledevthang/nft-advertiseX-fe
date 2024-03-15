import { CategoriesActionTypeEnum } from 'enums/actions';
import { DataSearchCategories, SearchActionType } from 'types/search';

export const initalSearch: DataSearchCategories = {
  categories: [],
  collections: [],
};

export const searchReducer = (
  state = initalSearch,
  action: SearchActionType,
) => {
  switch (action.type) {
    case CategoriesActionTypeEnum.SEARCH_CATEOGRIES_COLLECTIONS: {
      return {
        ...state,
        categories: action.payload.categories,
        collections: action.payload.collections,
      };
    }
    case CategoriesActionTypeEnum.RESET_SEARCH: {
      return initalSearch;
    }
    default:
      return state;
  }
};
