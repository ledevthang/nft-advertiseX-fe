import { NftEstimateStateReducer } from 'types/addNft';
import { CurrencyUnitEnum } from 'enums/addNft';
import { AddNftActionTypeEnum } from 'enums/actions';
import { EstimateNFTActionTypes } from 'types/addNft';
import { isNil } from 'lodash';
import { isStringNumber, caculateTotalDays } from 'utils/validateAddNFT';
import { TOTAL_NUMBER_NFT } from 'common/constant';
import { round } from 'lodash';
import { findPrecision } from 'utils/validateAddNFT';
import secureStorage from 'utils/secureStorage';
import { SecureStorageEnum } from 'enums/auth';

const nftPreview = secureStorage.getItemSS(SecureStorageEnum.NFT_TO_ESTIMATE);

const getInitialCategories = (nftPreview: any) => {
  if (nftPreview) {
    return (JSON.parse(nftPreview) as any)?.categories || [];
  } else {
    return [];
  }
};

const initialCategories = getInitialCategories(nftPreview);

export const initialNftEstimateState: NftEstimateStateReducer = {
  params: {
    nftUnit: CurrencyUnitEnum.ETH,
    months: '0',
    days: '0',
    hours: '0',
    nftValue: '',
  },
  estimateInfo: {},
  priceNFT: {},
  categories: initialCategories,
};

export const nftEstimateReducer = (
  state = initialNftEstimateState,
  action: EstimateNFTActionTypes,
): NftEstimateStateReducer => {
  switch (action.type) {
    case AddNftActionTypeEnum.GET_ESTIMATE: {
      const newState: NftEstimateStateReducer = {
        ...state,
        params: {
          ...state.params,
          ...action.payload,
        },
      };

      const { months, days, hours, nftValue, nftUnit, changeUnit } =
        newState.params;
      const price = newState.priceNFT[nftUnit];

      // update price per day base on days and value
      if (
        isStringNumber(months) &&
        isStringNumber(days) &&
        isStringNumber(hours) &&
        isStringNumber(nftValue) &&
        !isNil(price)
      ) {
        const totalDays = caculateTotalDays(
          Number(months!),
          Number(days!),
          Number(hours!),
        );
        let squarePrice: number | undefined = newState.params.squarePrice;

        if (totalDays > 0 && !changeUnit) {
          newState.params.squarePrice = (Number(nftValue) * price) / totalDays;
        } else if (totalDays > 0 && changeUnit && squarePrice) {
          newState.params.nftValue = ((squarePrice * totalDays) / price)
            .toFixed(6)
            .toString();
        }
      } else {
        newState.params.squarePrice = undefined;
      }

      // update estimate position of NFT within specific category
      if (action.payload.category && newState.categories) {
        if (newState.categories) {
          newState.categories = newState.categories.map((cat) => {
            if (cat.name === action.payload.category) {
              return {
                ...cat,
                position: Number(action.payload.position),
              };
            }

            return cat;
          });
        }
      }

      return newState;
    }
    case AddNftActionTypeEnum.GET_ESTIMATE_SUCCESS: {
      const { position, squarePrice, avgTime, postionOnCategories, ...rest } =
        action.payload;

      // update position in categories
      // const categories = [...state.categories].map((cat) => {
      //   const matchingCat = postionOnCategories.find(
      //     (item) => item.name === cat.name,
      //   );
      //   return matchingCat
      //     ? {
      //         ...cat,
      //         position: matchingCat.position,
      //       }
      //     : cat;
      // });

      const newState = {
        ...state,
        estimateInfo: {
          ...state.estimateInfo,
          ...rest,
        },
        categories: postionOnCategories as any,
        priceNFT: {
          ETH: squarePrice || Math.random(),
        },
      };

      // const { months, days, hours, nftUnit } = newState.params;
      // const totalDays = caculateTotalDays(
      //   Number(months!),
      //   Number(days!),
      //   Number(hours!),
      // );

      // // update avg time
      // newState.estimateInfo.avgTime =
      //   avgTime && ((totalDays * 24) / avgTime) * 100;

      // // estimate by price per day
      // if (action.payload.hasOwnProperty('position')) {
      //   newState.params.position = position?.toString();
      //   if (!isNil(position)) {
      //     newState.estimateInfo.percentile =
      //       (position / TOTAL_NUMBER_NFT) * 100;
      //   }
      // }

      // // estimate by position
      // if (action.payload.hasOwnProperty('squarePrice')) {
      //   const price = newState.priceNFT[nftUnit];
      //   newState.params.squarePrice = squarePrice;
      //   if (price && !isNil(squarePrice)) {
      //     const valueByUSD = squarePrice * totalDays;
      //     const valueByCoin = valueByUSD / price;
      //     newState.params.nftValue = round(valueByCoin, 7).toString();
      //     if (valueByCoin.toString().includes('e')) {
      //       const precision = findPrecision(valueByCoin);
      //       newState.params.nftValue = valueByCoin.toFixed(precision || 0);
      //     }
      //   }

      //   const positionInNFTCategory = newState.categories.find(
      //     (item) => item.name === 'NFT',
      //   )?.position;
      //   if (!isNil(positionInNFTCategory)) {
      //     newState.estimateInfo.percentile =
      //       (Number(positionInNFTCategory) / TOTAL_NUMBER_NFT) * 100;
      //   }
      // }

      return newState;
    }
    case AddNftActionTypeEnum.GET_ESTIMATE_FAIL: {
      return {
        ...state,
        estimateInfo: {},
      };
    }
    case AddNftActionTypeEnum.RESET_ESTIMATE: {
      return initialNftEstimateState;
    }
    case AddNftActionTypeEnum.SET_DEFAULT_POSTION: {
      return {
        ...state,
        params: {
          ...state.params,
          position: '',
        },
      };
    }
    case AddNftActionTypeEnum.GET_PRICE_NFT_SUCCESS: {
      return {
        ...state,
        priceNFT: {
          ...state.priceNFT,
          ...action.payload,
        },
      };
    }
    case AddNftActionTypeEnum.ADD_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case AddNftActionTypeEnum.DELETE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat.name !== action.payload,
        ),
      };
    }
    default:
      return state;
  }
};
