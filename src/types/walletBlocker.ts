import { WalletBlockerActionEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';

export interface WalletBlocker {
  id: number;
  address: string;
  email: string;
  isBlocked: boolean;
}

export interface GetWalletBlockerRequest extends PaginationRequest {
  search?: string;
}

export interface GetAllWalletBlocker {
  type: WalletBlockerActionEnum.GET_ALL_WALLER_BLOCKERS;
  payload: PaginationData<WalletBlocker>;
}

export type WalletBlockerActionType = GetAllWalletBlocker;
