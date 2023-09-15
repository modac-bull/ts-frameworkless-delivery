import { DUMMY_FOOD_LIST } from "./data";
import { FoodListlItem } from "./types";

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
