import styles from "./foodItem.scss";
import { FoodListlItem } from "@/apis/food/types";

/* 가게 목록 아이템 컴포넌트 */

export default function foodItem(data: FoodListlItem) {
  const { id, title, thumbImg, desc, price } = data;
  let template = `<div data-navigate=/food/${id} class=${
    styles["food-item-wrapper"]
  }>
    <div class=${styles["txt-wrap"]}>
      <p class=${styles["title-food"]}>${title}</p>
      <p class=${styles["desc-food"]}>${desc}</p>
      <p class=${styles["price-food"]}>${price.toLocaleString()}원</p>
    </div>
    <div class=${styles["img-wrap"]}>
      <img src=${thumbImg}/>
    </div>
  </div>
  `;

  return template;
}
