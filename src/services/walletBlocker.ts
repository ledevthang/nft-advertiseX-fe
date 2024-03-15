import {
  GetWalletBlockerRequest,
  WalletBlocker,
} from './../types/walletBlocker';
import { PaginationData } from 'enums/pagination';
import { apiRoutesEnum } from 'enums/routes';
import AXIOS from './axios';

async function GetWalletBlockers(
  params: GetWalletBlockerRequest,
): Promise<PaginationData<WalletBlocker>> {
  return AXIOS.get(apiRoutesEnum.GET_USER_BLOCKERS, { params });
}

async function DeleteWalletBlockers(id: number) {
  return AXIOS.put(`${apiRoutesEnum.BLOCK_USER}/${id}`);
}

async function UnblockUser(id: number) {
  return AXIOS.put(`${apiRoutesEnum.UNBLOCK_USER}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetWalletBlockers,
  DeleteWalletBlockers,
  UnblockUser,
};
