/* eslint-disable */
import { NftEstimateStateReducer, EditNFTReducer } from 'types/addNft';
import { networks, walletAddress } from 'services/contract';
import fromExponential from 'from-exponential';
import BigNumber from 'bignumber.js';

export const getWalletAddress = (chainId: Number | undefined) => {
  switch (chainId) {
    case 250:
      return process.env.REACT_APP_FTM_CONTRACT_ADDRESS;
    case 137:
      return process.env.REACT_APP_POLYGON_MUMBAI_CONTRACT_ADDRESS;
    case 56:
      return process.env.REACT_APP_BSC_CONTRACT_ADDRESS;
    case 43114:
      return process.env.REACT_APP_AVAX_CONTRACT_ADDRESS;
    case 1:
      return process.env.REACT_APP_ETH_CONTRACT_ADDRESS;
  }
};

export const getProvider = (library: any) => {
  return library.provider;
};

export const getNFTValueBaseOnEth = (
  nftEstimate: NftEstimateStateReducer | EditNFTReducer,
) => {
  const nftValue =
    Number(nftEstimate.params.nftValue) > 0
      ? Number(nftEstimate.params.nftValue)
      : 0;
  return fromExponential(nftValue);
};

export const convertTimeLeftToSecond = (
  nftEstimate: NftEstimateStateReducer | EditNFTReducer,
) => {
  const monthToSecond = new BigNumber(Number(nftEstimate.params.months)).times(
    31 * 24 * 60 * 60,
  );
  //  Number(nftEstimate.params.months) * 31 * 24 * 60 * 60;

  const dayToSecond = new BigNumber(Number(nftEstimate.params.days)).times(
    24 * 60 * 60,
  );
  // Number(nftEstimate.params.days) * 24 * 60 * 60;

  const hourToSecond = new BigNumber(Number(nftEstimate.params.hours)).times(
    60 * 60,
  );
  // Number(nftEstimate.params.hours) * 60 * 60;

  const total = monthToSecond.plus(dayToSecond).plus(hourToSecond);

  return Math.floor(total as any);
};

export const switchNetwork = async (
  nftEstimate: NftEstimateStateReducer | EditNFTReducer,
  library: any,
) => {
  const wallet = walletAddress.find(
    (i) => i.chainName == nftEstimate.params.nftUnit,
  );
  const targetChainId = wallet?.id || 0;
  await library.provider.request({
    method:
      targetChainId == 1
        ? 'wallet_switchEthereumChain'
        : 'wallet_addEthereumChain',
    params: [
      {
        ...(networks as any)[targetChainId],
      },
    ],
  });
};
