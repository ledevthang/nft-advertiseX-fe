export interface Sponsor {
  imageUrl: string;
  id: number;
  displayLink: string;
  description: string;
  trueLink: string;
  rate: number;
  displayCount: number;
  clickCount: number;
  mimeType: string;
  isAd: boolean;
  positions: number[];
}
export interface SponsorCreate {
  file: string;
  displayLink: string;
  rate: string;
  description: string;
  trueLink: string;
  positions: string;
}
