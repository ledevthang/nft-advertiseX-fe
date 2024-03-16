import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const RPC_URLS = {
  11155111: 'https://eth-sepolia.public.blastapi.io'
};

export const supportedChainIds = [11155111];
export const injected = new InjectedConnector({
  supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    11155111: RPC_URLS[11155111],
  },
  supportedChainIds,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL
});

export const coinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/d7e7833db7fb43ef94353b152aeab79e`,
  appName: 'mintedgem-dev',
  supportedChainIds,
});

export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_live_163DC495CD5D7613',
  chainId: 1,
});
