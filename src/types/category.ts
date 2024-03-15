export interface CategoryWithinParsedLink {
  imgUrl: string;
  name: string;
  totalItem: number;
  position?: number;
}

export interface ICategory extends CategoryWithinParsedLink {
  description: string;
  owner: string;
  isBlackImg: boolean;
}
