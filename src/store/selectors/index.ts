import { RootStateType as IStore } from '../../types/store';
import { createSelector } from 'reselect';

// AppReducer
export const sTaskStatus = (key: string) => (store: IStore) =>
  store.asyncTaskReducer.status[key];

export const getFilterState = (store: IStore) => ({ ...store.filterReducer });
export const getCollections = (store: IStore) => [
  ...store.collectionsReducer.data,
];
export const getCategories = (store: IStore) => [
  ...store.categoriesReducer.data,
];
export const getPaginationCollections = (store: IStore) => ({
  pageNumber: store.collectionsReducer.pageNumber,
  pageSize: store.collectionsReducer.pageSize,
  total: store.collectionsReducer.total,
});

export const getPaginationCategories = (store: IStore) => ({
  pageNumber: store.categoriesReducer.pageNumber,
  pageSize: store.categoriesReducer.pageSize,
  total: store.categoriesReducer.total,
});

export const getNFTs = (store: IStore) => [...store.nftsReducer.data];
export const getRawNFTs = (store: IStore) => [
  store.nftsReducer.data[0],
  ...store.nftsReducer.data,
];
export const getPaginationNFT = (store: IStore) => ({
  pageNumber: store.nftsReducer.pageNumber,
  pageSize: store.nftsReducer.pageSize,
  total: store.nftsReducer.total,
  totalInactive: store.nftsReducer.totalInactive,
});
export const getNFTPreview = (store: IStore) => store.nftPreviewReducer;
export const getDialogState = (store: IStore) => store.dialogReducer;
export const getUserState = (store: IStore) => store.userReducer;
export const getAdminState = (store: IStore) => store.adminReducer;
export const getSummarize = (store: IStore) => store.summarizeReducer;
export const getNFTDetail = (store: IStore) => store.nftDetailReducer;
export const getBlocks = (store: IStore) => store.blockReducer;
export const getBlocksCategories = (store: IStore) =>
  store.blockCategoriesReducer;
export const getsUserSettings = (store: IStore) =>
  store.userReducer.user?.settings;
export const getNotSeenNotifications = (store: IStore) =>
  store.notificationReducer.totalNotSeen;
export const getMyNotifications = (store: IStore) =>
  store.notificationReducer.data;

export const getNFTEstimate = (store: IStore) => store.nftEstimateReducer;
export const getTransactions = (store: IStore) => store.transactionReducer.data;
export const getTransactionPagination = (store: IStore) => ({
  pageNumber: store.transactionReducer.pageNumber,
  pageSize: store.transactionReducer.pageSize,
  total: store.transactionReducer.total,
});
export const getTransactionSearchParam = (store: IStore) => ({
  txId: store.transactionReducer.txId,
  collection: store.transactionReducer.collection,
  walletAddress: store.transactionReducer.walletAddress,
  nftName: store.transactionReducer.nftName,
  status: store.transactionReducer.status,
});
export const getWalletBlocker = (store: IStore) => store.walletBlockerReducer;
export const getTransactionVolume = (store: IStore) =>
  store.transactionVolumeReducer;
export const scrollState = (store: IStore) => store.appStateReducer.isScrolling;
export const getEditNFT = (store: IStore) => store.editNFTReducer;
export const getNFTDetailForEdit = (store: IStore) =>
  store.editNFTReducer.nftDetail;
export const getNFTPriceForEdit = (store: IStore) =>
  store.editNFTReducer.priceNFT;
export const getNFTParamsForEdit = (store: IStore) =>
  store.editNFTReducer.params;
export const getNFTEstimateInfoForEdit = (store: IStore) =>
  store.editNFTReducer.estimateInfo;
export const getSysMessage = (store: IStore) => store.systemMessageReducer;
export const loadedState = (store: IStore) => store.appStateReducer.isLoaded;

export const getNFTById = createSelector(
  [
    (state) => state.nftsReducer.data,
    (state, id: number) => id,
    (state) => state,
  ],
  (nfts, id, store) => {
    const nft = nfts.find((nft: any) => nft.id === id);
    if (nft) return nft;
    return getNFTDetail(store);
  },
);

// get sale
export const getRecentSales = (store: IStore) => store.recentSalesReducer.data;

export const getRecentSalesPagination = (store: IStore) => ({
  pageNumber: store.recentSalesReducer.pageNumber,
  pageSize: store.recentSalesReducer.pageSize,
  total: store.recentSalesReducer.total,
});
export const getSnackState = (store: IStore) => ({
  isShowSnack: store.appStateReducer.isShowSnack,
  snackContent: store.appStateReducer.snackContent,
  type: store.appStateReducer.type,
  snackLabel: store.appStateReducer.snackLabel,
  snackClass: store.appStateReducer.snackClass,
});

export const getBlocksByTime = (store: IStore) => store.blocksByTimeReducer;

export const getSearchState = (store: IStore) => store.searchReducer;
export const getTableCategories = (store: IStore) =>
  store.tableCategoriesReducer.tableCategories;

export const getAllCategories = (store: IStore) =>
  store.tableCategoriesReducer.allCategories;

export const getSearchAllCategories = (store: IStore) =>
  store.tableCategoriesReducer.searchCategories;

export const getListCategories = (store: IStore) => store.listCategoriesReducer;
