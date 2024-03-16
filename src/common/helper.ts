import { CurrencyUnitEnum } from './../enums/addNft';
import {
  AdminChartFilterByCurrency,
  AdminChartFilterByDate,
} from 'enums/filter';
import { MarketPlace, NFTPriceResponseType } from 'types/nft';
import { ETHEREUM_VALUE, nftSizes } from './constant';
import moment from 'moment';

export const convertWeiToEth = (wei: number) => {
  // return Math.round((wei / ETHEREUM_VALUE) * 100) / 100;
  return Number((wei / ETHEREUM_VALUE).toFixed(4));
};

export const roundValue = (value: number, round: number) => {
  return Math.round(value * 10 ** round) / 10 ** round;
};

export const convertTokenAddressAndIdFromPath = (
  pathname: string,
  prefix: string,
) => {
  const chunks = pathname.split('/').filter((chunk) => chunk !== '');
  const length = chunks.length;
  const chain = chunks[1];

  const isNoSupport = chain === 'matic' || chain === 'solana' ? true : false;
  const result = {
    tokenAddress: chunks[length - 2],
    tokenId: chunks[length - 1],
    isNoSupport,
  };

  return result;
};
export const convertLinkToNFTParams = (link: string) => {
  const url = new URL(link);
  const host = url.host;

  if (url.protocol !== 'https:') throw new Error();
  switch (host) {
    case 'opensea.io':
      const result = convertTokenAddressAndIdFromPath(
        url.pathname,
        '/assets/ethereum/',
      );
      const { isNoSupport } = result;
      if (isNoSupport) return null;
      return {
        marketplace: MarketPlace.OPENSEA,
        tokenId: result.tokenId,
        tokenAddress: result.tokenAddress,
        chain: 'ethereum',
      };
    case 'testnets.opensea.io/':
      const { tokenAddress, tokenId } = convertTokenAddressAndIdFromPath(
        url.pathname,
        '/assets/',
      );
      return {
        marketplace: MarketPlace.OPENSEA,
        tokenId,
        tokenAddress,
        chain: 'ethereum',
      };
    case 'looksrare.org':
      const { tokenAddress: tokenAddressLooksrare, tokenId: tokenIdLooksrare } =
        convertTokenAddressAndIdFromPath(url.pathname, '/collections/');
      return {
        marketplace: MarketPlace.LOOKSRARE,
        tokenId: tokenIdLooksrare,
        tokenAddress: tokenAddressLooksrare,
        chain: 'ethereum',
      };
    case 'solanart.io':
      const pathname = url.pathname;
      if (!pathname.startsWith('/nft/')) throw new Error();
      const address = pathname.replace('/nft/', '');
      return {
        marketplace: MarketPlace.SOLANART,
        tokenAddress: address,
        chain: 'solana',
      };
    case 'magiceden.io': {
      const { tokenId } = convertTokenAddressAndIdFromPath(url.pathname, '');
      return {
        marketplace: MarketPlace.MAGICEDEN,
        tokenAddress: tokenId,
        chain: 'solana',
      };
    }
    default:
      throw new Error();
  }
};

export const renderShortAddress = (
  address: string,
  prefix: number,
  suffix: number,
) => {
  const first = address.substring(0, prefix);
  const last = address.substring(address.length - suffix, address.length);
  return `${first}...${last}`;
};

export const hasMore = (pagination: {
  pageNumber: number;
  pageSize: number;
  total: number;
}) => {
  return pagination.pageNumber * pagination.pageSize < pagination.total;
};

export const getPosition = (block: number, positionWithinBlock: number) => {
  let tmp = 0;
  for (let i = 0; i < block - 1; i++) {
    tmp += nftSizes[i] ** 2;
  }
  return tmp + positionWithinBlock;
};

export const getPastDate = (type: AdminChartFilterByDate) => {
  switch (type) {
    case AdminChartFilterByDate.PAST_24_HRS:
      return 1;
    case AdminChartFilterByDate.PAST_7_DAYS:
      return 7;
    case AdminChartFilterByDate.PAST_30_DAYS:
      return 30;
    default:
      return 0;
  }
};

export const getCoinIdFromCurrencyFilter = (
  currency: AdminChartFilterByCurrency,
  converter: NFTPriceResponseType,
) => {
  let object: any = {};
  converter.forEach((c) => {
    object[AdminChartFilterByCurrency.ETH] = c.id;
  });
  return object[currency];
};

export const convertCoinToDollar = (value: number, rate: string) => {
  const dollar = Number(rate) * value;
  return dollar.toFixed(2);
};

export const isMobileFn = () => {
  return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
};

export const convertSecondsToWeeks = (senconds: number) => {
  if (!senconds) return 0;
  return moment.duration(senconds, 'seconds').asWeeks().toFixed(2);
};
