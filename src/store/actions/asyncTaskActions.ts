import { AsyncTaskTypeEnum } from 'enums/actions';
import { ApiError } from 'types/api';
import {
  AsyncTaskStopAction,
  AsyncTaskStartAction,
  AsyncTaskResetAction,
} from 'types/asyncTaskState';

export const asyncTaskStartAction = (key: string): AsyncTaskStartAction => ({
  type: AsyncTaskTypeEnum.ASYNC_TASK_START,
  payload: key,
});

export const asyncTaskStopAction = (
  key: string,
  error?: ApiError,
): AsyncTaskStopAction => ({
  type: AsyncTaskTypeEnum.ASYNC_TASK_STOP,
  payload: { key, error },
});

export const ayncTaskResetAction = (key: string): AsyncTaskResetAction => ({
  type: AsyncTaskTypeEnum.ASYNC_TASK_RESET,
  payload: key,
});
