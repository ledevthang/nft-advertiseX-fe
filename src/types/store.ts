import { transactionState, TransactionVolume } from 'types/transaction';
import { PaginationData } from 'enums/pagination';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { CollectionData } from 'types/collections';
import { AsyncTaskReducerState } from './asyncTaskState';
import { DialogState } from './dialogState';
import { FilterState } from './filterState';
import { NFT } from './nft';
import { UserState } from './userState';
import { SummarizeData } from './summarize';
import { BlockData, BlockDataByTime } from './block';
import { NotificationResponse } from './notification';
import { NftEstimateStateReducer, EditNFTReducer } from './addNft';
import { WalletBlocker } from './walletBlocker';
import { AppState } from './appState';
import { SystemMessage } from './systemMessage';
import { RecentSales } from 'types/recentSales';
import { DataSearchCategories } from './search';
import {
  CategoriesState,
  DataBlockCategoriesBlock,
  DataCategories,
} from './categories';
import { ResponseListCategories } from 'types/categories';
import { TWalletData } from 'types/aurawallet';

export type DispatchType = ThunkDispatch<any, any, AnyAction>;

export type RootStateType = {
  asyncTaskReducer: AsyncTaskReducerState;
  filterReducer: FilterState;
  collectionsReducer: PaginationData<CollectionData>;
  categoriesReducer: PaginationData<DataCategories>;
  nftsReducer: PaginationData<NFT> & { totalInactive?: number };
  nftPreviewReducer: NFT | null;
  dialogReducer: DialogState;
  userReducer: UserState;
  adminReducer: UserState;
  summarizeReducer: SummarizeData;
  nftDetailReducer: NFT | null;
  blockReducer: BlockData[];
  notificationReducer: NotificationResponse;
  nftEstimateReducer: NftEstimateStateReducer;
  transactionReducer: transactionState;
  recentSalesReducer: PaginationData<RecentSales>;
  walletBlockerReducer: PaginationData<WalletBlocker>;
  transactionVolumeReducer: TransactionVolume;
  appStateReducer: AppState;
  editNFTReducer: EditNFTReducer;
  systemMessageReducer: SystemMessage;
  blocksByTimeReducer: BlockDataByTime;
  searchReducer: DataSearchCategories;
  tableCategoriesReducer: CategoriesState;
  blockCategoriesReducer: DataBlockCategoriesBlock;
  listCategoriesReducer: ResponseListCategories;
  auroWalletReducer: TWalletData
};

export type ThunkActionType = ThunkAction<
  Promise<void>,
  RootStateType,
  Record<string, unknown>,
  AnyAction
>;
