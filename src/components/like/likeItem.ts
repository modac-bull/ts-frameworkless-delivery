import { StoreItem } from "@/apis/store/types";
import styles from "./likeItem.scss";

/* 가게 목록 아이템 컴포넌트 */
export default function likeItem(data: StoreItem) {
  const {
    id,
    title,
    delivery_time,
    review_point,
    review_cnt,
    distance,
    delivery_price_range,
    thumImgUrls,
  } = data;

  let template = `<div data-navigate=/store/${id}  class=${styles["like-item-wrapper"]}>
  <div class=${styles["img-wrapper"]}>
  <div class=${styles["left"]}>
    <img src=${thumImgUrls[0]} />
  </div>
  <div class=${styles["right"]}>
    <img src=${thumImgUrls[1]} />
    <img src=${thumImgUrls[2]} />
  </div>
</div>
<div class=${styles["info-wrapper"]}>
  <div class=${styles["left"]}>
    <div class=${styles["title-wrapper"]}>
      <h2 class=${styles["title"]}>${title}</h2>
    </div>
    <div class=${styles["description"]}>
      <span class=${styles["reviews"]}>
        <i class="fa fa-star fa-lg"></i>
        ${review_point}(${review_cnt.toLocaleString()})
      </span>
      <span> ${distance}km</span>
      <span> ${delivery_price_range[0].toLocaleString()}원 ~ ${delivery_price_range[1].toLocaleString()}원</span>
    </div>
  </div>
  <div class=${styles["right"]}>
    <p> ${delivery_time[0]} ~ ${delivery_time[1]} 분</p>
  </div>
</div>
</div>
  </div>
  `;

  return template;
}
