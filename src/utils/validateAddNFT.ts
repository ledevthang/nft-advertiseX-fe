import { NftEstimateStateReducer, EditNFTReducer } from 'types/addNft';
import { isNumber, isNil } from 'lodash';
import BigNumber from 'bignumber.js';
import { marketsSupportSoon } from 'common/constant';

const ONE_DAY_IN_HOURS = 24;
const ONE_MONTH_IN_DAYS = 31;
const ONE_MONTH_IN_HOURS = ONE_MONTH_IN_DAYS * ONE_DAY_IN_HOURS;

export const isStringNumber = (value?: string): boolean => {
  if (isNil(value)) return false;
  const regex = /^\d*[.,]?\d*$/;
  return regex.test(value.toString());
};

export const isStringIntegerNumber = (value?: string): boolean => {
  if (isNil(value)) return false;
  const regex = /^\d*$/;
  return regex.test(value.toString());
};

export const validateEstimateTime = (
  params: NftEstimateStateReducer['params'],
): boolean => {
  const { months, days, hours } = params;
  if (
    !isStringNumber(months) ||
    !isStringNumber(days) ||
    !isStringNumber(hours)
  ) {
    return false;
  } else {
    const time = caculateTotalDays(Number(months), Number(days), Number(hours));
    return time > 0 ? true : false;
  }
};

export const caculateTotalDays = (
  months: number,
  days: number,
  hours: number,
): number => {
  return months * 31 + days + hours * (1 / 24);
};

export const convertNumberToOrdinal = (i: number): string => {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const getEnableConnectWallet = (
  nftEstimate: NftEstimateStateReducer | EditNFTReducer,
  isEdit?: boolean,
): boolean => {
  const { percentile, blockNumber, positionWithinBlock, avgTime } =
    nftEstimate.estimateInfo;
  const { position, squarePrice, months, days, hours, nftValue } =
    nftEstimate.params;
  let isvalidTime = false;
  if (!isNil(months) && !isNil(days) && !isNil(hours)) {
    const time = caculateTotalDays(Number(months), Number(days), Number(hours));
    isvalidTime = time > 0;
  }

  const isValidNFTValue =
    !isNil(nftValue) && (isEdit ? true : Number(nftValue) > 0);

  const isValidSquarePrice = isNumber(squarePrice) && squarePrice > 0;

  if (
    !isNil(percentile) &&
    !isNil(blockNumber) &&
    !isNil(positionWithinBlock) &&
    !isNil(avgTime) &&
    isNumber(Number(position)) &&
    isValidSquarePrice &&
    isvalidTime &&
    isValidNFTValue
  )
    return true;
  return false;
};

export const daysToParamEstimate = (
  monthsNumber: number,
  daysNumber: number,
) => {
  const monthByDay = new BigNumber(monthsNumber).times(ONE_MONTH_IN_DAYS);
  const convertedDays = new BigNumber(daysNumber);
  const totalTimeByDay = monthByDay.plus(convertedDays);
  const months = Math.floor(totalTimeByDay.div(ONE_MONTH_IN_DAYS) as any);
  const days = totalTimeByDay.minus(months * ONE_MONTH_IN_DAYS);

  return {
    convertedMonths: months.toString(),
    convertedDays: days.toFixed(),
  };
};

export const hoursToParamEstimate = (
  monthsNumber: number,
  daysNumber: number,
  hourNumber: number,
) => {
  const monthByHour = new BigNumber(monthsNumber).times(ONE_MONTH_IN_HOURS);
  const daysByHour = new BigNumber(daysNumber).times(ONE_DAY_IN_HOURS);
  const convertedHour = new BigNumber(hourNumber);
  const totalTimeByHour = monthByHour.plus(daysByHour).plus(convertedHour);

  const months = Math.floor(totalTimeByHour.div(ONE_MONTH_IN_HOURS) as any);
  const days = Math.floor(
    totalTimeByHour
      .minus(months * ONE_MONTH_IN_HOURS)
      .div(ONE_DAY_IN_HOURS) as any,
  );
  const hours = totalTimeByHour
    .minus(months * ONE_MONTH_IN_HOURS)
    .minus(days * ONE_DAY_IN_HOURS);

  return {
    convertedMonths: months.toString(),
    convertedDays: days.toString(),
    convertedHours: hours.toFixed(),
  };
};

export const validateLinkNFT = (linkNft: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((opensea.io)|(solanart.io)|(magiceden.io)|(looksrare.org))' + // domain name
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(linkNft);
};

export const isMarketSupportSoon = (linkNft: string) => {
  try {
    const url = new URL(linkNft);
    const host = url.host;
    return marketsSupportSoon.includes(host);
  } catch (error) {
    return false;
  }
};

export const findPrecision = (number: number): number | null => {
  const matches = `${number.toString()}#`.match(/\d+(?=#)/) || [];
  if (!matches.length) {
    return null;
  }
  return Number(matches[0]);
};
