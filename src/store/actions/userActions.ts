import { LoginResponse, UpdateUserRequest } from './../../types/userState';
import { UserActionTypeEnum } from 'enums/actions';
import userSvc from 'services/users';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import { UserData } from 'types/userState';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import secureStorageUtils from 'utils/secureStorage';
import { SecureStorageEnum } from 'enums/auth';
import * as jwt from 'jsonwebtoken';
import { SALT_VALUE } from 'common/constant';

export const getUserSuccessAction = (payload: UserData | undefined) => {
  return {
    type: UserActionTypeEnum.GET_USER,
    payload,
  };
};

export const loginUserSuccessAction = (payload: LoginResponse) => {
  return {
    type: UserActionTypeEnum.LOGIN,
    payload,
  };
};

export const logoutUserSuccessAction = () => {
  return {
    type: UserActionTypeEnum.LOGOUT,
    payload: {
      user: undefined,
    },
  };
};

export const getUserAction = () => {
  const taskId = UserActionTypeEnum.GET_USER;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await userSvc.GetUser();
      dispatch(getUserSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const loginUserAction = (
  params: { username: string },
  loginErrorCallback: () => void,
  loginSuccess?: () => void,
) => {
  const taskId = UserActionTypeEnum.LOGIN;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const password = jwt.sign(params, SALT_VALUE);
      const data = await userSvc.LoginUser({
        ...params,
        password,
      });
      secureStorageUtils.setItem(
        SecureStorageEnum.ACCESS_TOKEN,
        data.accessToken,
      );
      secureStorageUtils.setItem(
        SecureStorageEnum.REFRESH_TOKEN,
        data.refreshToken,
      );
      dispatch(loginUserSuccessAction(data));
      loginSuccess && loginSuccess();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      loginErrorCallback();
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const logoutUserAction = () => {
  const taskId = UserActionTypeEnum.LOGOUT;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await userSvc.LogoutUser();
      secureStorageUtils.removeItem(SecureStorageEnum.ACCOUNT);
      secureStorageUtils.removeItem(SecureStorageEnum.REFRESH_TOKEN);
      secureStorageUtils.removeItem(SecureStorageEnum.ACCESS_TOKEN);
      dispatch(logoutUserSuccessAction());
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const updateUserAction = (
  body: UpdateUserRequest,
  callback?: (status: boolean) => void,
) => {
  const taskId = UserActionTypeEnum.UPDATE_USER;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await userSvc.UpdateUser(body);
      const user = await userSvc.GetUser();
      dispatch(getUserSuccessAction(user));
      callback && callback(true);
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      callback && callback(false);
    }
  };
};
