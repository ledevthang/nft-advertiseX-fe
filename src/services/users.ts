import {
  UserData,
  LoginUserRequest,
  LoginResponse,
  UpdateUserRequest,
} from './../types/userState';
import { apiRoutesEnum } from 'enums/routes';
import AXIOS from './axios';

async function GetUser(): Promise<UserData | undefined> {
  return AXIOS.get(apiRoutesEnum.USER);
}

async function LoginUser(body: LoginUserRequest): Promise<LoginResponse> {
  const { data } = await AXIOS.post(apiRoutesEnum.LOGIN, {
    ...body,
  });
  return data;
}

async function LogoutUser() {
  // return AXIOS.post(apiRoutesEnum.LOGIN, { params });
  return {
    accessToken: '',
    user: undefined,
  };
}

async function UpdateUser(body: UpdateUserRequest): Promise<UserData> {
  return AXIOS.put(apiRoutesEnum.UPDATE_USER, {
    ...body,
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetUser,
  LoginUser,
  LogoutUser,
  UpdateUser,
};
