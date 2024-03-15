import { apiRoutesEnum } from 'enums/routes';
import { SummarizeData } from 'types/summarize';
import AXIOS from './axios';

async function GetSummarize(): Promise<SummarizeData> {
  return AXIOS.get(apiRoutesEnum.GET_SUMMARIZE);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetSummarize,
};
