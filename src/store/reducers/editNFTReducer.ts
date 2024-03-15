import { EditNFTReducer } from 'types/addNft';
import { CurrencyUnitEnum } from 'enums/addNft';
import { EditNFTActionTypeEnum } from 'enums/actions';
import { EditNFTActionTypes } from 'types/addNft';
import { isStringNumber, caculateTotalDays } from 'utils/validateAddNFT';
import { TOTAL_NUMBER_NFT } from 'common/constant';
import moment from 'moment';
import { isNil, round } from 'lodash';
import { parseTimeDuration } from 'utils/date';
import { findPrecision } from 'utils/validateAddNFT';
import { CategoriesName } from 'enums/categories';

export const initialEditNFTState: EditNFTReducer = {
  params: {
    nftUnit: CurrencyUnitEnum.ETH,
    nftValue: '0',
  },
  estimateInfo: {},
  priceNFT: {},
  categories: [],
};

export const editNFTReducer = (
  state = initialEditNFTState,
  action: EditNFTActionTypes,
): EditNFTReducer => {
  switch (action.type) {
    case EditNFTActionTypeEnum.GET_NFT_DETAIL_SUCCESS: {
      const { endDate, position, squarePrice, transactions, categories } =
        action.payload;
      const time = moment(endDate).diff(moment(), 'seconds');
      const [months, days, hours] = parseTimeDuration(time);

      const nftUnit = transactions[0].coin.symbol;
      const timesByDay = time / (24 * 3600);
      const totalValueByUSD = squarePrice * timesByDay;

      const reducedCategories = categories.map((cat) => ({
        name: cat.name,
        imgUrl: cat.imgUrl,
        totalItem: cat.totalItem,
        position: cat.position,
      }));

      return {
        ...state,
        nftDetail: {
          ...action.payload,
          months,
          days,
          hours,
          nftUnit,
          totalValueByUSD,
        },
        params: {
          ...state.params,
          position,
          squarePrice,
          months: months.toString(),
          days: days.toString(),
          hours: hours.toString(),
          nftUnit,
          category: CategoriesName.NFT,
        },
        categories: reducedCategories,
      };
    }
    case EditNFTActionTypeEnum.GET_CURRENT_ESTIMATE_INFO_SUCCESS: {
      const { avgTime, position, squarePrice, ...rest } = action.payload;
      const newState = {
        ...state,
        estimateInfo: {
          ...state.estimateInfo,
          ...rest,
        },
      };
      const times = caculateTotalDays(
        newState.nftDetail?.months!,
        newState.nftDetail?.days!,
        newState.nftDetail?.hours!,
      );
      newState.estimateInfo.avgTime = avgTime && ((times * 24) / avgTime) * 100;
      if (!isNil(position)) {
        newState.estimateInfo.percentile = (position / TOTAL_NUMBER_NFT) * 100;
      }
      return newState;
    }
    case EditNFTActionTypeEnum.GET_PRICE_NFT_FOR_EDIT_SUCCESS: {
      return {
        ...state,
        priceNFT: action.payload,
      };
    }
    case EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT: {
      const newState: EditNFTReducer = {
        ...state,
        params: {
          ...state.params,
          ...action.payload,
        },
      };

      const remainValueByUSD = newState.nftDetail?.totalValueByUSD || 0;
      const { months, days, hours, nftValue } = newState.params;
      const price = newState.nftDetail?.transactions[0].coin.rate;

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
        let squarePrice: number | undefined = undefined;
        if (totalDays > 0) {
          squarePrice =
            (Number(nftValue) * price + remainValueByUSD) / totalDays;
        }
        newState.params.squarePrice = squarePrice;
      } else {
        newState.params.squarePrice = undefined;
      }

      // update estimate position of NFT within specific category
      if (action.payload.category) {
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

      return newState;
    }
    case EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT_SUCCESS: {
      const { position, squarePrice, avgTime, postionOnCategories, ...rest } =
        action.payload;

      // update position in categories
      const categories = [...state.categories].map((cat) => {
        const matchingCat = postionOnCategories.find(
          (item) => item.name === cat.name,
        );
        return matchingCat
          ? {
              ...cat,
              position: matchingCat.position,
            }
          : cat;
      });

      const newState = {
        ...state,
        estimateInfo: {
          ...state.estimateInfo,
          ...rest,
        },
        categories,
      };

      const remainValueByUSD = newState.nftDetail?.totalValueByUSD || 0;
      const { months, days, hours, nftUnit } = newState.params;
      const totalDays = caculateTotalDays(
        Number(months!),
        Number(days!),
        Number(hours!),
      );
      // update avg time
      newState.estimateInfo.avgTime =
        avgTime && ((totalDays - avgTime) / avgTime) * 100;

      // estimate by price per day
      if (action.payload.hasOwnProperty('position')) {
        newState.params.position = position?.toString();
        if (!isNil(position)) {
          newState.estimateInfo.percentile =
            (position / TOTAL_NUMBER_NFT) * 100;
        }
      }

      // estimate by position
      if (action.payload.hasOwnProperty('squarePrice')) {
        const price = newState.priceNFT[nftUnit];
        newState.params.squarePrice = squarePrice;
        if (price && !isNil(squarePrice)) {
          const valueByUSD = squarePrice * totalDays;
          const addedValueByUSB = valueByUSD - remainValueByUSD;
          const valueByCoin = addedValueByUSB / price;
          newState.params.nftValue = round(valueByCoin, 7).toString();
          if (valueByCoin.toString().includes('e')) {
            const precision = findPrecision(valueByCoin);
            newState.params.nftValue = valueByCoin.toFixed(precision || 0);
          }
        }
        if (!isNil(newState.params.position)) {
          newState.estimateInfo.percentile =
            (Number(newState.params.position) / TOTAL_NUMBER_NFT) * 100;
        }
      }

      return newState;
    }
    case EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT_FAIL:
      return {
        ...state,
        estimateInfo: {},
      };
    case EditNFTActionTypeEnum.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat.name !== action.payload,
        ),
      };
    case EditNFTActionTypeEnum.RESET_ESTIMATE_FOR_EDIT:
      return initialEditNFTState;
    default:
      return state;
  }
};
