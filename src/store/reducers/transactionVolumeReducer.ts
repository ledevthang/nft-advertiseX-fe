import { TransactionActionEnum } from 'enums/actions';
import {
  TransactionVolume,
  TransactionVolumeActionType,
} from 'types/transaction';

export const initialTransactionVolumeState: TransactionVolume = {
  opensea: 0,
  solanart: 0,
  looksrare: 0,
};

export const transactionVolumeReducer = (
  state = initialTransactionVolumeState,
  action: TransactionVolumeActionType,
) => {
  switch (action.type) {
    case TransactionActionEnum.GET_TRANSACTION_VOLUME: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
