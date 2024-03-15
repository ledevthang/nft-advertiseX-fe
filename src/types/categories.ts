import {
  BlockCategoriesActionTypeEnum,
  CategoriesActionTypeEnum,
  ListCategoriesActionTypeEnum,
} from 'enums/actions';
import { ParamsSortBy } from 'enums/categories';
import { SortEnum } from 'enums/sortEnum';
import { CategoriesActionEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { MarketPlace, NFT } from './nft';
import { CategorySortOptions } from 'enums/categories';

export interface ParamsGetCategories {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortType?: SortEnum;
  volColumn?: ParamsSortBy;
  includeFirstPlaceImg?: boolean;
  includeIcon?: boolean;
}

export interface TypeFieldTable {
  value: number;
  status: string;
}
export interface DataCategories {
  firstPlace: TypeFieldTable;
  lastPlace: TypeFieldTable;
  totalOwner: TypeFieldTable;
  totalItem: TypeFieldTable;
  _24hVolume: TypeFieldTable;
  _7dVolume: TypeFieldTable;
  _30dVolume: TypeFieldTable;
  allTimeVolume: TypeFieldTable;
  name: string;
  imgUrl: string;
  mode: string;
  imgFirstPlace: {
    url: string;
    metaData: string;
    marketplace: MarketPlace;
    chain: string;
    price: string;
  };
  description: string;
  totalCollection: string;
  floorPrice: number;
  totalTimeLeft: number;
  icon: string;
}

export interface ResponseCategories {
  data: DataCategories[];
  total: number;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortType: SortEnum;
}

export interface CategoriesState {
  allCategories: ResponseCategories;
  tableCategories: ResponseCategories;
  searchCategories: ResponseCategories;
}

export interface GetCategoriesStartAction {
  type: typeof CategoriesActionTypeEnum.GET_CATEGORIES_START;
  payload: ParamsGetCategories;
}

export interface GetTableCategoriesAction {
  type: typeof CategoriesActionTypeEnum.GET_TABLE_CATEGORIES;
  payload: ResponseCategories;
  isLoadMore?: boolean;
}

export interface GetALLCategoriesAction {
  type: typeof CategoriesActionTypeEnum.GET_ALL_CATEGORIES;
  payload: ResponseCategories;
}

export interface GetSearchCategoriesAction {
  type: typeof CategoriesActionTypeEnum.GET_SEARCH_CATEGORIES;
  payload: ResponseCategories;
}

export type CategoriesACtionType =
  | GetTableCategoriesAction
  | GetALLCategoriesAction
  | GetCategoriesStartAction
  | GetSearchCategoriesAction;

export interface Categories {
  totalItem: number;
  firstPlace: number;
  lastPlace: number;
  _24HrVolume: number;
  allTimeVolume: number;
  name: string;
  imgUrl: string;
}

export interface GetCategories {
  type: CategoriesActionEnum.GET_FILTER_CATEGORIES;
  payload: PaginationData<DataCategories>;
}

export interface ResetFilterCategory {
  type: CategoriesActionEnum.RESET_FILTER_CATEGORIES;
}

export type CategoriesActionTypes = GetCategories | ResetFilterCategory;

export interface ParamsBlockCategories {
  category?: string;
  includeTwitter?: boolean;
  time?: string;
}

export interface ResBlockCategories {
  block: number;
  imgUrl: string;
}

export interface DataBlockCategories {
  data: ResBlockCategories[];
  category: string;
  status?: {
    id: number;
    name: string;
    createdDate: string;
    firstPlace: number;
    lastPlace: number;
    totalItem: number;
    totalOwner: number;
    vol24h: number;
    vol7d: number;
    vol30d: number;
    volAllTime: number;
  };
}

export interface GetBlockCategories {
  type: typeof BlockCategoriesActionTypeEnum.GET_CATEGORIES_BLOCK;
  payload: DataBlockCategories;
}
export interface ResetBlockCategories {
  type: typeof BlockCategoriesActionTypeEnum.RESET_BLOCK;
  payload: DataBlockCategories[];
}

export interface ParamsDataBlockCategories {
  blockNumber: number;
  blockCategory: string;
}

export interface DataCategoriesBlock {
  data: NFT[];
  pageNumber: number;
  pageSize: number;
  total: number;
  totalInactive: number;
}

export interface DataBlockCategoriesBlock {
  searchBlock: DataCategoriesBlock;
  blockCategories: DataBlockCategories;
}

export interface SearchBlockCategories {
  type: typeof BlockCategoriesActionTypeEnum.SEARCH_DATA_CATEGORIES_BLOCK;
  payload: DataCategoriesBlock;
}

export type BlockCategoriesActionType =
  | GetBlockCategories
  | ResetBlockCategories
  | SearchBlockCategories;
export interface GetListCategories {
  type: ListCategoriesActionTypeEnum.GET_LIST_CATEGORIES;
  payload: PaginationData<DataCategories>;
}

export interface ResponseListCategories {
  data: DataCategories[];
  total: number;
  pageNumber: number;
  pageSize: number;
  sortBy: CategorySortOptions;
  sortType: SortEnum;
}
