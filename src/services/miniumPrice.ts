/* eslint-disable */
import AXIOS from './axios';
import {
  GetMiniumPricePerDayRequest,
  UpdateMinPricePerDayRequest,
  MiniumPricePerDayResponse,
} from 'types/miniumPricePerDay';
import { apiRoutesEnum } from 'enums/routes';
import { debounceAsync } from 'utils/debounceAsync';
import { ADD_NFT_INPUT_DEBOUNCE_DURATION } from 'common/constant';

async function GetMiniumPricePerDay(
  params: GetMiniumPricePerDayRequest,
): Promise<MiniumPricePerDayResponse> {
  // return AXIOS.get(apiRoutesEnum.GET_MINIUM_PRICE_PER_DAY, { params });
  return { id: 1, key: 'miniumPricePerDay', value: '0' };
}

async function UpdateMinPricePerDay(
  body: UpdateMinPricePerDayRequest,
): Promise<any> {
  return AXIOS.put(`${apiRoutesEnum.UPDATE_MINIUM_PRICE_PER_DAY}/${body.id}`, {
    value: body.newValue,
  });
}
const getMiniumPricePerDayDebounce = debounceAsync(
  (param) => GetMiniumPricePerDay(param),
  ADD_NFT_INPUT_DEBOUNCE_DURATION,
);

export default {
  GetMiniumPricePerDay,
  UpdateMinPricePerDay,
  getMiniumPricePerDayDebounce,
};
