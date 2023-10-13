import foodItemStyles from "./foodItem.scss";
import { FoodListlItem } from "@/apis/food/types";

/* 가게 목록 아이템 컴포넌트 */

export default function foodItem(data: FoodListlItem) {
  const { id, title, thumbImg, desc, price } = data;
  let template = `<div data-navigate=/food/${id} class=${
    foodItemStyles["food-item-wrapper"]
  }>
    <div class=${foodItemStyles["txt-wrap"]}>
      <p class=${foodItemStyles["title-food"]}>${title}</p>
      <p class=${foodItemStyles["desc-food"]}>${desc}</p>
      <p class=${foodItemStyles["price-food"]}>${price.toLocaleString()}원</p>
    </div>
    <div class=${foodItemStyles["img-wrap"]}>
      <img src=${thumbImg}/>
    </div>
  </div>
  `;

  return template;
}
