import styles from "./cart.scss";

import headerTemplate from "@/components/header/header";
import cartItemTemplate from "@/components/cart/cartItem";

import { getFoodDetailByIdx } from "@/apis/food/food";
import { FoodDetailItem, selectedFoodInfo } from "@/apis/food/types";
import Page from "@/core/Page";
import LocalStorageUtil from "@/core/LocalStorageUtil";
import { localStorageKey } from "@/core/constant";

import Handlebars from "handlebars";

Handlebars.registerPartial("header", headerTemplate);
Handlebars.registerPartial("cartItem", cartItemTemplate);

const template = `
{{!헤더}}
{{> header hasBackButton=header/hasBackButton title=header/title }}
{{! /.헤더}}

<div class='area'>
  <div class="${styles["cart-tiems-container"]} cart-container">
    {{! 장바구니 음식 목록}}
    {{#each cartItemLists}}
      {{> cartItem
        id=id
        thumbImg=thumbImg
        title=title
        price=price
        desc=desc
        options=options
      }}
    {{/each}}
    {{! /.장바구니 음식 목록}}
  </div>
</div>
`;

export default class CartPage extends Page {
  cartItemData: selectedFoodInfo[];
  private localStorage_key: string;

  constructor(containerId: string) {
    super(containerId, template);
    this.cartItemData = [];
    this.localStorage_key = localStorageKey.CART_KEY;
  }

  // 로컬스토리지에서 받은 데이터 => 음식 상세 데이터 api 요청
  async getCartFoodData(): Promise<FoodDetailItem[]> {
    const getCartItemData = LocalStorageUtil.get<selectedFoodInfo[]>(
      this.localStorage_key,
      []
    );
    const cartItemData = await Promise.all(
      getCartItemData.map((cart: selectedFoodInfo) =>
        getFoodDetailByIdx(Number(cart.foodId))
      )
    );
    return cartItemData;
  }

  defineEventMap() {
    return {
      "click #btn-remove-cart": this.buttonClickHandler,
    };
  }

  async buttonClickHandler(event: Event) {
    const target = event.target as HTMLElement;
    const selectedFoodId = target.getAttribute("data-id");

    if (target.closest("#btn-remove-cart")) {
      alert("장바구니에서 제거했습니다.");
      this.removeFromCart(selectedFoodId);
      await this.render();
    }
  }

  removeFromCart(menuId: string | null) {
    if (!menuId) return;
    let cart = LocalStorageUtil.get<selectedFoodInfo[]>(this.localStorage_key);

    // 아이템 제거
    cart = cart.filter((item) => item.foodId !== menuId);

    // 변경된 장바구니 데이터를 다시 로컬 스토리지에 저장
    LocalStorageUtil.set(this.localStorage_key, cart);
  }

  async updateData(): Promise<void> {
    const cartItemData = await this.getCartFoodData();
    console.log("catItemData", cartItemData);

    const context = {
      header: {
        hasBackButton: true,
        title: "장바구니 페이지",
      },
      cartItemLists: cartItemData,
    };

    this.context = context;
  }
}
