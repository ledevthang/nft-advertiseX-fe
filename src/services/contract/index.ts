import { CurrencyUnitEnum } from 'enums/addNft';
export const walletAddress = [
  {
    id: 250,
    address: process.env.REACT_APP_FTM_CONTRACT_ADDRESS,
    name: 'opera',
    chainName: CurrencyUnitEnum.FTM,
  },
  {
    id: 137,
    address: process.env.REACT_APP_POLYGON_MUMBAI_CONTRACT_ADDRESS,
    name: 'polygonMainnet',
    chainName: CurrencyUnitEnum.MATIC,
  },
  {
    id: 56,
    address: process.env.REACT_APP_BSC_CONTRACT_ADDRESS,
    name: 'bsc',
    chainName: CurrencyUnitEnum.BNB,
  },
  {
    id: 1,
    address: process.env.REACT_APP_ETH_CONTRACT_ADDRESS,
    name: 'mainnet',
    chainName: CurrencyUnitEnum.ETH,
  },
  {
    id: 43114,
    address: process.env.REACT_APP_AVAX_CONTRACT_ADDRESS,
    name: 'avalanche',
    chainName: CurrencyUnitEnum.AVAX,
  },
];


export const networks = {
  1: {
    chainName: 'Mainnet',
    rpcUrls: ['https://mainnet.infura.io/v3/84842078b09946638c03157f83405213'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: `0x${Number(1).toString(16)}`,
  },
  56: {
    rpcUrls: [
      'https://bsc-dataseed1.binance.org',
    ],
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
    chainId: `0x${Number(56).toString(16)}`,
    blockExplorerUrls: ['https://bscscan.com'],
    chainName: 'Binance Smart Chain',
  },

  137: {
    rpcUrls: [
      'https://polygon-mainnet.g.alchemy.com/v2/VjtzrgjDdzYw2Dn2M3FPVrjtA0jSVN49',
    ],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    chainId: `0x${Number(137).toString(16)}`,
    chainName: 'Polygon',
  },
  250: {
    chainName: 'Fantom',
    rpcUrls: ['https://morning-morning-putty.fantom.discover.quiknode.pro/9bf35ce6be611753b351cf7f47b948c308e52b9e/'],
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    chainId: `0x${Number(250).toString(16)}`,
  },
  43114: {
    chainName: 'AVAX',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    chainId: `0x${Number(43114).toString(16)}`,
  },
};

export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PaymentCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
    ],
    name: 'TransferBack',
    type: 'event',
  },
  {
    inputs: [],
    name: 'approver',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_approver',
        type: 'address',
      },
    ],
    name: 'setApprover',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
    ],
    name: 'getItemPayment',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
        ],
        internalType: 'struct MintedGemPayment.ItemPayment',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
    ],
    name: 'createPayment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
