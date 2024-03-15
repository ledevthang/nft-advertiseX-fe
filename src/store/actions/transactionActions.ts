import { getCoinIdFromCurrencyFilter, getPastDate } from 'common/helper';
import { TransactionActionEnum } from 'enums/actions';
import transactionSvc from 'services/transaction';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import {
  GetTransactionRequest,
  GetTransactionVolumeRequest,
  TransactionVolume,
  transactionState,
  Transaction,
} from 'types/transaction';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import dayjs from 'dayjs';
import { AdminChartFilterByDate } from 'enums/filter';
import nftService from 'services/nfts';
import { updateDialogStateAction } from './dialogActions';
import CommonSuccessDialog from 'components/Dialog/CommonSuccessDialog';
import CommonFailedDialog from 'components/Dialog/CommonFailedDialog';

export const getTransactionSuccessAction = (payload: transactionState) => {
  return {
    type: TransactionActionEnum.GET_ALL_TRANSACTIONS,
    payload,
  };
};

export const getTransactionVolumeSuccessAction = (
  payload: TransactionVolume,
) => {
  return {
    type: TransactionActionEnum.GET_TRANSACTION_VOLUME,
    payload,
  };
};

export const deleteTransactionSucccessAction = (
  payload: Partial<Transaction>,
) => {
  return {
    type: TransactionActionEnum.DELETE_TRANSACTION,
    payload,
  };
};

export const getTransactionAction = (params: GetTransactionRequest) => {
  const taskId = TransactionActionEnum.GET_ALL_TRANSACTIONS;
  return async (dispatch: DispatchType) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await transactionSvc.GetTransactions({
        ...params,
      });
      dispatch(
        getTransactionSuccessAction({
          ...params,
          ...data,
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getTransactionVolumeAction = (
  params: GetTransactionVolumeRequest,
) => {
  const taskId = TransactionActionEnum.GET_TRANSACTION_VOLUME;
  return async (dispatch: DispatchType) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const date = dayjs(new Date());
      let startTime;
      if (params.time === AdminChartFilterByDate.PAST_YEAR) {
        startTime = date.subtract(1, 'year').toDate();
      } else {
        startTime = date.subtract(getPastDate(params.time), 'day').toDate();
      }
      const currency = await nftService.getNFTPriceBaseOnDollar();
      const coinId = getCoinIdFromCurrencyFilter(params.currency, currency);
      const data: any = await transactionSvc.GetTransactionVolume({
        startTime,
        coinId,
      });
      dispatch(getTransactionVolumeSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const deleteTransaction = (id: string, callback: () => void) => {
  const taskId = TransactionActionEnum.DELETE_TRANSACTION;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await transactionSvc.DeleteTransaction(id);
      dispatch(
        updateDialogStateAction({
          open: true,
          component: CommonSuccessDialog,
          props: {
            callback,
          },
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      dispatch(
        updateDialogStateAction({
          open: true,
          component: CommonFailedDialog,
        }),
      );
    }
  };
};
