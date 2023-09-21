import styles from "./detail.scss";

import header from "@/components/header/header";
import foodItem from "@/components/food/foodItem";
import { getFoodListDataByIdx } from "@/apis/food/food";
import Page from "@/core/Page";
import storeInfo from "@/components/store/storeInfo";
import { getStoreDetailByIdx } from "@/apis/store/store";

const template = `{{__header__}}
  <div class='area'>
    {{__store_info__}}

    <div class='divider-st1'></div>

    <div class="${styles["food-list-container"]}">
      <p class="${styles["title-menu"]}">추천 메뉴</p>
      {{__food_list__}}
    </div>
  </div>
  `;
export default class StoreDetailPage extends Page {
  isLike: boolean;
  constructor(containerId: string) {
    super(containerId, template);
    this.isLike = false;
  }

  async checkLike(): Promise<void> {}

  async render(): Promise<void> {
    const idx = this.params?.["storeIdx"]! as string;

    try {
      const foodListData = await getFoodListDataByIdx(idx);

      const headerElement = header({ title: "가게 상세", hasBack: true });
      this.setTemplateData("header", headerElement);

      const storeDetail = await getStoreDetailByIdx(Number(idx));

      const storeInfoElement = storeInfo(storeDetail, this.isLike);
      this.setTemplateData("store_info", storeInfoElement);

      const foodListElement = foodListData
        .map((food) => foodItem(food))
        .join("");
      this.setTemplateData("food_list", foodListElement);

      this.updatePage();
      this.bindEvents();
    } catch (error) {
      console.error("Error in rendering:", error);
      // 필요에 따라 오류 처리를 여기서 수행합니다.
      throw "데이터 없습니다.";
    }
  }

  updateLike() {
    /* 
    TODO
    좋아요 api 호출하여 판단
    */
    // this.isLike = false;
  }

  eventMap() {
    return {
      "click #btnLike": this.buttonClickHandler,
    };
  }

  // 장바구니 추가 로직
  buttonClickHandler() {
    console.log("클릭");
    this.isLike = !this.isLike;
    this.render();
  }
}
