/* eslint-disable */
import { ReadListAuthorsParams, ReadListAuthorResponse } from 'types/authors';
import { apiRoutesEnum } from 'enums/routes';
import AXIOS from './axios';

async function ReadListAuthors(
  params: ReadListAuthorsParams,
): Promise<ReadListAuthorResponse> {
  return AXIOS.get(apiRoutesEnum.AUTHORS, { params });
}

export default {
  ReadListAuthors,
};
