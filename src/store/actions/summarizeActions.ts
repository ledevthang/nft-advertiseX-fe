import { SummarizeActionTypeEnum } from 'enums/actions';
import summarizeSvc from 'services/summarize';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import { SummarizeData } from 'types/summarize';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getSummarizeSuccessAction = (payload: SummarizeData) => {
  return {
    type: SummarizeActionTypeEnum.GET_SUMMARIZE,
    payload,
  };
};

export const getSummarizeAction = () => {
  const taskId = SummarizeActionTypeEnum.GET_SUMMARIZE;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await summarizeSvc.GetSummarize();
      dispatch(getSummarizeSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
