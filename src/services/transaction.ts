import {
  GetTransactionRequest,
  GetTransactionVolumeAPIRequest,
  TransactionVolume,
} from './../types/transaction';
import { apiRoutesEnum } from 'enums/routes';
import { transactionState } from 'types/transaction';
import AXIOS from './axios';

async function GetTransactions(
  params: GetTransactionRequest,
): Promise<transactionState> {
  return AXIOS.get(apiRoutesEnum.GET_TRANSACTIONS, { params });
}

async function GetTransactionVolume(
  params: GetTransactionVolumeAPIRequest,
): Promise<TransactionVolume> {
  return AXIOS.get(apiRoutesEnum.GET_TRANSACTION_VOLUME, { params });
}

async function DeleteTransaction(id: string) {
  return AXIOS.delete(`${apiRoutesEnum.TRANSACTIONS}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetTransactions,
  GetTransactionVolume,
  DeleteTransaction,
};
