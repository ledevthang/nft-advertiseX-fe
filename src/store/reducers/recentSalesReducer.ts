import { PaginationData } from './../../enums/pagination';
import { RecentSalesActiontype } from 'types/recentSales';
import { RecentSalesActionEnum } from 'enums/actions';
import { RecentSales } from 'types/recentSales';

export const initialRecentSalesSate: PaginationData<RecentSales> = {
  pageNumber: 1,
  pageSize: 4,
  total: 0,
  data: [],
};

export const recentSalesReducer = (
  state = initialRecentSalesSate,
  action: RecentSalesActiontype,
) => {
  switch (action.type) {
    case RecentSalesActionEnum.GET_RECENT_SALES: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    default:
      return state;
  }
};
