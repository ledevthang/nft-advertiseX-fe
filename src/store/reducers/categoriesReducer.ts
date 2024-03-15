import { PaginationData } from 'enums/pagination';
import { CategoriesActionEnum } from '../../enums/actions';
import { CategoriesActionTypes, DataCategories } from 'types/categories';

export const initialCategories: PaginationData<DataCategories> = {
  pageNumber: 1,
  pageSize: 5,
  total: 0,
  data: [],
};

export const categoriesReducer = (
  state = initialCategories,
  action: CategoriesActionTypes,
) => {
  switch (action.type) {
    case CategoriesActionEnum.GET_FILTER_CATEGORIES: {
      return {
        ...state,
        ...action.payload,
        data: [...state.data, ...action.payload.data],
      };
    }
    case CategoriesActionEnum.RESET_FILTER_CATEGORIES: {
      return initialCategories;
    }
    default:
      return state;
  }
};
