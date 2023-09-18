import { FoodOptionItem } from "@/apis/food/types";
import styles from "./foodOption.scss";

/* 가게 상세 상단 정보 */
export default function foodOption(data: FoodOptionItem) {
  const { id, title, price } = data;

  // 찜,좋아요 조건 임시
  let template = `<div class=${styles["food-option-container"]}>
    <div class=${styles["form-label"]} id='price-option'>
      <input  name=${id} value=${price}  id=${id} type='checkbox' class=${
    styles["checkbox-st1"]
  }/>
      <label for=${id}>${title}</label>
    </div>
    <p class=${styles["text-price"]}>+${price.toLocaleString()}원</p>
  </div>
  `;
  return template;
}
