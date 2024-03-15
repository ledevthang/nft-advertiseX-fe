import { NFT } from 'types/nft';
import { NFTsActionTypeEnum } from 'enums/actions';
import { NFTPreviewActionTypes } from '../../types/nft';
import secureStorage from 'utils/secureStorage';
import { SecureStorageEnum } from 'enums/auth';

const nftPreview = secureStorage.getItemSS(SecureStorageEnum.NFT_TO_ESTIMATE);

export const initialNFTPreviewState: NFT | null = nftPreview
  ? JSON.parse(nftPreview)
  : null;

export const nftPreviewReducer = (
  state: NFT | null = initialNFTPreviewState,
  action: NFTPreviewActionTypes,
) => {
  switch (action.type) {
    case NFTsActionTypeEnum.GET_NFT_PREVIEW: {
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
