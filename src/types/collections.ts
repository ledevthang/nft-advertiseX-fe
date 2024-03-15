import { PaginationData, PaginationRequest } from '../enums/pagination';
import { CollectionActionTypeEnum } from '../enums/actions';

export interface CollectionData {
  id: number;
  imageUrl?: string;
  name: string;
  totalNFT?: number;
  totalPrice?: number;
  isVerified: boolean;
  rank?: number;
}

export interface CollectionGetAllRequest extends PaginationRequest {
  name?: string;
}

export interface GetCollectionAction {
  type: typeof CollectionActionTypeEnum.GET_COLLECTIONS;
  payload: PaginationData<CollectionData>;
}

export interface ResetCollectionAction {
  type: typeof CollectionActionTypeEnum.RESET_COLLECTIONS;
}

export type CollectionActionTypes = GetCollectionAction | ResetCollectionAction;
