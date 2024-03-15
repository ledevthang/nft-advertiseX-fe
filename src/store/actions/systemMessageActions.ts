import { SystemMessage } from 'types/systemMessage';
import { SystemMessageActionTypeEnum } from '../../enums/actions';

export const updateSysMessageAction = (payload: Partial<SystemMessage>) => ({
  type: SystemMessageActionTypeEnum.UPDATE_SYSTEM_MESSAGE,
  payload,
});
