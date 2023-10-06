import { getFoodDetailByIdx } from "@/apis/food/food";
import { selectedFoodInfo } from "@/apis/food/types";
import cartItem from "@/components/cart/cartItem";
// import cartItem from "@/components/cart/cartItem";
import header from "@/components/header/header";
import styles from "./cart.scss";
import Page from "@/core/Page";
import LocalStorageUtil from "@/core/LocalStorageUtil";
import { localStorageKey } from "@/core/constant";

const template = `
{{__header__}}
<div class='area'>
  <div class="${styles["cart-tiems-container"]} cart-container">
    {{__cart_item__}}
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

  async renderCartElement(): Promise<string> {
    // 로컬스토리지에서 받은 데이터
    try {
      const getCartItemData = LocalStorageUtil.get<selectedFoodInfo[]>(
        this.localStorage_key,
        []
      );
      const cartItemData = await Promise.all(
        getCartItemData.map((cart: selectedFoodInfo) =>
          getFoodDetailByIdx(Number(cart.foodId))
        )
      );
      const cartItemElement = cartItemData
        .map((cart, idx) => cartItem(cart, getCartItemData[idx].optionIds))
        .join("");
      return cartItemElement;
    } catch (error) {
      console.log(error);
      return "<p>에러가 발생했습니다.</p>";
    }
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
      await this.updateUI();
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

  async updateUI(): Promise<void> {
    const headerElement = header({ title: "장바구니 페이지", hasBack: true });
    this.setTemplateData("header", headerElement);
    this.setTemplateData("cart_item", await this.renderCartElement());
    this.updatePage();
  }
}
