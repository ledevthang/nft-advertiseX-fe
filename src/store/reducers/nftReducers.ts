import { NFT } from 'types/nft';
import { NFTsActionTypeEnum } from 'enums/actions';
import { NFTActionTypes } from '../../types/nft';
import { PaginationData } from '../../enums/pagination';

export const initialNFTsState: PaginationData<NFT> & {
  totalInactive?: number;
  pageBefore?: number;
} = {
  pageNumber: 1,
  pageSize: 4,
  total: 0,
  data: [],
  totalInactive: 0,
  pageBefore: 0,
};

export const nftsReducer = (
  state = initialNFTsState,
  action: NFTActionTypes,
) => {
  switch (action.type) {
    case NFTsActionTypeEnum.GET_NFTS: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case NFTsActionTypeEnum.GET_NFTS_BEFORE: {
      return {
        ...state,
        ...action.payload,
        data: [...action.payload.data, ...state.data],
      };
    }
    case NFTsActionTypeEnum.GET_NFTS_TABLET_AT_FIRST: {
      return {
        ...state,
        ...action.payload,
        data: [...action.payload.data],
      };
    }
    case NFTsActionTypeEnum.GET_MY_NFTS: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case NFTsActionTypeEnum.DELETE_MY_NFTS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case NFTsActionTypeEnum.CREATE_NEW_NFT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
