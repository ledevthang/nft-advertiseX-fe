export interface ReadListAuthorsParams {
  pageNum?: number;
  pageSize?: number;
}

export interface Authors {
  id: string;
  name: string;
  totalNFT: number;
  totalPrice: number;
}

export interface ReadListAuthorResponse {
  pageSize: number;
  pageNumber: number;
  total: number;
  data: Authors[];
}
