import { selectedFoodInfo } from "@/apis/food/types";
// import likeItem from "@/components/like/likeItem";
// import header from "@/components/header/header";
import styles from "./like.scss";
import Page from "@/core/Page";
import { getStoreDetailByIdx } from "@/apis/store/store";
import likeItem from "@/components/like/likeItem";
import LocalStorageUtil from "@/core/LocalStorageUtil";
import { localStorageKey } from "@/core/constant";
// import likeItem from "@/components/like/likeItem";

const template = `
{{__header__}}
<div class='area'>
  <div class="${styles["like-tiems-container"]} like-container">
    {{__like_item__}}
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

  async renderLikeElement() {
    // 로컬스토리지에서 받은 데이터
    const getLikeStoreItemData = LocalStorageUtil.get<string[]>(
      this.localStorage_key,
      []
    );

    const likeStoreItemData = await Promise.all(
      getLikeStoreItemData.map((likeId: string) =>
        getStoreDetailByIdx(Number(likeId))
      )
    );

    // const cartItemData = await getLikeStoreList();
    const likeStoreItemElement = likeStoreItemData
      .map((cart) => likeItem(cart))
      .join("");
    return likeStoreItemElement;
  }

  async updateData(): Promise<void> {
    const likeElement = await this.renderLikeElement();
    const state = [
      {
        key: "header",
        data: { title: "찜 페이지", hasBack: true },
      },
      {
        key: "like_item",
        data: likeElement,
      },
    ];
    this.componentMap.push(...state);
  }
}
