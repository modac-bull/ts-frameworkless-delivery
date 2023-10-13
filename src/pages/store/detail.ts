import styles from "./detail.scss";
import headerStyle from "@/components/header/header.scss";
import storeInfoStyle from "@/components/store/storeInfo.scss";
import foodItemStyle from "@/components/food/foodItem.scss";

import storeStyles from "../../components/store/storeInfo.scss";
import Handlebars from "handlebars";

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
    {{! 가게 상세 }}
    <div class=${storeInfoStyle["store-info-container"]}>
      <div class=${storeInfoStyle["img-wrap"]}>
        <img src={{storeInfo/data/thumImgUrls.[0]}} />
        {{#if storeInfo/isLike}}
          <button type='button' id='btnLike' class='${storeInfoStyle["btn-like"]} ${storeInfoStyle["active"]} '>
            <i class="fa fa-heart fa-lg"></i>
          </button>
        {{else}}
          <button type='button' id='btnLike' class='${storeInfoStyle["btn-like"]}'>
            <i class="fa fa-heart fa-lg"></i>
          </button>
        {{/if}}
      </div>
      <div class=${storeInfoStyle["info-wrap"]}>
        <h2 class=${storeInfoStyle["title-store"]}>{{storeInfo/data/title}}</h2>
        <span class=${storeInfoStyle["grade"]}>
          <i class="fa fa-star fa-lg"></i>
          {{storeInfo/review_point}} ({{storeInfo/data/review_cnt}})
        </span>
        <div class=${storeInfoStyle["review-info"]}>
          <p> 최근리뷰 {{storeInfo/data/review_cnt}}</p>
          <p> 최근사장님댓글 {{storeInfo/data/comments}}</p>
        </div>
      </div>
      <div class=${storeInfoStyle["deliver-info"]}>
        <dl class=${storeInfoStyle["text-info"]}>
          <dt>최소주문금액</dt>
          <dd>{{storeInfo/data/minimum_price}}원</dd>
        </dl>
        <dl class=${storeInfoStyle["text-info"]}>
          <dt>결제 방법</dt>
          <dd>바로결제, 만나서결제, 예약가능</dd>
        </dl>
        <dl class=${storeInfoStyle["text-info"]}>
          <dt>배달시간</dt>
          <dd>{{storeInfo/data/delivery_time.[0]}}~{{storeInfo/data/delivery_time.[1]}}분 소요 예상</dd>
        </dl>
      </div>
    </div>
    {{! /.가게 상세 }}
    
    <div class='divider-st1'></div>

    <div class="${styles["food-list-container"]}">
      <p class="${styles["title-menu"]}">추천 메뉴</p>

      {{! 음식 메뉴}}
      {{#each foodLists}}
        <div data-navigate=/food/{{id}} class=${foodItemStyle["food-item-wrapper"]}>
          <div class=${foodItemStyle["txt-wrap"]}>
            <p class=${foodItemStyle["title-food"]}>{{title}}</p>
            <p class=${foodItemStyle["desc-food"]}>{{desc}}</p>
            <p class=${foodItemStyle["price-food"]}>{{price}}원</p>
          </div>
          <div class=${foodItemStyle["img-wrap"]}>
            <img src={{thumbImg}}/>
          </div>
        </div>
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
    this.compiledTemplate = Handlebars.compile(template)(context);
  }
}
