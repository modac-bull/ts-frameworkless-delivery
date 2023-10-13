import likeItemStyle from "./likeItem.scss";

const likeItemTemplate = `
<div data-navigate=/store/{{id}}  class=${likeItemStyle["like-item-wrapper"]}>
  <div class=${likeItemStyle["img-wrapper"]}>
    <div class=${likeItemStyle["left"]}>
      <img src={{thumImgUrls.[0]}} />
    </div>
      <div class=${likeItemStyle["right"]}>
        <img src={{thumImgUrls.[1]}} />
        <img src={{thumImgUrls.[2]}} />
      </div>
    </div>
    <div class=${likeItemStyle["info-wrapper"]}>
      <div class=${likeItemStyle["left"]}>
        <div class=${likeItemStyle["title-wrapper"]}>
          <h2 class=${likeItemStyle["title"]}>{{title}}</h2>
        </div>
        <div class=${likeItemStyle["description"]}>
          <span class=${likeItemStyle["reviews"]}>
            <i class="fa fa-star fa-lg"></i>
            {{review_point}} ({{review_cnt}})
          </span>
          <span> {{distance}} km</span>
          <span> {{delivery_price_range.[0]}}원 ~ {{delivery_price_range.[1]}}원</span>
        </div>
      </div>
      <div class=${likeItemStyle["right"]}>
        <p> {{delivery_time.[0]}} ~ {{delivery_time.[1]}} 분</p>
      </div>
    </div>
  </div>
</div>`;

export default likeItemTemplate;
