import { CRYPTOCOMPARE_HOST } from 'common/constant';
import { CurrencyUnitEnum } from 'enums/addNft';
import AXIOS from './axios';

async function GetEtherPriceBaseOnDollars(
  cryptoApi: string,
): Promise<{ USD: string }> {
  return AXIOS.get(cryptoApi);
}

async function getNFTPriceBaseOnDollar(
  nftName: CurrencyUnitEnum,
): Promise<{ USD: number }> {
  return AXIOS.get(CRYPTOCOMPARE_HOST, {
    params: {
      fsym: nftName,
      tsyms: 'usd',
    },
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetEtherPriceBaseOnDollars,
  getNFTPriceBaseOnDollar,
};
