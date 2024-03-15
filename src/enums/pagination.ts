export interface PaginationData<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
  data: T[];
}

export interface PaginationRequest {
  pageNumber?: number;
  pageSize?: number;
}
