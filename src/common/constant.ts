export const INPUT_DEBOUNCE_DURATION = 300;
export const ETHEREUM_VALUE = 10 ** 18;
export const INTERVAL_VALUE = 5000;
export const DEAD_ZONE_BLOCK_NUMBER = 13;
export const TOTAL_NUMBER_NFT = 1001;
export const ADD_NFT_INPUT_DEBOUNCE_DURATION = 500;

export const CRYPTOCOMPARE_API_URL =
  'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';

export const CRYPTO_SOL_API_URL =
  'https://min-api.cryptocompare.com/data/price?fsym=SOL&tsyms=USD';

export const nftSizes = [1, 3, 3, 6, 8, 9, 10, 10, 10, 10, 20, 1];

export const CRYPTOCOMPARE_HOST =
  'https://min-api.cryptocompare.com/data/price';

export const SUCCESS_MSG = 'Email successfully updated.';
export const ERROR_MSG = 'Please enter a valid email address.';
export const SCROLL_THRESHOLD = 500;
export const SALT_VALUE = '4560ede97f76ee16cc61e81f4b406b04';
export const INFURA_API_KEY = 'd7e7833db7fb43ef94353b152aeab79e';
export const SUPPORT_CONTENT_TYPE = [
  'gif',
  'png',
  'jpeg',
  'jpg',
  'webm',
  'webp',
  'mp4',
  'svg',
];

export const marketsSupportSoon = [
  'cryptopunks.app',
  'nbatopshot.com',
  'rarible.com',
  'axieinfinity.com',
  'market.decentraland.org',
  'www.sandbox.game',
  'superrare.com',
  'www.artblocks.io',
  'nftrade.com',
  'pancakeswap.finance',
  'www.binance.com',
  'nft.coinbase.com',
  'digitaleyes.market',
  'www.fxhash.xyz',
  'bay.blocto.app',
  'foundation.app',
  'niftygateway.com',
  'www.airnfts.com',
  'treasureland.market',
  'moonbeans.io',
  'tofunft.com',
  'playdapp.com',
  'solsea.io',
  'crypto.com',
  'market.immutable.com',
  'element.market',
  'objkt.com',
  'gamma.io',
  'starly.io',
  'www.mobox.io',
  'app.aavegotchi.com',
  'wavesducks.com',
  'play.mcp3d.com',
  'marketplace.crabada.com',
];

export const CATEGORY_LIST: { [key: string]: string } = {
  nft: 'All items on NFT AdvertiseX.',
  eth: 'For Ethereum blockchain NFTs.',
  opensea: 'For NFTs listed on OpenSea.',
  verified: 'For verified NFT collections.',
  bluechip: 'For collections above 1000 ETH traded.',
  sound: 'For NFTs with sound.',
  sol: 'For Solana blockchain NFTs.',
  magiceden: 'For NFTs listed on Magic Eden.',
  degen: 'For collections below 1000 ETH traded.',
  lowcost: 'For NFTs under $69.',
  ape: 'For “ape”, “monkey”, “kong”, “gorilla”, or “chimp” named collections.',
  bayc: 'For all official Bored Ape Yacht Club.',
  looksrare: 'For NFTs listed on LooksRare.',
  azuki: 'For all official Azuki.',
  gif: 'For GIF NFTs.',
  pudgypenguins: 'For all official Pudgy Penguins.',
  veefriends: 'For all official VeeFriends.',
  coolcats: 'For all official Cool Cats.',
  mfers: 'For all official mfers.',
  deadfellaz: 'For all official DeadFellaz.',
  cryptodickbutts: 'For all official CryptoDickbutts.',
  nouns: 'For all official Nouns.',
  free: 'For free NFTs.',
  cryptopunks: 'For the official Cryptopunks.',
  ens: 'For Ethereum Name Service “.eth” domains.',
  land: 'For metaverse land NFTs.',
  punk: 'For “punk” named collections.',
  doodles: 'For all official Doodles.',
  beeple: 'For all official Beeple.',
  decentraland: 'For all official Decentraland.',
  clonex: 'For all official Clone X.',
  sandbox: 'For all official The Sandbox.',
  cyberkongz: 'For all official CyberKongz.',
  moonbirds: 'For all official Moonbirds.',
  meebits: 'For all official Meebits.',
  worldofwomen: 'For all official World of Women.',
  goblintown: 'For all official goblintown.wtf.',
  invisiblefriends: 'For all official Invisible Friends.',
  cryptoadz: 'For all official Cryptoadz.',
  guttergang: 'For all official Gutter Labs.',
  degods: 'For all official Degods.',
  pepe: 'For “pepe” named collections.',
  digidaigaku: 'For all official DigiDaigaku.',
};
export const MAX_NOT_DEAD_ZONE_POSITION = 1001;

export const MIN_PRICE_PER_DAY = 0.1;

export const DISCORD_LINK = 'https://discord.gg/5fSvTXqAuz';

export enum LocalStorageKey {
  'IsConnected' = 'isConnected',
  'secretRound1Contribution' = 'secretRound1Contribution',
}


export enum LocalStorageValue {
  'IsConnectedYes' = 'yes',
  'IsConnectedNo' = 'no',
}