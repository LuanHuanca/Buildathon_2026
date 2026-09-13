export interface FeaturedCommunity {
  id: string;
  slug: string;
  name: string;
  department: string;
  category: string;
  problem: string;
  goalAmount: number;
  raisedAmount: number;
  images: string[];
  lat: number;
  lng: number;
}
