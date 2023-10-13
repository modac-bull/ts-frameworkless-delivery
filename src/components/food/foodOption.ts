import { FoodOptionItem } from "@/apis/food/types";
import foodOptionsStyle from "./foodOption.scss";

/* 가게 상세 상단 정보 */
export default function foodOption(data: FoodOptionItem) {
  const { id, title, price } = data;

  // 찜,좋아요 조건 임시
  let template = `<div class=${foodOptionsStyle["food-option-container"]}>
    <div class=${foodOptionsStyle["form-label"]} id='price-option'>
      <input  name=${id} value=${price}  id=${id} type='checkbox' class=${
    foodOptionsStyle["checkbox-st1"]
  }/>
      <label for=${id}>${title}</label>
    </div>
    <p class=${foodOptionsStyle["text-price"]}>+${price.toLocaleString()}원</p>
  </div>
  `;
  return template;
}
