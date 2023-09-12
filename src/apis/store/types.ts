export interface StoreItem {
  id: number;
  title: string;
  type: 0 | 1 | 2;
  delivery_time: [number, number];
  review_point: number;
  review_cnt: number;
  distance: number;
  delivery_price_range: [number, number];
  thumImgUrls: [string, string, string];
}
