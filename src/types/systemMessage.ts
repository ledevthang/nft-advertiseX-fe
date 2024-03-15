import { SystemMessageActionTypeEnum } from '../enums/actions';

export interface SystemMessage {
  open: boolean;
  status: 'error' | 'success';
  message: string;
}

export interface UpdateSysMessageAction {
  type: typeof SystemMessageActionTypeEnum.UPDATE_SYSTEM_MESSAGE;
  payload: SystemMessage;
}

export type SystemMessageActionTypes = UpdateSysMessageAction;
