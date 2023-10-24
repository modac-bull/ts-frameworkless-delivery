import styles from "./detail.scss";
import headerTemplate from "@/components/header/header";
import foodInfoTemplate from "@/components/food/foodInfo";
import foodOptionTemplate from "@/components/food/foodOption";
import foodPriceTemplate from "@/components/food/foodPrice";

import { getFoodDetailByIdx } from "@/apis/food/food";
import Page from "@/core/Page";
import { selectedFoodInfo } from "@/apis/food/types";
import LocalStorageUtil from "@/core/LocalStorageUtil";
import { localStorageKey } from "@/core/constant";

import Handlebars from "handlebars";

Handlebars.registerPartial("header", headerTemplate);
Handlebars.registerPartial("foodInfo", foodInfoTemplate);
Handlebars.registerPartial("foodOption", foodOptionTemplate);
Handlebars.registerPartial("foodPrice", foodPriceTemplate);

const template = `
{{! 헤더 }}
{{> header hasBackButton=header/hasBackButton title=header/title }}
{{! /.헤더}}

  <div class='area'>
    {{!음식 정보}}
    {{>foodInfo 
      data=foodInfo/data
    }}
    {{!/.음식 정보}}

    
    <div class=${styles["option-container"]}>
      <p class=${styles["title-option"]}>추가선택</p>
      {{! 옵션 정보}}
      {{#each foodOptionLists}}
        {{>foodOption 
          id=id
          price=price
          title=title
        }}
      {{/each}}
      {{! /.옵션 정보}}
    </div>

    <div class='divider-st1'></div>

    {{! 하단 가격 }}
    {{>foodPrice
      foodPrice=foodPrice
    }}
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
    this.context = context;
  }
}
