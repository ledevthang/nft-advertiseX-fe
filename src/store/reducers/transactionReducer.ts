import { TransactionActionType, transactionState } from 'types/transaction';
import { TransactionActionEnum } from 'enums/actions';

export const initialTransactionState: transactionState = {
  pageNumber: 1,
  pageSize: 4,
  total: 0,
  data: [],
};

export const transactionReducer = (
  state = initialTransactionState,
  action: TransactionActionType,
) => {
  switch (action.type) {
    case TransactionActionEnum.GET_ALL_TRANSACTIONS: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }

    case TransactionActionEnum.DELETE_TRANSACTION: {
      const newData = state.data.map((tran) => {
        if (tran.id === action.payload.id) {
          return { ...tran, isDeleted: true };
        }
        return tran;
      });
      return {
        ...state,
        data: newData,
      };
    }

    default:
      return state;
  }
};
