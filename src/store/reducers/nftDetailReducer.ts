import { NFT } from 'types/nft';
import { NFTsActionTypeEnum } from 'enums/actions';
import { NFTDetailActionTypes } from '../../types/nft';

export const initialNFTDetailState: NFT | null = null;

export const nftDetailReducer = (
  state: NFT | null = initialNFTDetailState,
  action: NFTDetailActionTypes,
) => {
  switch (action.type) {
    case NFTsActionTypeEnum.GET_NFT_DETAIL: {
      if (!action.payload) return null;
      return {
        ...(state || {}),
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
