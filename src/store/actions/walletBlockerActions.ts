import CommonFailedDialog from 'components/Dialog/CommonFailedDialog';
import CommonSuccessDialog from 'components/Dialog/CommonSuccessDialog';
import { WalletBlockerActionEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import walletBlockerSvc from 'services/walletBlocker';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import { GetWalletBlockerRequest, WalletBlocker } from 'types/walletBlocker';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import { updateDialogStateAction } from './dialogActions';

export const getWalletBlockerSuccessAction = (
  payload: PaginationData<WalletBlocker>,
) => {
  return {
    type: WalletBlockerActionEnum.GET_ALL_WALLER_BLOCKERS,
    payload,
  };
};

export const getWalletBlockerAction = (params: GetWalletBlockerRequest) => {
  const taskId = WalletBlockerActionEnum.GET_ALL_WALLER_BLOCKERS;
  return async (dispatch: DispatchType) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await walletBlockerSvc.GetWalletBlockers(params);
      dispatch(getWalletBlockerSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const blockUserAction = (id: number, callback: () => void) => {
  const taskId = WalletBlockerActionEnum.BLOCK_USER;
  return async (dispatch: DispatchType) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await walletBlockerSvc.DeleteWalletBlockers(id);
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
      dispatch(
        updateDialogStateAction({
          open: true,
          component: CommonFailedDialog,
        }),
      );
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const unblockUserAction = (id: number, callback: () => void) => {
  const taskId = WalletBlockerActionEnum.UNBLOCK_USER;
  return async (dispatch: DispatchType) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await walletBlockerSvc.UnblockUser(id);
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
      dispatch(
        updateDialogStateAction({
          open: true,
          component: CommonFailedDialog,
        }),
      );
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
