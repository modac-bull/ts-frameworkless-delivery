// 음식 목록 타입
export interface FoodListlItem {
  id: number;
  thumbImg: string;
  title: string;
  desc: string;
  price: number;
}

// 음식 상세 타입
export interface FoodDetailItem extends FoodListlItem {
  options?: FoodOptionItem[];
}

// 음식 옵션 타입
export interface FoodOptionItem {
  title: string;
  price: number;
}
