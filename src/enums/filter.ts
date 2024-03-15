export enum EPriceFilter {
  RECENTLY_ADDED = 'Recently added',
  HIGHTEST_PRICE = 'Highest price',
  LOWEST_PRICE = 'Lowest price',
  LEAVING_SOON = 'Leaving soon',
  LAST_TO_LEAVE = 'Last to leave',
  OLDEST = 'Oldest',
}

export enum EChain {
  ETHEREUM = 'ethereum',
  SOLANA = 'solana',
  POLYGON = 'polygon',
}

export const mapLabelToValue = {
  'Leaving soon': 'Leaving Soon',
  'Recently added': 'Recently Added',
  Oldest: 'Oldest',
  'Lowest price': 'Price Low to High',
  'Highest price': 'Price High to Low',
  'Last to leave': 'Last to Leave',
};

export enum AdminChartFilterByDate {
  PAST_24_HRS = 'Past 24 Hours',
  PAST_7_DAYS = 'Past 7 Days',
  PAST_30_DAYS = 'Past 30 Days',
  PAST_YEAR = 'Past Year',
}

export enum AdminChartFilterByCurrency {
  ALL_CURRENCIES = 'All Currencies',
  ETH = 'ETH',
  BNB = 'BNB',
  FANTOM = 'Fantom',
  MATIC = 'Matic',
  AVAX = 'AVAX',
}
