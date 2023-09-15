import { FoodDetailItem } from "@/apis/food/types";
import styles from "./foodInfo.scss";

/* 가게 상세 상단 정보 */
export default function foodInfo(data: FoodDetailItem) {
  const { thumbImg, title, desc, price } = data;

  // 찜,좋아요 조건 임시
  let template = `<div class=${styles["food-info-container"]}>
    <div class=${styles["img-wrap"]}>
      <img src=${thumbImg} />
    </div>
    <div class=${styles["info-wrap"]}>
      <h2 class=${styles["title-food"]}>${title}</h2>
      <p class=${styles["desc-food"]}>${desc}</p>
      <div class=${styles["price-wrap"]}>
        <p class=${styles["title-feature"]}>가격</p>
        <p class=${styles["text-price"]}>${price.toLocaleString()}원</p>
      </div>
    </div>
    <div class='divider-st1'></div>
  </div>
  `;

  return template;
}
