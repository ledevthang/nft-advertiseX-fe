import { CurrencyUnitEnum, InputEstimateParamsEnum } from 'enums/addNft';
import { AddNftActionTypeEnum, EditNFTActionTypeEnum } from 'enums/actions';
import { NFTEstimateResponse } from 'types/nft';
import { NFT } from './nft';
import { CategoryWithinParsedLink } from './category';

export interface TimeParams {
  months?: number;
  days?: number;
  hours?: number;
}

export interface NftValueInterface {
  value?: string;
  unit: CurrencyUnitEnum;
}

export interface NftEstimateStateReducer {
  params: {
    months?: string;
    days?: string;
    hours?: string;
    position?: string;
    nftValue?: string;
    nftUnit: CurrencyUnitEnum;
    squarePrice?: number;
    lastEditInput?: InputEstimateParamsEnum;
    changeUnit?: boolean;
    category?: string;
    categories?: string;
  };
  estimateInfo: {
    percentile?: number;
    avgTime?: number;
    positionWithinBlock?: number;
    blockNumber?: number;
  };
  priceNFT: PriceNFTBaseOnDollar;
  categories: CategoryWithinParsedLink[];
}

export interface GetNftEstimateParams {
  months?: string;
  days?: string;
  hours?: string;
  position?: string;
  nftValue?: string;
  nftUnit?: CurrencyUnitEnum;
  squarePrice?: number;
  lastEditInput?: InputEstimateParamsEnum;
  changeUnit?: boolean;
  category?: string;
}

export type PriceNFTBaseOnDollar = {
  [key in CurrencyUnitEnum]?: number | undefined;
};

export interface NFTDetail extends NFT {
  months: number;
  days: number;
  hours: number;
  nftUnit: CurrencyUnitEnum;
  totalValueByUSD: number;
}

export interface EditNFTReducer {
  nftDetail?: NFTDetail;
  params: {
    months?: string;
    days?: string;
    hours?: string;
    position?: string;
    nftValue?: string;
    nftUnit: CurrencyUnitEnum;
    squarePrice?: number;
    lastEditInput?: InputEstimateParamsEnum;
    category?: string;
  };
  estimateInfo: {
    percentile?: number;
    avgTime?: number;
    positionWithinBlock?: number;
    blockNumber?: number;
  };
  priceNFT: PriceNFTBaseOnDollar;
  categories: CategoryWithinParsedLink[];
}

export interface EstimateNFTRequestActionTypes {
  type: AddNftActionTypeEnum.GET_ESTIMATE;
  payload: GetNftEstimateParams;
}

export interface EstimateNFTSuccessActionTypes {
  type: AddNftActionTypeEnum.GET_ESTIMATE_SUCCESS;
  payload: NFTEstimateResponse;
}

export interface PriceNFTSuccessActionTypes {
  type: AddNftActionTypeEnum.GET_PRICE_NFT_SUCCESS;
  payload: PriceNFTBaseOnDollar;
}

export interface EstimateNFTFailActionTypes {
  type: AddNftActionTypeEnum.GET_ESTIMATE_FAIL;
}

export interface EstimateNFTResetActionTypes {
  type: AddNftActionTypeEnum.RESET_ESTIMATE;
}

export interface SetDefaultPositonEstimateActionTypes {
  type: AddNftActionTypeEnum.SET_DEFAULT_POSTION;
}

export interface AddCategoriesToEstimateActionTypes {
  type: AddNftActionTypeEnum.ADD_CATEGORIES;
  payload: CategoryWithinParsedLink[];
}

export interface DeleteCategoryInEstimateNFTActionTypes {
  type: AddNftActionTypeEnum.DELETE_CATEGORY;
  payload: string;
}

export type EstimateNFTActionTypes =
  | EstimateNFTRequestActionTypes
  | EstimateNFTSuccessActionTypes
  | PriceNFTSuccessActionTypes
  | EstimateNFTFailActionTypes
  | EstimateNFTResetActionTypes
  | SetDefaultPositonEstimateActionTypes
  | AddCategoriesToEstimateActionTypes
  | DeleteCategoryInEstimateNFTActionTypes;

export interface GetNFTDetailSuccessActionTypes {
  type: EditNFTActionTypeEnum.GET_NFT_DETAIL_SUCCESS;
  payload: NFT;
}

export interface GetCurrentEstimateSuccessActionTypes {
  type: EditNFTActionTypeEnum.GET_CURRENT_ESTIMATE_INFO_SUCCESS;
  payload: NFTEstimateResponse;
}

export interface GetPriceNFTForEditSuccessActionTypes {
  type: EditNFTActionTypeEnum.GET_PRICE_NFT_FOR_EDIT_SUCCESS;
  payload: PriceNFTBaseOnDollar;
}

export interface EstimateNFTForEditRequestActionTypes {
  type: EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT;
  payload: GetNftEstimateParams;
}

export interface EstimateNFTForEditSuccessActionTypes {
  type: EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT_SUCCESS;
  payload: NFTEstimateResponse;
}

export interface EstimateNFTForEditFailedActionTypes {
  type: EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT_FAIL;
}

export interface ResetEsitmateForEditActionTypes {
  type: EditNFTActionTypeEnum.RESET_ESTIMATE_FOR_EDIT;
}

export interface DeleteCategoryInEditNFTActionTypes {
  type: EditNFTActionTypeEnum.DELETE_CATEGORY;
  payload: string;
}

export type EditNFTActionTypes =
  | GetNFTDetailSuccessActionTypes
  | GetCurrentEstimateSuccessActionTypes
  | GetPriceNFTForEditSuccessActionTypes
  | EstimateNFTForEditRequestActionTypes
  | EstimateNFTForEditSuccessActionTypes
  | EstimateNFTForEditFailedActionTypes
  | ResetEsitmateForEditActionTypes
  | DeleteCategoryInEditNFTActionTypes;
