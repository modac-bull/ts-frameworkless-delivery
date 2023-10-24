import styles from "./detail.scss";
import headerTemplate from "@/components/header/header";
import storeInfoTemplate from "@/components/store/storeInfo";
import foodItemTemplate from "@/components/food/foodItem";

import storeStyles from "../../components/store/storeInfo.scss";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", headerTemplate);
Handlebars.registerPartial("storeInfo", storeInfoTemplate);
Handlebars.registerPartial("foodItem", foodItemTemplate);

import Page from "@/core/Page";

import { getStoreDetailByIdx } from "@/apis/store/store";
import {
  deleteLikeStore,
  getLikeStoreList,
  postLikeStore,
} from "@/apis/like/like";
import { getFoodListDataByIdx } from "@/apis/food/food";

const template = `
{{! 헤더 }}
{{> header hasBackButton=header/hasBackButton title=header/title }}
{{! /.헤더}}

  <div class='area'>
    {{! 가게 상세 }}
    {{>storeInfo 
      data=storeInfo/data
      isLike=storeInfo/isLike
    }}
    {{! /.가게 상세 }}
    
    <div class='divider-st1'></div>

    <div class="${styles["food-list-container"]}">
      <p class="${styles["title-menu"]}">추천 메뉴</p>

      {{! 음식 메뉴}}
      {{#each foodLists}}
        {{>foodItem 
          id=id
          title=title
          desc=desc
          {{! helper로 toLocalsString 역할하는 기능 추가}}
          price=price
          thumbImg=thumbImg
        }}
      {{/each}}
      {{! /.음식 메뉴}}

    </div>
  </div>
  `;
export default class StoreDetailPage extends Page {
  isLike: boolean;
  constructor(containerId: string) {
    super(containerId, template);
    this.isLike = false;
  }

  defineEventMap() {
    return {
      "click #btnLike": this.btnLikeHandler,
    };
  }

  // 장바구니 추가 로직
  async btnLikeHandler(): Promise<void> {
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
  async updateData(): Promise<void> {
    await this.checkLike(); // 초기 상태 확인
    const id = this.params?.["storeId"]! as string;
    const foodListData = await getFoodListDataByIdx(id);
    const storeDetail = await getStoreDetailByIdx(Number(id));

    const context = {
      header: {
        hasBackButton: true,
        title: "가게 상세",
      },
      storeInfo: {
        data: storeDetail,
        isLike: this.isLike,
      },
      foodLists: foodListData,
    };
    this.context = context;
  }
}
