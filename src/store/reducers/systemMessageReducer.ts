import { SystemMessageActionTypeEnum } from './../../enums/actions';
import {
  SystemMessage,
  SystemMessageActionTypes,
} from './../../types/systemMessage';

export const initialSystemMessageState: SystemMessage = {
  open: false,
  status: 'success',
  message: '',
};

export const systemMessageReducer = (
  state = initialSystemMessageState,
  action: SystemMessageActionTypes,
) => {
  switch (action.type) {
    case SystemMessageActionTypeEnum.UPDATE_SYSTEM_MESSAGE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
