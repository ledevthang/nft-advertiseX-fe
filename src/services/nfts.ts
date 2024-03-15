import { PaginationData } from 'enums/pagination';
import { apiRoutesEnum } from 'enums/routes';
import {
  CreateNFT,
  GetMyNFTRequest,
  GetNFTDetailRequest,
  NFT,
  NFTGetAllRequest,
  NFTPreviewRequest,
  NFTEstimateRequest,
  NFTEstimateResponse,
  NFTPriceResponseType,
} from 'types/nft';
import AXIOS from './axios';
import { debounceAsync } from 'utils/debounceAsync';
import { ADD_NFT_INPUT_DEBOUNCE_DURATION } from 'common/constant';

async function GetNFTs(params: NFTGetAllRequest): Promise<PaginationData<NFT>> {
  const params2 = new URLSearchParams();
  params.chains && params.chains.forEach((p) => params2.append('chains', p));
  params.collectionIds &&
    params.collectionIds.forEach((p) =>
      params2.append('collectionIds', `${p}`),
    );
  params.filterBy && params2.append('filterBy', params.filterBy);
  params.blockNumber && params2.append('blockNumber', `${params.blockNumber}`);
  params.isActive && params2.append('isActive', `${params.isActive}`);
  params.pageNumber && params2.append('pageNumber', `${params.pageNumber}`);
  params.pageSize && params2.append('pageSize', `${params.pageSize}`);
  params.categories && params2.append('categories', `${params.categories}`);
  params.blockCategory &&
    params2.append('blockCategory', `${params.blockCategory}`);

  return AXIOS.get(apiRoutesEnum.GET_NFTS, { params: params2 });
}

async function GetNFTPreview(params: NFTPreviewRequest): Promise<NFT> {
  return AXIOS.get(apiRoutesEnum.GET_NFT_PREVIEW, { params });
}

async function GetNFTDetail(params: GetNFTDetailRequest): Promise<NFT> {
  return AXIOS.get(`${apiRoutesEnum.GET_DETAIL_NFT}/${params.nftId}`);
}

async function GetMyNFTs(
  params: GetMyNFTRequest,
): Promise<PaginationData<NFT>> {
  return AXIOS.get(`${apiRoutesEnum.GET_MY_NFTS}`, { params });
}

async function DeleteMyNFT(id: string) {
  return AXIOS.delete(`${apiRoutesEnum.NFTS_DELETE}/${id}`);
}

async function AdminDeleteNFT(id: string) {
  return AXIOS.delete(`${apiRoutesEnum.NFTS_ADMIN}/${id}`);
}

async function AddNewNFT(
  body: CreateNFT,
): Promise<NFT & { totalClonedItem: number }> {
  const { data } = await AXIOS.post(`${apiRoutesEnum.GET_DETAIL_NFT}`, {
    ...body,
  });
  return data;
}

async function UpdateNFT(id: string, body: Partial<CreateNFT>): Promise<NFT> {
  const { data } = await AXIOS.patch(`${apiRoutesEnum.GET_DETAIL_NFT}/${id}`, {
    ...body,
  });
  return data;
}

async function GetNFTEstimate(
  params: NFTEstimateRequest,
): Promise<NFTEstimateResponse> {
  return AXIOS.get(apiRoutesEnum.GET_NFT_ESTIMATE, { params });
}

async function getNFTPriceBaseOnDollar(): Promise<NFTPriceResponseType> {
  return AXIOS.get(apiRoutesEnum.GET_NFT_PRICE);
}

const getNFTEstimateDebounce = debounceAsync(
  (param) => GetNFTEstimate(param),
  ADD_NFT_INPUT_DEBOUNCE_DURATION,
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetNFTs,
  GetNFTPreview,
  GetNFTDetail,
  GetMyNFTs,
  DeleteMyNFT,
  AddNewNFT,
  GetNFTEstimate,
  getNFTPriceBaseOnDollar,
  UpdateNFT,
  AdminDeleteNFT,
  getNFTEstimateDebounce,
};
