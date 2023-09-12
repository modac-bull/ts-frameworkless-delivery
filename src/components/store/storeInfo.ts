import { StoreInfo } from "@/apis/store/types";
import styles from "./storeInfo.scss";

/* 가게 상세 상단 정보 */
export default function storeInfo(data: StoreInfo) {
  const {
    id,
    title,
    delivery_time,
    review_point,
    review_cnt,
    distance,
    delivery_price_range,
    thumImgUrls,
    minimum_price,
    comments,
    like_cnt,
  } = data;
  console.log(
    id,
    title,
    delivery_time,
    review_point,
    review_cnt,
    distance,
    delivery_price_range,
    thumImgUrls,
    minimum_price,
    comments,
    like_cnt
  );

  let template = `<div class=${styles["store-info-container"]}>
    <div class=${styles["img-wrap"]}>
      <img src=${thumImgUrls[0]} />
    </div>
    <div class=${styles["info-wrap"]}>
      <h2 class=${styles["title-store"]}>${title}</h2>
      <span class=${styles["grade"]}>
        <i class="fa fa-star fa-lg"></i>
        ${review_point} (${review_cnt.toLocaleString()})
      </span>
      <div class=${styles['review-info']}>
        <p> 최근리뷰 ${review_cnt.toLocaleString()}</p>
        <p> 최근사장님댓글 ${comments.toLocaleString()}</p>
      </div>
    </div>
  
  </div>
  `;

  return template;
}
