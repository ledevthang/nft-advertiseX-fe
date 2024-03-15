import { AsyncTaskTypeEnum } from 'enums/actions';
import { ApiError } from './api';

export type TaskStatus<E = ApiError> = {
  processing: boolean;
  error?: E;
};

export type AsyncTaskStatus = {
  // Dynamic key will be generate
  [key: string]: TaskStatus<ApiError> | undefined;
};

export type AsyncTaskReducerState = {
  status: AsyncTaskStatus;
};

export interface AsyncTaskStartAction {
  type: typeof AsyncTaskTypeEnum.ASYNC_TASK_START;
  payload: string;
}

export interface AsyncTaskStopAction {
  type: typeof AsyncTaskTypeEnum.ASYNC_TASK_STOP;
  payload: { key: string; error?: ApiError };
}

export interface AsyncTaskResetAction {
  type: typeof AsyncTaskTypeEnum.ASYNC_TASK_RESET;
  payload: string;
}
export type AsyncTaskActionTypes =
  | AsyncTaskStartAction
  | AsyncTaskStopAction
  | AsyncTaskResetAction;
