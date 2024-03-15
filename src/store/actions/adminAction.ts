import { LoginResponse, LoginUserRequest } from './../../types/userState';
import { AdminActionTypeEnum } from 'enums/actions';
import userSvc from 'services/users';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import secureStorageUtils from 'utils/secureStorage';
import { SecureStorageEnum } from 'enums/auth';

export const loginAdminSuccessAction = (payload: LoginResponse) => {
  return {
    type: AdminActionTypeEnum.LOGIN,
    payload,
  };
};

export const adminLoginAction = (
  body: LoginUserRequest,
  callback: (status: boolean) => void,
) => {
  const taskId = AdminActionTypeEnum.LOGIN;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await userSvc.LoginUser(body);
      secureStorageUtils.setItem(
        SecureStorageEnum.ACCESS_TOKEN_ADMIN,
        data.accessToken,
      );
      secureStorageUtils.setItem(
        SecureStorageEnum.REFRESH_TOKEN_ADMIN,
        data.refreshToken,
      );
      dispatch(loginAdminSuccessAction(data));
      callback(true);
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      callback(false);
    }
  };
};
