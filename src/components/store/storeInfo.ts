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
      <div class=${styles["review-info"]}>
        <p> 최근리뷰 ${review_cnt.toLocaleString()}</p>
        <p> 최근사장님댓글 ${comments.toLocaleString()}</p>
      </div>
    </div>
    <div class=${styles["deliver-info"]}>
      <dl class=${styles['text-info']}>
        <dt>최소주문금액</dt>
        <dd>${minimum_price.toLocaleString()}원</dd>
      </dl>
      <dl class=${styles['text-info']}>
        <dt>결제 방법</dt>
        <dd>바로결제, 만나서결제, 예약가능</dd>
      </dl>
      <dl class=${styles['text-info']}>
        <dt>배달시간</dt>
        <dd>${delivery_time[0]}~${delivery_time[1]}분 소요 예상</dd>
      </dl>
    </div>
  
  </div>
  `;

  return template;
}
