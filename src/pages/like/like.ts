import { selectedFoodInfo } from "@/apis/food/types";
// import likeItem from "@/components/like/likeItem";
import header from "@/components/header/header";
import styles from "./like.scss";
import Page from "@/core/Page";
import { getStoreDetailByIdx } from "@/apis/store/store";
import likeItem from "@/components/like/likeItem";
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

  constructor(containerId: string) {
    super(containerId, template);
    this.likeItemData = [];
  }

  async renderLikeElement() {
    console.log("호출");
    // 로컬스토리지에서 받은 데이터
    const getLikeStoreItemData =
      JSON.parse(localStorage.getItem("like") as string) || [];

    const likeStoreItemData = await Promise.all(
      getLikeStoreItemData.map((likeId : string) =>
        getStoreDetailByIdx(Number(likeId))
      )
    );

    // const cartItemData = await getLikeStoreList();
    const likeStoreItemElement = likeStoreItemData
      .map((cart, idx) => likeItem(cart, getLikeStoreItemData[idx].optionIds))
      .join("");
    console.log("render", likeStoreItemData);
    return likeStoreItemElement;
  }

  async updateUI(): Promise<void> {
    const headerElement = header({ title: "찜 페이지", hasBack: true });
    this.setTemplateData("header", headerElement);

    // 좋아요 리스트 렌더링
    this.renderLikeElement();

    this.updatePage();
  }

  async render(): Promise<void> {
    try {
      await this.updateUI();
      this.bindEvents();
    } catch (error) {
      console.error("Error in rendering:", error);
    }
  }
}
