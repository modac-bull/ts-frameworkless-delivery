import styles from "./detail.scss";
import headerStyle from "@/components/header/header.scss";
import foodInfoStyle from "@/components/food/foodInfo.scss";
import foodOptionsStyle from "@/components/food/foodOption.scss";
import foodPriceStyle from "@/components/food/foodPrice.scss";

import { getFoodDetailByIdx } from "@/apis/food/food";
import Page from "@/core/Page";
import { selectedFoodInfo } from "@/apis/food/types";
import LocalStorageUtil from "@/core/LocalStorageUtil";
import { localStorageKey } from "@/core/constant";
import Handlebars from "handlebars";

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
    {{!음식 정보}}
    <div class=${foodInfoStyle["food-info-container"]}>
      <div class=${foodInfoStyle["img-wrap"]}>
        <img src={{foodInfo/data/thumbImg}} />
      </div>
      <div class=${foodInfoStyle["info-wrap"]}>
        <h2 class=${foodInfoStyle["title-food"]}>{{foodInfo/data/title}}</h2>
        <p class=${foodInfoStyle["desc-food"]}>{{foodInfo/data/desc}}</p>
        <div class=${foodInfoStyle["price-wrap"]}>
          <p class=${foodInfoStyle["title-feature"]}>가격</p>
          <p class=${foodInfoStyle["text-price"]}>{{foodInfo/data/price}}</p>
        </div>
      </div>
      <div class='divider-st1'></div>
    </div>
    {{!/.음식 정보}}

    
    <div class=${styles["option-container"]}>
      <p class=${styles["title-option"]}>추가선택</p>
      {{! 옵션 정보}}
      {{#each foodOptionLists}}
      <div class=${foodOptionsStyle["food-option-container"]}>
        <div class=${foodOptionsStyle["form-label"]} id='price-option'>
          <input  name={{id}} value={{price}} id={{id}} type='checkbox' class=${foodOptionsStyle["checkbox-st1"]}/>
          <label for={{id}}>{{title}}</label>
        </div>
        <p class=${foodOptionsStyle["text-price"]}>+{{price}}원</p>
      </div>
      {{/each}}
      {{! /.옵션 정보}}
    </div>

    <div class='divider-st1'></div>

    {{! 하단 가격 }}
    <div class=${foodPriceStyle["bottom-sheet"]}>
      <button id='btn-add-cart' type='button' class=${foodPriceStyle["button-primary"]}><span id="total-price" >{{foodPrice}}</span>원 담기</button>
    </div>
    {{! /.하단 가격 }}
  </div>
  `;
export default class FoodDetailPage extends Page {
  private foodId: string | null;
  private optionId: string[];
  private totalPrice: number;
  private localStorage_key: string;

  constructor(containerId: string) {
    super(containerId, template);
    this.foodId = "";
    this.optionId = [];
    this.totalPrice = 0;
    this.localStorage_key = localStorageKey.CART_KEY;
  }

  defineEventMap() {
    return {
      "click #btn-add-cart": this.buttonClickHandler,
      "change #price-option": this.inputChangeHandler,
    };
  }

  // 장바구니 추가 로직
  buttonClickHandler() {
    // 로컬 스토리지에 추가
    const selectedInfo: selectedFoodInfo = {
      foodId: null,
      optionIds: [],
    };
    selectedInfo.foodId = this.foodId;
    selectedInfo.optionIds = this.optionId;

    let cartItems = LocalStorageUtil.get<selectedFoodInfo[]>(
      this.localStorage_key,
      []
    );
    cartItems.push(selectedInfo);
    LocalStorageUtil.set(this.localStorage_key, cartItems);
    alert("장바구니에 추가했습니다.");
  }

  // 옵션 정보 업데이트
  inputChangeHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    if (
      event.type === "change" &&
      target.closest("#price-option") &&
      target.type === "checkbox"
    ) {
      if (target.checked) {
        this.totalPrice += Number(target.value);
        this.optionId.push(target.id); // 옵션 ID 추가
      } else {
        this.totalPrice -= Number(target.value);
        const index = this.optionId.indexOf(target.id);
        if (index > -1) {
          this.optionId.splice(index, 1); // 옵션 ID 제거
        }
      }
      // 가격 정보 업데이트
      const totalPriceElement = document.getElementById("total-price");
      if (totalPriceElement) {
        totalPriceElement.textContent = String(this.totalPrice);
      }
    }
  }

  async updateData(): Promise<void> {
    const idx = this.params?.["foodId"]! as string;
    this.foodId = idx;
    this.optionId = [];

    const foodInfoData = await getFoodDetailByIdx(Number(idx));
    this.totalPrice = foodInfoData.price;

    const context = {
      header: {
        hasBackButton: true,
        title: "음식 상세",
      },
      foodInfo: {
        data: foodInfoData,
      },
      foodOptionLists: foodInfoData.options,
      foodPrice: this.totalPrice,
    };
    this.compiledTemplate = Handlebars.compile(template)(context);
  }
}
