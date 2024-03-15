import { SecureStorageEnum } from 'enums/auth';

//Local Strorage
const setItem = (name: SecureStorageEnum, value: string) => {
  return localStorage.setItem(name, value);
};

const getItem = (name: SecureStorageEnum) => {
  return localStorage.getItem(name);
};

const removeItem = (name: SecureStorageEnum) => {
  return localStorage.removeItem(name);
};

//Session Strorage
const setItemSS = (name: SecureStorageEnum, value: string) => {
  return sessionStorage.setItem(name, value);
};

const getItemSS = (name: SecureStorageEnum) => {
  return sessionStorage.getItem(name);
};

const removeItemSS = (name: SecureStorageEnum) => {
  return sessionStorage.removeItem(name);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setItem,
  getItem,
  removeItem,
  setItemSS,
  getItemSS,
  removeItemSS,
};
