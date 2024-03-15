import { PaginationData } from './../../enums/pagination';
import { WalletBlockerActionEnum } from 'enums/actions';
import { WalletBlocker, WalletBlockerActionType } from 'types/walletBlocker';

export const initialWalletBlockerState: PaginationData<WalletBlocker> = {
  pageNumber: 1,
  pageSize: 4,
  total: 0,
  data: [],
};

export const walletBlockerReducer = (
  state = initialWalletBlockerState,
  action: WalletBlockerActionType,
) => {
  switch (action.type) {
    case WalletBlockerActionEnum.GET_ALL_WALLER_BLOCKERS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
