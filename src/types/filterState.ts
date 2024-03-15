import { EChain, EPriceFilter } from 'enums/filter';
import { FilterActionTypeEnum } from '../enums/actions';

export interface FilterState {
  price: EPriceFilter[];
  collectionIds: number[];
  chains: EChain[];
  categories: string[];
  blockNumber?: number;
  blockCategory?: string;
}

export interface UpdateFilterAction {
  type: typeof FilterActionTypeEnum.CHANGE_FILTER;
  payload: FilterState;
}

export interface ResetFilterAction {
  type: typeof FilterActionTypeEnum.RESET_FILTER;
}

export type FilterActionTypes = UpdateFilterAction | ResetFilterAction;
