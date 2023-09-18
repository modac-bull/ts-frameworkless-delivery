import { DUMMY_FOOD_DETAIL, DUMMY_FOOD_LIST } from "./data";
import { FoodDetailItem, FoodListlItem } from "./types";

/* 
음식 리스트 데이터 api
*/
export const getFoodListDataByIdx = (idx: number): Promise<FoodListlItem[]> => {
  return new Promise((res, rej) => {
    const success = true; // 임시
    setTimeout(() => {
      if (success) {
        res(DUMMY_FOOD_LIST[idx]);
      } else {
        rej(new Error());
      }
    }, 400);
  });
};

/* 
음식 상세 데이터 api
*/
export const getFoodDetailByIdx = (idx: number): Promise<FoodDetailItem> => {
  return new Promise((res, rej) => {
    const success = true; // 임시
    setTimeout(() => {
      if (success) {
        res(DUMMY_FOOD_DETAIL[idx]);
      } else {
        rej(new Error());
      }
    }, 400);
  });
};
