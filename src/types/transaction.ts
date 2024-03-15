import { CurrencyUnitEnum } from 'enums/addNft';
import { TransactionActionEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';
import {
  AdminChartFilterByCurrency,
  AdminChartFilterByDate,
} from 'enums/filter';

export interface Transaction {
  id: string;
  nftName: string;
  originalUrl: string;
  imageUrl: string;
  endDate: Date;
  paymentDate: Date;
  currency: CurrencyUnitEnum;
  squarePrice: number;
  collection: string;
  email: string;
  amount: string;
  nftId: string;
  coinId: string;
  walletAddress: string;
  txId: string;
  createdAt: Date;
  contractAddress: string;
  metadata: string;
  country: string;
  ip: string;
  isDeleted: boolean;
}

export interface transactionState extends PaginationData<Transaction> {
  txId?: string;
  collection?: string;
  nftName?: string;
  walletAddress?: string;
  status?: boolean;
}
export interface TransactionVolume {
  opensea: number;
  solanart: number;
  looksrare: number;
}

export interface GetTransactionRequest extends PaginationRequest {
  txId?: string;
  collection?: string;
  nftName?: string;
  walletAddress?: string;
  status?: boolean;
}

export interface GetTransactionVolumeRequest {
  time: AdminChartFilterByDate;
  currency: AdminChartFilterByCurrency;
}

export interface GetTransactionVolumeAPIRequest {
  startTime?: Date;
  coinId?: number;
}

export interface GetAllTransaction {
  type: TransactionActionEnum.GET_ALL_TRANSACTIONS;
  payload: PaginationData<Transaction>;
}

export interface DeleteTransaction {
  type: TransactionActionEnum.DELETE_TRANSACTION;
  payload: Partial<Transaction>;
}

export interface GetAllTransactionVolume {
  type: TransactionActionEnum.GET_TRANSACTION_VOLUME;
  payload: TransactionVolume;
}

export type TransactionActionType = GetAllTransaction | DeleteTransaction;
export type TransactionVolumeActionType = GetAllTransactionVolume;
