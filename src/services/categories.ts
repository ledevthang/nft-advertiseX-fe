import { PaginationData } from 'enums/pagination';
import { apiRoutesEnum } from 'enums/routes';
import AXIOS from './axios';
import {
  DataBlockCategories,
  DataCategories,
  DataCategoriesBlock,
  ParamsBlockCategories,
  ParamsDataBlockCategories,
  ParamsGetCategories,
  ResponseCategories,
} from 'types/categories';
import { DataSearchCategories } from 'types/search';

async function GetCategories(
  params: ParamsGetCategories,
): Promise<PaginationData<DataCategories>> {
  return AXIOS.get(`${apiRoutesEnum.GET_CATEGORIES}`, { params });
}
async function GetCategoriesBlock(params: {
  category: string;
  includeTwitter: boolean;
  time: string;
  includeStatus?: boolean;
}): Promise<DataBlockCategories> {
  return AXIOS.get(`${apiRoutesEnum.GET_CATEGORIES_BLOCK}`, { params });
}

export async function GetDataCategories(
  params: ParamsGetCategories,
): Promise<ResponseCategories> {
  return AXIOS.get(apiRoutesEnum.GET_CATEGORIES, { params });
}

export const SearchCategories = (
  params: string,
): Promise<DataSearchCategories> => {
  return AXIOS.get(apiRoutesEnum.SEARCH_CATEGORIES_COLLECTIONS, {
    params: { search: params },
  });
};

export const BlockCategories = (
  params: ParamsBlockCategories,
): Promise<DataBlockCategories> => {
  return AXIOS.get(`${apiRoutesEnum.GET_CATEGORIES_BLOCK}`, { params });
};

export const GetDataBlockCategories = (
  params: ParamsDataBlockCategories,
): Promise<DataCategoriesBlock> => {
  return AXIOS.get(`${apiRoutesEnum.SEARCH_CATEGORIES_BLOCK}`, { params });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetCategories,
  GetCategoriesBlock,
};
