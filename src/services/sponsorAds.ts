import { apiRoutesEnum } from 'enums/routes';
import AXIOS from './axios';
import { Sponsor } from 'types/sponsor';

async function GetRandomSponsorAds(): Promise<Sponsor> {
  return AXIOS.get(apiRoutesEnum.GET_SPONSORS_RANDOM);
}

async function GetAllSponsorAds(): Promise<Sponsor[]> {
  return AXIOS.get(apiRoutesEnum.SPONSORS);
}

async function UpdateCountClikedSponsorAds(id: number): Promise<any> {
  return AXIOS.post(`${apiRoutesEnum.SPONSORS}/${id}/click`);
}

async function CreateListSponsorAds(body: FormData): Promise<any> {
  return AXIOS.post(apiRoutesEnum.SPONSORS, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deleteSponsorAds(id: number): Promise<any> {
  return AXIOS.delete(`${apiRoutesEnum.SPONSORS}/${id}`);
}

async function updateSponsor(id: number, body: FormData) {
  return AXIOS.patch(`${apiRoutesEnum.SPONSORS}/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// delete sponsor ad

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetRandomSponsorAds,
  CreateListSponsorAds,
  GetAllSponsorAds,
  UpdateCountClikedSponsorAds,
  deleteSponsorAds,
  updateSponsor,
};
