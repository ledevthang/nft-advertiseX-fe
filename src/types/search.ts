import { CategoriesActionTypeEnum } from 'enums/actions';
export interface ResCategoriesCollections {
  name: string;
  imgUrl: string;
  totalItem: string;
  icon: string;
  lowestPrice: number;
  id: number;
  chain: string;
  firstPlace?: number;
}

export interface DataSearchCategories {
  categories: ResCategoriesCollections[];
  collections: ResCategoriesCollections[];
}

export interface SearchActions {
  type: typeof CategoriesActionTypeEnum.SEARCH_CATEOGRIES_COLLECTIONS;
  payload: DataSearchCategories;
}

export interface ResetSearchAction {
  type: CategoriesActionTypeEnum.RESET_SEARCH;
  payload: DataSearchCategories;
}

export type SearchActionType = SearchActions | ResetSearchAction;
