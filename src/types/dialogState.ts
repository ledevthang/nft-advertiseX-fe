import { DialogActionTypeEnum } from '../enums/actions';

export interface DialogState {
  open: boolean;
  component?: any;
  props?: any;
}

export interface UpdateDialogAction {
  type: typeof DialogActionTypeEnum.CHANGE_OPEN_STATE;
  payload: DialogState;
}

export type DialogActionTypes = UpdateDialogAction;
