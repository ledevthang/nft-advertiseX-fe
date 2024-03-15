import { BlocksByTimeActionTypes, BlockDataByTime } from 'types/block';
import { BlockActionTypeEnum } from './../../enums/actions';

export const initialBlocksByTimeState: BlockDataByTime = {
  id: '',
  path: '',
};

export const blocksByTimeReducer = (
  state = initialBlocksByTimeState,
  action: BlocksByTimeActionTypes,
) => {
  switch (action.type) {
    case BlockActionTypeEnum.GET_BLOCKS_BY_TIME: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
