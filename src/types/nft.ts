import { CollectionData } from 'types/collections';
import { EChain } from 'enums/filter';
import { NFTsActionTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from '../enums/pagination';
import { CurrencyUnitEnum } from 'enums/addNft';
import { ICategory } from 'types/category';

export enum nftStatusEnum {
  TOP_BID = 'Top Bid',
  BEST_OFFER = 'Best Offer',
  PRICE = 'Price',
  MIN_BID = 'Min Bid',
}

export interface NFT {
  id: number;
  nftName: string;
  chain: EChain;
  tokenId: string;
  tokenAddress: string;
  image_url: string;
  price?: number;
  status: nftStatusEnum;
  lastSale: string;
  blockNumber: number;
  positionWithinBlock: number;
  squarePrice: number;
  timeLeft: number;
  viewCount: number;
  userId?: string;
  collectionId: number;
  marketplace: MarketPlace;
  isActive: boolean;
  originalUrl: string;
  endDate: Date;
  collection: CollectionData;
  transactions?: any;
  lastPosition: number;
  position: string;
  shouldEstimate?: boolean;
  metadata_url: string;
  metadata: string;
  isCloned: boolean;
  isCloneFromUser?: boolean;
  isProcessPayment?: boolean;
  createdAt: string;
  categories: ICategory[];
  positionOnCategories?: { name: string; position: number }[];
}

export interface NFTGetAllRequest extends PaginationRequest {
  filterBy?: string;
  collectionIds?: number[];
  chains?: string[];
  blockNumber?: number;
  categories?: string;
  isActive?: boolean;
  blockCategory?: string;
}

export interface GetNFTDetailRequest {
  nftId: string;
}

export enum MarketPlace {
  OPENSEA = 'opensea',
  LOOKSRARE = 'looksrare',
  SOLANART = 'solanart',
  MAGICEDEN = 'magiceden',
}

export interface CreateNFT {
  tokenId: string;
  tokenAddress: string;
  marketplace: MarketPlace;
  chain: EChain;
  isProcessPayment?: boolean;
  isCloneFromUser?: boolean;
  time: number;
  categoriesOnNft: string[];
}

export interface GetMyNFTRequest extends PaginationRequest {
  filterBy?: string;
}

export interface NFTPreviewRequest {
  tokenId?: string;
  marketplace: string;
  chain: string;
  tokenAddress?: string;
  collection?: string;
}

export interface NFTPreview {
  nft?: NFT;
  error?: string;
}
export interface NFTGetAllAction {
  type:
    | NFTsActionTypeEnum.GET_NFTS
    | NFTsActionTypeEnum.GET_NFTS_BEFORE
    | NFTsActionTypeEnum.GET_NFTS_TABLET_AT_FIRST;
  payload: PaginationData<NFT>;
}

export interface NFTDetailGetAction {
  type: NFTsActionTypeEnum.GET_NFT_DETAIL;
  payload: NFT | null;
}
export interface NFTPreviewGetAction {
  type: NFTsActionTypeEnum.GET_NFT_PREVIEW;
  payload: NFT | null;
}

export interface MyNFTsAction {
  type: NFTsActionTypeEnum.GET_MY_NFTS;
  payload: PaginationData<NFT>;
}

export interface DeleteMyNFTAction {
  type: NFTsActionTypeEnum.DELETE_MY_NFTS;
  payload: PaginationData<NFT>;
}

export interface CreateNFTAction {
  type: NFTsActionTypeEnum.CREATE_NEW_NFT;
  payload: PaginationData<NFT>;
}

export type NFTActionTypes =
  | NFTGetAllAction
  | MyNFTsAction
  | DeleteMyNFTAction
  | CreateNFTAction;
export interface NFTEstimateRequest {
  categories?: string;
  squarePrice?: number;
  position?: number;
  category?: string;
}

export interface NFTEstimateResponse {
  avgTime: number;
  squarePrice?: number;
  positionWithinBlock: number;
  blockNumber: number;
  position?: number;
  postionOnCategories: {
    name: string;
    position: number;
  }[];
}

export type NFTPriceResponseType = Array<NFTPriceType>;

export interface NFTPriceType {
  id: number;
  name: string;
  symbol: CurrencyUnitEnum;
  rate: number;
}

export type NFTPreviewActionTypes = NFTPreviewGetAction;

export type NFTDetailActionTypes = NFTDetailGetAction;
