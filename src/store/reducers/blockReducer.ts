import { BlockActionTypes, BlockData } from 'types/block';
import { BlockActionTypeEnum } from './../../enums/actions';

export const initialBlockState: BlockData[] = [];

export const blockReducer = (
  state = initialBlockState,
  action: BlockActionTypes,
) => {
  switch (action.type) {
    case BlockActionTypeEnum.GET_ALL_BLOCK: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
