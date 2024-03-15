import { PaginationData, PaginationRequest } from 'enums/pagination';
import { RecentSalesActionEnum } from 'enums/actions';
import { EChain } from 'enums/filter';
import { MarketPlace } from 'types/nft';

export interface GetRecentSalesRequest extends PaginationRequest {}

export interface RecentSales {
  nft_paymentDate: string;
  sales_id: string;
  sales_nftId: string;
  sales_amount: string;
  sales_createdAt: string;
  sales_updatedAt: string;
  nft_id: string;
  nft_nftName: string;
  nft_chain: EChain;
  nft_marketplace: MarketPlace;
  nft_tokenId: string;
  nft_tokenAddress: string;
  nft_originalUrl: string;
  nft_imageUrl: string;
  nft_price: string;
  nft_lastOffer: string;
  nft_status: 'Top Bid' | 'Best Offer' | 'Price' | 'Min Bid';
  nft_isActive: boolean;
  nft_isCloned: boolean;
  nft_lastSale: string;
  nft_amount: string;
  nft_blockNumber: number;
  nft_time: number;
  nft_lastPosition: number;
  nft_position: number;
  nft_positionWithinBlock: number;
  nft_squarePrice: number;
  nft_endDate: string;
  nft_viewCount: number;
  nft_userId: number;
  nft_metadata: string;
  collection_name: string;
  sales_saleTimeNft: string;
}

export interface GetRecentSales {
  type: RecentSalesActionEnum.GET_RECENT_SALES;
  payload: PaginationData<any>;
}

export type RecentSalesActiontype = GetRecentSales;
