import { PaginationData } from 'enums/pagination';
import { apiRoutesEnum } from 'enums/routes';
import { CollectionData } from 'types/collections';
import { CollectionGetAllRequest } from '../types/collections';
import AXIOS from './axios';

async function GetCollections(
  params: CollectionGetAllRequest,
): Promise<PaginationData<CollectionData>> {
  return AXIOS.get(apiRoutesEnum.GET_COLLECTIONS, { params });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetCollections,
};
