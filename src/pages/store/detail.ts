import styles from "./detail.scss";
import storeStyles from "../../components/store/storeInfo.scss";

import header from "@/components/header/header";
import foodItem from "@/components/food/foodItem";
import { getFoodListDataByIdx } from "@/apis/food/food";
import Page from "@/core/Page";
import storeInfo from "@/components/store/storeInfo";
import { getStoreDetailByIdx } from "@/apis/store/store";
import {
  deleteLikeStore,
  getLikeStoreList,
  postLikeStore,
} from "@/apis/like/like";

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

  defineEventMap() {
    return {
      "click #btnLike": this.updateLike,
    };
  }

  // 장바구니 추가 로직
  async updateLike(): Promise<void> {
    let tempIsLike = !this.isLike;
    this.isLike = tempIsLike; // 임시 상태 변경
    await this.updateLikeUI(); // UI 업데이트
    const id = this.params?.["storeId"]! as string;

    try {
      let response;
      if (this.isLike) {
        response = await postLikeStore(id);
      } else {
        response = await deleteLikeStore(id);
      }

      if (response) {
        // 상태 유지
        await this.render();
      } else {
        this.isLike = !tempIsLike;
        throw new Error("API request failed");
      }
    } catch (error) {
      // 실패 시 상태 롤백 및 알림
      this.isLike = !this.isLike;
      await this.render();
      alert("좋아요 실패");
    }
  }

  // 좋아요 UI만 업데이트
  async updateLikeUI(): Promise<void> {
    const likeElement = document.querySelector("#btnLike");
    if (likeElement) {
      if (this.isLike) {
        likeElement.classList.add(storeStyles["active"]); // liked는 좋아요 상태를 나타내는 CSS 클래스
      } else {
        likeElement.classList.remove(storeStyles["active"]);
      }
    }
  }

  // 초기 좋아요 상태 확인
  async checkLike(): Promise<void> {
    const id = this.params?.["storeId"]! as string;
    try {
      const res = await getLikeStoreList();
      if (res.includes(id)) {
        this.isLike = true; // 초기 좋아요 상태 설정
      } else {
        this.isLike = false;
      }
    } catch (error) {
      console.error("초기 상태 로딩 실패", error);
    }
  }
  async updateUI(): Promise<void> {
    this.checkLike(); // 초기 상태 확인

    const id = this.params?.["storeId"]! as string;

    const foodListData = await getFoodListDataByIdx(id);
    const headerElement = header({ title: "가게 상세", hasBack: true });
    this.setTemplateData("header", headerElement);

    const storeDetail = await getStoreDetailByIdx(Number(id));
    const storeInfoElement = storeInfo(storeDetail, this.isLike);
    this.setTemplateData("store_info", storeInfoElement);

    const foodListElement = foodListData.map((food) => foodItem(food)).join("");
    this.setTemplateData("food_list", foodListElement);

    this.updatePage();
  }

  async render(): Promise<void> {
    try {
      await this.updateUI();
      this.bindEvents();
    } catch (error) {
      console.error("Error in rendering:", error);
      throw "데이터 없습니다.";
    }
  }
}
