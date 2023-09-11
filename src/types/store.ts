export interface StoreItem {
  title: string;
  type: 0 | 1 | 2;
  delivery_time: [number, number];
  review_point: number;
  review_cnt: number;
  distance: number;
  price_range: [number, number];
  thumImgUrls: [string, string, string];
}
