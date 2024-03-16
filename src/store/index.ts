import {
  initialSystemMessageState,
  systemMessageReducer,
} from './reducers/systemMessageReducer';
import {
  initialTransactionState,
  transactionReducer,
} from './reducers/transactionReducer';
import {
  initialNFTDetailState,
  nftDetailReducer,
} from './reducers/nftDetailReducer';
import { initialUserState, userReducer } from './reducers/userReducer';
import {
  initialSummarize,
  summarizeReducer,
} from './reducers/summarizeReducer';
import {
  nftPreviewReducer,
  initialNFTPreviewState,
} from './reducers/previewNFTReducer';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootStateType } from 'types/store';
import { LoginActionTypeEnum } from 'enums/actions';
import { initialFilterState, filterReducer } from './reducers/filterReducer';
import {
  initialAsyncTaskState,
  asyncTaskReducer,
} from './reducers/asyncTaskReducer';
import {
  initialCollections,
  collectionsReducer,
} from './reducers/collectionReducers';
import { initialNFTsState, nftsReducer } from './reducers/nftReducers';
import { dialogReducer, initialDialogState } from './reducers/dialogReducer';
import { initialBlockState } from './reducers/blockReducer';
import { blockReducer } from './reducers/blockReducer';
import {
  nftEstimateReducer,
  initialNftEstimateState,
} from './reducers/nftEstimateReducer';
import { editNFTReducer, initialEditNFTState } from './reducers/editNFTReducer';
import {
  notificationReducer,
  initialNotifications,
} from './reducers/notificationReducer';
import {
  walletBlockerReducer,
  initialWalletBlockerState,
} from './reducers/walletBlockerReducer';
import {
  transactionVolumeReducer,
  initialTransactionVolumeState,
} from './reducers/transactionVolumeReducer';

import {
  initialRecentSalesSate,
  recentSalesReducer,
} from './reducers/recentSalesReducer';
import { appStateReducer, initialAppState } from './reducers/appReducer';

import {
  blocksByTimeReducer,
  initialBlocksByTimeState,
} from './reducers/blocksByTimeReducer';
import { searchReducer, initalSearch } from './reducers/searchReducer';
import {
  categoriesReducer,
  initialCategories,
} from './reducers/categoriesReducer';
import {
  tableCategoriesReducer,
  initalCategories,
} from './reducers/tableCategoriesReducer';
import {
  blockCategoriesReducer,
  initialBlockCategoriesState,
} from './reducers/blockCategoriesReducer';
import {
  listCategoriesReducer,
  initialListCategories,
} from './reducers/listCategoriesReducer';
import { initialAdminState, adminReducer } from './reducers/adminReducer';

import { auroWalletReducer, initAuroWalletData } from './reducers/auroWalletReducer';


export const initialRootState: RootStateType = {
  asyncTaskReducer: initialAsyncTaskState,
  filterReducer: initialFilterState,
  collectionsReducer: initialCollections,
  categoriesReducer: initialCategories,
  nftsReducer: initialNFTsState,
  nftPreviewReducer: initialNFTPreviewState,
  dialogReducer: initialDialogState,
  userReducer: initialUserState,
  adminReducer: initialAdminState,
  summarizeReducer: initialSummarize,
  nftDetailReducer: initialNFTDetailState,
  blockReducer: initialBlockState,
  notificationReducer: initialNotifications,
  nftEstimateReducer: initialNftEstimateState,
  transactionReducer: initialTransactionState,
  walletBlockerReducer: initialWalletBlockerState,
  transactionVolumeReducer: initialTransactionVolumeState,
  appStateReducer: initialAppState,
  editNFTReducer: initialEditNFTState,
  systemMessageReducer: initialSystemMessageState,
  recentSalesReducer: initialRecentSalesSate,
  blocksByTimeReducer: initialBlocksByTimeState,
  searchReducer: initalSearch,
  tableCategoriesReducer: initalCategories,
  blockCategoriesReducer: initialBlockCategoriesState,
  listCategoriesReducer: initialListCategories,
  auroWalletReducer: initAuroWalletData
};

export default function configureStore (
  preloadedState: RootStateType = initialRootState,
) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(...enhancers)
      : compose(...enhancers);

  const appReducer = combineReducers<RootStateType>({
    asyncTaskReducer,
    filterReducer,
    collectionsReducer,
    categoriesReducer,
    nftsReducer,
    nftPreviewReducer,
    dialogReducer,
    userReducer,
    adminReducer,
    summarizeReducer,
    nftDetailReducer,
    blockReducer,
    notificationReducer,
    nftEstimateReducer,
    transactionReducer,
    walletBlockerReducer,
    transactionVolumeReducer,
    appStateReducer,
    editNFTReducer,
    systemMessageReducer,
    recentSalesReducer,
    blocksByTimeReducer,
    searchReducer,
    tableCategoriesReducer,
    blockCategoriesReducer,
    listCategoriesReducer,
    auroWalletReducer,
  });

  // Reset state after logout
  const rootReducer = (state: RootStateType, action: AnyAction) => {
    return action.type === LoginActionTypeEnum.LOGOUT
      ? initialRootState
      : appReducer(state, action);
  };

  // @ts-ignore
  return createStore(rootReducer, preloadedState, composedEnhancers);
}
