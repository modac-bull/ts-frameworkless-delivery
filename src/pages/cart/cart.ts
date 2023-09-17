import { getFoodDetailByIdx } from "@/apis/food/food";
import { selectedFoodInfo } from "@/apis/food/types";
import cartItem from "@/components/cart/cartItem";
// import cartItem from "@/components/cart/cartItem";
import header from "@/components/header/header";
import styles from "./cart.scss";

export default async function cartFoodPage(target: Element) {
  let template = `
  {{__header__}}
  <div class='area'>
    <div class=${styles["cart-tiems-container"]}>
      {{__cart_item__}}
    </div>
  </div>
  `;
  try {
    const headerElement = header({ title: "장바구니 페이지", hasBack: true });
    template = template.replace("{{__header__}}", headerElement);

    // 로컬스토리지에서 받은 데이터
    const getCartItemData: selectedFoodInfo[] =
      JSON.parse(localStorage.getItem("cart") as string) || [];


    const cartItemData = await Promise.all(
      getCartItemData.map((cart: selectedFoodInfo) =>
        getFoodDetailByIdx(Number(cart.foodIdx))
      )
    );
    const cartItemElement = cartItemData
      .map((cart, idx) => cartItem(cart, getCartItemData[idx].optionIdx))
      .join("");
    template = template.replace("{{__cart_item__}}", cartItemElement);
  } catch {}

  target.innerHTML = template;
}
