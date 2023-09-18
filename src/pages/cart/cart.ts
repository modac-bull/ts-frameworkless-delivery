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
    } catch {}
  }

  // 로컬스토리지에서 받은 데이터
  async renderCartElement(): Promise<string> {
    const getCartItemData =
      JSON.parse(localStorage.getItem("cart") as string) || [];

    const cartItemData = await Promise.all(
      getCartItemData.map((cart: selectedFoodInfo) =>
        getFoodDetailByIdx(Number(cart.foodIdx))
      )
    );
    const cartItemElement = cartItemData
      .map((cart, idx) => cartItem(cart, getCartItemData[idx].optionIdx))
      .join("");
    return cartItemElement;
  }
}
