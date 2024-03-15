import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
  56: 'https://bsc-dataseed1.binance.org',
  137: 'https://polygon-mainnet.g.alchemy.com/v2/VjtzrgjDdzYw2Dn2M3FPVrjtA0jSVN49',
  250: 'https://morning-morning-putty.fantom.discover.quiknode.pro/9bf35ce6be611753b351cf7f47b948c308e52b9e/',
  43114: 'https://api.avax.network/ext/bc/C/rpc',
};

export const supportedChainIds = [1, 56, 137, 250, 43114];
export const injected = new InjectedConnector({
  supportedChainIds,
});
