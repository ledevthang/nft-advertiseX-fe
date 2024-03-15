import { AdminActionTypes } from 'types/userState';
import { AdminActionTypeEnum } from './../../enums/actions';
import { UserState } from './../../types/userState';

export const initialAdminState: UserState = {};

export const adminReducer = (
  state = initialAdminState,
  action: AdminActionTypes,
) => {
  switch (action.type) {
    case AdminActionTypeEnum.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
