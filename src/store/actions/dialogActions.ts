import { DialogState } from './../../types/dialogState';
import { DialogActionTypeEnum } from '../../enums/actions';

export const updateDialogStateAction = (payload: DialogState) => ({
  type: DialogActionTypeEnum.CHANGE_OPEN_STATE,
  payload,
});
