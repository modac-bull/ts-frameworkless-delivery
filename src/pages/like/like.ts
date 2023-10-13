import styles from "./like.scss";
import { selectedFoodInfo } from "@/apis/food/types";
import headerTemplate from "@/components/header/header";
import likeItemTemplate from "@/components/like/likeItem";

import Page from "@/core/Page";
import { getStoreDetailByIdx } from "@/apis/store/store";
import LocalStorageUtil from "@/core/LocalStorageUtil";
import { localStorageKey } from "@/core/constant";

import Handlebars from "handlebars";

Handlebars.registerPartial("header", headerTemplate);
Handlebars.registerPartial("likeItem", likeItemTemplate);

const template = `
{{!헤더}}
{{> header hasBackButton=header/hasBackButton title=header/title }}
{{! /.헤더}}

<div class='area'>
  <div class="${styles["like-tiems-container"]} like-container">
    {{! 좋아요 목록}}
    {{#each likeItemlists }}
      {{>likeItem
        id=id
        thumImgUrls=thumImgUrls
        title=title
        description=description
        review_point=review_point
        review_cnt=review_cnt
        distance=distance
        delivery_price_range=delivery_price_range
        delivery_time=delivery_time
      }}
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
