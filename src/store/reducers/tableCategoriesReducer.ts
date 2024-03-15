import { CategoriesActionTypeEnum } from 'enums/actions';
import { SortEnum } from 'enums/sortEnum';
import {
  CategoriesACtionType,
  CategoriesState,
  ResponseCategories,
} from 'types/categories';

export const defaultData: ResponseCategories = {
  data: [],
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  sortBy: '',
  sortType: SortEnum.Asc,
};

export const initalCategories: CategoriesState = {
  allCategories: defaultData,
  tableCategories: defaultData,
  searchCategories: defaultData,
};

export const tableCategoriesReducer = (
  state = initalCategories,
  action: CategoriesACtionType,
) => {
  switch (action.type) {
    case CategoriesActionTypeEnum.GET_CATEGORIES_START: {
      return {
        ...state,
        tableCategories: {
          ...state.tableCategories,
          ...action.payload,
        },
      };
    }
    case CategoriesActionTypeEnum.GET_TABLE_CATEGORIES: {
      return {
        ...state,
        tableCategories: action.payload,
      };
    }
    case CategoriesActionTypeEnum.GET_ALL_CATEGORIES: {
      return {
        ...state,
        allCategories: action.payload,
      };
    }
    case CategoriesActionTypeEnum.GET_SEARCH_CATEGORIES: {
      return {
        ...state,
        searchCategories: action.payload,
      };
    }
    default:
      return state;
  }
};
