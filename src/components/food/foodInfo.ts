import { FoodDetailItem } from "@/apis/food/types";
import foodInfoStyle from "./foodInfo.scss";

/* 가게 상세 상단 정보 */
export default function foodInfo(data: FoodDetailItem) {
  const { thumbImg, title, desc, price } = data;

  // 찜,좋아요 조건 임시
  let template = `<div class=${foodInfoStyle["food-info-container"]}>
    <div class=${foodInfoStyle["img-wrap"]}>
      <img src=${thumbImg} />
    </div>
    <div class=${foodInfoStyle["info-wrap"]}>
      <h2 class=${foodInfoStyle["title-food"]}>${title}</h2>
      <p class=${foodInfoStyle["desc-food"]}>${desc}</p>
      <div class=${foodInfoStyle["price-wrap"]}>
        <p class=${foodInfoStyle["title-feature"]}>가격</p>
        <p class=${foodInfoStyle["text-price"]}>${price.toLocaleString()}원</p>
      </div>
    </div>
    <div class='divider-st1'></div>
  </div>
  `;

  return template;
}
