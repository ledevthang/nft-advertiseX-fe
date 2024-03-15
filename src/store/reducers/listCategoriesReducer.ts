import { ListCategoriesActionTypeEnum } from '../../enums/actions';
import { GetListCategories } from 'types/categories';
import { SortEnum } from 'enums/sortEnum';
import { ResponseListCategories } from 'types/categories';
import { CategorySortOptions } from 'enums/categories';

export const initialListCategories: ResponseListCategories = {
  data: [],
  pageNumber: 1,
  pageSize: 9,
  total: 0,
  sortBy: CategorySortOptions.ALL_TIME_VOLUME,
  sortType: SortEnum.Desc,
};

export const listCategoriesReducer = (
  state = initialListCategories,
  action: GetListCategories,
) => {
  switch (action.type) {
    case ListCategoriesActionTypeEnum.GET_LIST_CATEGORIES: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    default:
      return state;
  }
};
