export enum CategorySortOptions {
  TOTAL_ITEMS = 'Items',
  TOTAL_OWNERS = 'Owners',
  TOTAL_COLLECTIONS = 'Collections',
  FIRST_PLACE = 'FirstPlace',
  LAST_PLACE = 'LastPlace',
  ALL_TIME_VOLUME = 'VolumeAll',
  LAST_24_HOURS = 'Volume24h',
  FLOOR_PRICE = 'FloorPrice',
  TIME_LEFT = 'TimeLeft',
  ALPHABETICAL = 'Name',
}

export enum TopCategorySortOptions {
  LAST_24_HOURS = '24 Hrs',
  ALL_TIME = 'All Time',
  LAST_7_DAYS = '7 days',
  LAST_30_DAYS = '30 days',
}

export enum CategoriesFieldEnum {
  totalItem = 'totalItem',
  firstPlace = 'firstPlace',
  lastPlace = 'lastPlace',
  totalOwner = 'totalOwner',
  allTimeVolume = 'allTimeVolume',
  name = 'name',
  imgUrl = 'icon',
  _24hVolume = '_24hVolume',
  _7dVolume = '_7dVolume',
  _30dVolume = '_30dVolume',
}

export enum ParamsSortBy {
  LAST_24_HOURS = 'Volume24h',
  ALL_TIME = 'VolumeAll',
  LAST_7_DAYS = 'Vol7d',
  LAST_30_DAYS = 'Vol30d',
}

export enum CategoriesLabelEnum {
  FIRST_PLACE = 'First place',
  LAST_PLACE = 'Last place',
  OWNERS = 'Owners',
  LAST_24_HOURS = '24 Hrs',
  ALL_TIME = 'All Time',
  LAST_7_DAYS = '7 days',
  LAST_30_DAYS = '30 days',
}

export enum VolFieldEnum {
  LAST_24_HOURS = '_24hVolume',
  ALL_TIME = 'allTimeVolume',
  LAST_7_DAYS = '_7dVolume',
  LAST_30_DAYS = '_30dVolume',
}

export enum CategoriesName {
  NFT = 'NFT',
}

export enum TypeSearch {
  CATEGORIES = 'categories',
  COLLECTION = 'collection',
  TOP_CATEGORIES = 'top_categories',
}
