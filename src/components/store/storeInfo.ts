import { StoreInfo } from "@/apis/store/types";
import storeInfoStyle from "./storeInfo.scss";

/* 가게 상세 상단 정보 */
export default function storeInfo(data: StoreInfo, isLike: boolean) {
  const {
    title,
    delivery_time,
    review_point,
    review_cnt,
    thumImgUrls,
    minimum_price,
    comments,
  } = data;

  // 찜,좋아요 조건 임시
  const isLiked = isLike;

  let template = `<div class=${storeInfoStyle["store-info-container"]}>
    <div class=${storeInfoStyle["img-wrap"]}>
      <img src=${thumImgUrls[0]} />
      <button type='button' id='btnLike' class='${storeInfoStyle["btn-like"]} ${
    isLiked ? storeInfoStyle["active"] : ""
  }'>
        <i class="fa fa-heart fa-lg"></i>
      </button>
    </div>
    <div class=${storeInfoStyle["info-wrap"]}>
      <h2 class=${storeInfoStyle["title-store"]}>${title}</h2>
      <span class=${storeInfoStyle["grade"]}>
        <i class="fa fa-star fa-lg"></i>
        ${review_point} (${review_cnt.toLocaleString()})
      </span>
      <div class=${storeInfoStyle["review-info"]}>
        <p> 최근리뷰 ${review_cnt.toLocaleString()}</p>
        <p> 최근사장님댓글 ${comments.toLocaleString()}</p>
      </div>
    </div>
    <div class=${storeInfoStyle["deliver-info"]}>
      <dl class=${storeInfoStyle["text-info"]}>
        <dt>최소주문금액</dt>
        <dd>${minimum_price.toLocaleString()}원</dd>
      </dl>
      <dl class=${storeInfoStyle["text-info"]}>
        <dt>결제 방법</dt>
        <dd>바로결제, 만나서결제, 예약가능</dd>
      </dl>
      <dl class=${storeInfoStyle["text-info"]}>
        <dt>배달시간</dt>
        <dd>${delivery_time[0]}~${delivery_time[1]}분 소요 예상</dd>
      </dl>
    </div>
  </div>
  `;

  return template;
}
