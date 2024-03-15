import { GetRecentSalesRequest } from 'types/recentSales';
import { RecentSalesActionEnum } from 'enums/actions';
import { DispatchType } from 'types/store';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import { PaginationData } from 'enums/pagination';
import { GetRecentSales } from 'services/recentSales';
import { ApiError } from 'types/api';
import { RecentSales } from 'types/recentSales';
export const getRecentSalesSuccessAction = (
  payload: PaginationData<RecentSales>,
) => {
  return {
    type: RecentSalesActionEnum.GET_RECENT_SALES,
    payload,
  };
};

export const getRecentSalesAction = (params: GetRecentSalesRequest) => {
  const taskId = RecentSalesActionEnum.GET_RECENT_SALES;
  return async (dispatch: DispatchType) => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await GetRecentSales(params);
      dispatch(getRecentSalesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
