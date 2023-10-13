import styles from "./like.scss";
import { selectedFoodInfo } from "@/apis/food/types";
import headerStyle from "@/components/header/header.scss";
import likeItemStyle from "@/components/like/likeItem.scss";

import Page from "@/core/Page";
import { getStoreDetailByIdx } from "@/apis/store/store";
import LocalStorageUtil from "@/core/LocalStorageUtil";
import { localStorageKey } from "@/core/constant";

const template = `
{{!헤더}}
<header class=${headerStyle["header-container"]}>
  <div class=${headerStyle["header-inner"]}>
    <div class=${headerStyle["header-left"]}>
    {{#if header/hasBackButton}}
      <button class=${headerStyle["button-back"]} >
        <i id="back-button" class="fa fa-chevron-left fa-lg"></i>
      </button>
    {{/if}}

    </div>
    <h1>{{header/title}}</h1>
    <div class="${headerStyle["button-wrapper"]} ${headerStyle["header-right"]}">
      <button data-navigate="/" class=${headerStyle["button-home"]}>
        <i class="fa fa-home fa-lg"></i>
      </button>
      <button data-navigate="/like" class=${headerStyle["button-like"]}>
        <i class="fa fa-heart fa-lg"></i>
      </button>
      <button data-navigate="/cart" class=${headerStyle["button-cart"]} >
        <i class="fa fa-shopping-cart fa-lg"></i>
      </button>
    </div>
  </div>
</header>
{{! /.헤더}}

<div class='area'>
  <div class="${styles["like-tiems-container"]} like-container">
    {{! 좋아요 목록}}
    {{#each likeItemlists }}
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
      </div>
    {{/each}}
    {{! /.좋아요 목록}}
  </div>
</div>
`;

export default class LikePage extends Page {
  likeItemData: selectedFoodInfo[];
  localStorage_key: string;

  constructor(containerId: string) {
    super(containerId, template);
    this.likeItemData = [];
    this.localStorage_key = localStorageKey.LIKE_KEY;
  }

  // 로컬스토리지에서 받은 데이터 id => 가게 상세 데이터 반환
  async getLikeStoreData() {
    const getLikeStoreItemData = LocalStorageUtil.get<string[]>(
      this.localStorage_key,
      []
    );
    /* id와 일치하는 가게 상세 데이터 api요청 */
    const likeStoreItemData = await Promise.all(
      getLikeStoreItemData.map((likeId: string) =>
        getStoreDetailByIdx(Number(likeId))
      )
    );

    return likeStoreItemData;
  }

  async updateData(): Promise<void> {
    const likeStoreItemData = await this.getLikeStoreData();
    const context = {
      header: {
        hasBackButton: true,
        title: "찜 페이지",
      },
      likeItemlists: likeStoreItemData,
    };
    this.context = context;
  }
}
