import { SummarizeActionTypeEnum } from '../../enums/actions';
import { SummarizeData, SummarizeActionTypes } from './../../types/summarize';

export const initialSummarize: SummarizeData = {
  nfts: 0,
  owners: 0,
  collections: 0,
  firstPlace: 0,
  lastPlace: 0,
  _24HrVolume: 0,
  allTimeVolume: 0,
};

export const summarizeReducer = (
  state = initialSummarize,
  action: SummarizeActionTypes,
) => {
  switch (action.type) {
    case SummarizeActionTypeEnum.GET_SUMMARIZE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
