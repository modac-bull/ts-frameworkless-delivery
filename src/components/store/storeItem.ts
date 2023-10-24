import storeItemStyle from "./storeItem.scss";

/* 가게 목록 아이템 컴포넌트 */

const storeItemTemplate = `<div data-navigate=/store/{{id}} class=${storeItemStyle["store-item"]}>
<div class=${storeItemStyle["img-wrapper"]}>
  <div class=${storeItemStyle["left"]}>
    <img src={{thumImgUrls.[0]}} />
  </div>
  <div class=${storeItemStyle["right"]}>
    <img src={{thumImgUrls.[1]}} />
    <img src={{thumImgUrls.[2]}} />
  </div>
</div>
<div class=${storeItemStyle["info-wrapper"]}>
  <div class=${storeItemStyle["left"]}>
    <div class=${storeItemStyle["title-wrapper"]}>
      <h2 class=${storeItemStyle["title"]}>{{title}}</h2>
    </div>
    <div class=${storeItemStyle["description"]}>
      <span class=${storeItemStyle["reviews"]}>
        <i class="fa fa-star fa-lg"></i>
        {{review_point}}({{review_cnt}})
      </span>
      <span> {{distance}}km</span>
      <span> {{delivery_price_range.[0]}}원 ~ {{delivery_price_range.[1]}}원</span>
    </div>
  </div>
  <div class=${storeItemStyle["right"]}>
    <p> {{delivery_time.[0]}} ~ {{delivery_time.[1]}} 분</p>
  </div>
</div>
</div>`;

export default storeItemTemplate;
