import { apiRoutesEnum } from 'enums/routes';
import {
  BlockData,
  BlockGetAllRequest,
  GetBlocksByTimeRequest,
  BlockDataByTime,
} from 'types/block';
import AXIOS from './axios';

async function GetAllBlocks(params: BlockGetAllRequest): Promise<BlockData[]> {
  return AXIOS.get(apiRoutesEnum.GET_ALL_BLOCKS, { params });
}

async function GetBlocksBytime(
  params: GetBlocksByTimeRequest,
): Promise<BlockDataByTime> {
  return AXIOS.get(apiRoutesEnum.GET_BLOCKS_BY_TIME, { params });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetAllBlocks,
  GetBlocksBytime,
};
