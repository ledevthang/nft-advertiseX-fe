import { UserActionTypes } from 'types/userState';
import { UserActionTypeEnum } from './../../enums/actions';
import { UserState } from './../../types/userState';

export const initialUserState: UserState = {};

export const userReducer = (
  state = initialUserState,
  action: UserActionTypes,
) => {
  switch (action.type) {
    case UserActionTypeEnum.GET_USER: {
      return {
        ...state,
        user: action.payload
          ? {
              ...action.payload,
            }
          : undefined,
      };
    }
    case UserActionTypeEnum.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UserActionTypeEnum.LOGOUT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
