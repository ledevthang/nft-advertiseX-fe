import { AsyncTaskTypeEnum } from 'enums/actions';
import {
  AsyncTaskReducerState,
  AsyncTaskActionTypes,
} from 'types/asyncTaskState';

export const initialAsyncTaskState: AsyncTaskReducerState = {
  status: {},
};

export const asyncTaskReducer = (
  state = initialAsyncTaskState,
  action: AsyncTaskActionTypes,
) => {
  switch (action.type) {
    case AsyncTaskTypeEnum.ASYNC_TASK_START: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: {
            processing: true,
          },
        },
      };
    }
    case AsyncTaskTypeEnum.ASYNC_TASK_STOP: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload.key]: {
            processing: false,
            error: action.payload.error,
          },
        },
      };
    }
    case AsyncTaskTypeEnum.ASYNC_TASK_RESET: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: {
            processing: false,
          },
        },
      };
    }
    default:
      return state;
  }
};
