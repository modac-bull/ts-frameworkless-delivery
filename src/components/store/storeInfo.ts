import storeInfoStyle from "./storeInfo.scss";

/* 가게 상세 상단 정보 */
const storeInfoTemplate = `<div class=${storeInfoStyle["store-info-container"]}>
<div class=${storeInfoStyle["img-wrap"]}>
  <img src={{data/thumImgUrls.[0]}} />
  {{#if isLike}}
    <button type='button' id='btnLike' class='${storeInfoStyle["btn-like"]} ${storeInfoStyle["active"]} '>
      <i class="fa fa-heart fa-lg"></i>
    </button>
  {{else}}
    <button type='button' id='btnLike' class='${storeInfoStyle["btn-like"]}'>
      <i class="fa fa-heart fa-lg"></i>
    </button>
  {{/if}}
</div>
<div class=${storeInfoStyle["info-wrap"]}>
  <h2 class=${storeInfoStyle["title-store"]}>{{data/title}}</h2>
  <span class=${storeInfoStyle["grade"]}>
    <i class="fa fa-star fa-lg"></i>
    {{storeInfo/review_point}} ({{data/review_cnt}})
  </span>
  <div class=${storeInfoStyle["review-info"]}>
    <p> 최근리뷰 {{data/review_cnt}}</p>
    <p> 최근사장님댓글 {{data/comments}}</p>
  </div>
</div>
<div class=${storeInfoStyle["deliver-info"]}>
  <dl class=${storeInfoStyle["text-info"]}>
    <dt>최소주문금액</dt>
    <dd>{{data/minimum_price}}원</dd>
  </dl>
  <dl class=${storeInfoStyle["text-info"]}>
    <dt>결제 방법</dt>
    <dd>바로결제, 만나서결제, 예약가능</dd>
  </dl>
  <dl class=${storeInfoStyle["text-info"]}>
    <dt>배달시간</dt>
    <dd>{{data/delivery_time.[0]}}~{{data/delivery_time.[1]}}분 소요 예상</dd>
  </dl>
</div>
</div>
`;

export default storeInfoTemplate;
