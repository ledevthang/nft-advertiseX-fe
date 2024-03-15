import { IncomingHttpHeaders } from 'http';
import { AxiosRequestConfig } from 'axios';

interface ApiErrorData {
  message: string;
}

export interface ApiError {
  config?: AxiosRequestConfig;
  data?: ApiErrorData;
  headers?: IncomingHttpHeaders;
  status?: number;
  statusText?: string;
}

export interface ApiRequestState {
  apiRequest: boolean;
  apiSuccess: boolean;
  apiFail: boolean;
}
