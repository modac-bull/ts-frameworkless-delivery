import { selectedFoodInfo } from "@/apis/food/types";
// import likeItem from "@/components/like/likeItem";
import header from "@/components/header/header";
import styles from "./like.scss";
import Page from "@/core/Page";
import { getStoreDetailByIdx } from "@/apis/store/store";
import likeItem from "@/components/like/likeItem";
import LocalStorageUtil from "@/core/LocalStorageUtil";
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
  LIKE_KEY: string;

  constructor(containerId: string) {
    super(containerId, template);
    this.likeItemData = [];
    this.LIKE_KEY = "tfd-like";
  }

  async renderLikeElement() {
    console.log("호출");
    // 로컬스토리지에서 받은 데이터
    const getLikeStoreItemData = LocalStorageUtil.get<string[]>(
      this.LIKE_KEY,
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
    console.log("render", likeStoreItemData);
    return likeStoreItemElement;
  }

  async updateUI(): Promise<void> {
    const headerElement = header({ title: "찜 페이지", hasBack: true });
    this.setTemplateData("header", headerElement);
    // 좋아요 리스트 렌더링
    this.setTemplateData("like_item", await this.renderLikeElement());
    this.updatePage();
  }
}
