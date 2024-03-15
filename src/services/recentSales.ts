import { PaginationData } from 'enums/pagination';
import { apiRoutesEnum } from 'enums/routes';
import { GetRecentSalesRequest } from 'types/recentSales';
import { RecentSales } from 'types/recentSales';

import AXIOS from './axios';

export async function GetRecentSales(
  params: GetRecentSalesRequest,
): Promise<PaginationData<RecentSales>> {
  return AXIOS.get(apiRoutesEnum.RECENT_SALES, { params });
}
