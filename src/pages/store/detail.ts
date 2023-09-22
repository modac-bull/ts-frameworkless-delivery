import styles from "./detail.scss";

import header from "@/components/header/header";
import foodItem from "@/components/food/foodItem";
import { getFoodListDataByIdx } from "@/apis/food/food";
import Page from "@/core/Page";
import storeInfo from "@/components/store/storeInfo";
import { getStoreDetailByIdx } from "@/apis/store/store";
import { getLikeStoreList, postLikeStore } from "@/apis/like/like";

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
  storeId: string | null;
  isLike: boolean;
  constructor(containerId: string) {
    super(containerId, template);
    this.storeId = null;
    this.isLike = false;
  }

  async render(): Promise<void> {
    await this.checkLike(); // 초기 상태 확인

    const id = this.params?.["storeIdx"]! as string;

    try {
      const foodListData = await getFoodListDataByIdx(id);

      const headerElement = header({ title: "가게 상세", hasBack: true });
      this.setTemplateData("header", headerElement);

      const storeDetail = await getStoreDetailByIdx(Number(id));

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

  eventMap() {
    return {
      "click #btnLike": this.updateLike,
    };
  }

  // 장바구니 추가 로직
  async updateLike(): Promise<void> {
    const id = this.params?.["storeIdx"]! as string;
    this.isLike = !this.isLike; // 임시 상태 변경
    await this.render(); // 상태에 따라 렌더링

    try {
      const response = await postLikeStore(id);

      if (response) {
        // 상태 유지
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      // 실패 시 상태 롤백 및 알림
      this.isLike = !this.isLike;
      await this.render();
      alert("좋아요 실패");
    }
  }

  // 초기 좋아요 상태 확인
  async checkLike(): Promise<void> {
    const id = this.params?.["storeIdx"]! as string;
    try {
      const res = await getLikeStoreList();
      if (res.includes(id)) {
        console.log("res", id, res.includes(id));
        this.isLike = true; // 초기 좋아요 상태 설정
        // this.render(); // 좋아요 상태에 따라 렌더링
      }
    } catch (error) {
      console.error("초기 상태 로딩 실패", error);
    }
  }
}
