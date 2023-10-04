import { getFoodDetailByIdx } from "@/apis/food/food";
import { selectedFoodInfo } from "@/apis/food/types";
import cartItem from "@/components/cart/cartItem";
// import cartItem from "@/components/cart/cartItem";
import header from "@/components/header/header";
import styles from "./cart.scss";
import Page from "@/core/Page";

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

  constructor(containerId: string) {
    super(containerId, template);
    this.cartItemData = [];
  }

  async render(): Promise<void> {
    try {
      const headerElement = header({ title: "장바구니 페이지", hasBack: true });
      this.setTemplateData("header", headerElement);

      this.setTemplateData("cart_item", await this.renderCartElement());

      this.updatePage();
      this.bindEvents();
    } catch {}
  }

  // 로컬스토리지에서 받은 데이터
  async renderCartElement(): Promise<string> {
    const getCartItemData =
      JSON.parse(localStorage.getItem("cart") as string) || [];

    const cartItemData = await Promise.all(
      getCartItemData.map((cart: selectedFoodInfo) =>
        getFoodDetailByIdx(Number(cart.foodId))
      )
    );
    const cartItemElement = cartItemData
      .map((cart, idx) => cartItem(cart, getCartItemData[idx].optionIds))
      .join("");
    return cartItemElement;
  }

  eventMap() {
    return {
      "click #btn-remove-cart": this.buttonClickHandler,
    };
  }

  // 장바구니 추가 로직
  buttonClickHandler(event: Event) {
    const target = event.target as HTMLElement;
    const selectedFoodId = target.getAttribute("data-id");

    if (target.closest("#btn-remove-cart")) {
      alert("장바구니에서 제거했습니다..");
      removeFromCart(selectedFoodId);

      // 장바구니 제거
      function removeFromCart(menuId: string | null) {
        if (!menuId) return;
        let cart: selectedFoodInfo[] =
          JSON.parse(localStorage.getItem("cart") as string) || [];

        // 아이템 제거
        cart = cart.filter((item) => item.foodId !== menuId);

        // 변경된 장바구니 데이터를 다시 로컬 스토리지에 저장합니다.
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
    this.render();
  }
}
