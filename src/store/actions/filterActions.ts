import { FilterActionTypeEnum } from '../../enums/actions';
import { FilterState } from '../../types/filterState';

export const updateFilterAction = (payload: Partial<FilterState>) => ({
  type: FilterActionTypeEnum.CHANGE_FILTER,
  payload,
});

export const resetFilterAction = () => ({
  type: FilterActionTypeEnum.RESET_FILTER,
});
