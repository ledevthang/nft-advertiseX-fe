import { AdminActionTypeEnum, UserActionTypeEnum } from '../enums/actions';

export interface UserData {
  id: number;
  address: string;
  logoUrl?: string;
  settings?: string;
  email?: string;
  isBlocked?: boolean;
  isAdmin?: boolean;
}

export interface UserState {
  user?: UserData;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

export interface GetUserRequest {
  username: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface UpdateUserRequest {
  logoUrl?: string;
  email?: string;
  settings?: string;
}

export interface GetUserAction {
  type: typeof UserActionTypeEnum.GET_USER;
  payload: UserData;
}

export interface UserLoginAction {
  type: typeof UserActionTypeEnum.LOGIN;
  payload: UserData;
}
export interface AdminLoginAction {
  type: typeof AdminActionTypeEnum.LOGIN;
  payload: UserData;
}

export interface UserLogoutAction {
  type: typeof UserActionTypeEnum.LOGOUT;
  payload: UserData;
}

export type UserActionTypes =
  | GetUserAction
  | UserLoginAction
  | UserLogoutAction;

export type AdminActionTypes = AdminLoginAction;
