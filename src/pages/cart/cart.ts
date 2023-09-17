import { getFoodDetailByIdx } from "@/apis/food/food";
import { selectedFoodInfo } from "@/apis/food/types";
import cartItem from "@/components/cart/cartItem";
// import cartItem from "@/components/cart/cartItem";
import header from "@/components/header/header";
import styles from "./cart.scss";

let isEventListenerAdded = false;

export default async function cartFoodPage(target: Element) {
  let template = `
  {{__header__}}
  <div class='area'>
    <div class="${styles["cart-tiems-container"]} cart-container">
      {{__cart_item__}}
    </div>
  </div>
  `;

  // 로컬스토리지에서 받은 데이터
  const renderCartElement = async () => {
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
    return cartItemElement;
  };

  try {
    const headerElement = header({ title: "장바구니 페이지", hasBack: true });
    template = template.replace("{{__header__}}", headerElement);

    template = template.replace("{{__cart_item__}}", await renderCartElement());
  } catch {}

  if (!isEventListenerAdded) {
    window.addEventListener("click", async (event) => {
      const target = event.target as HTMLElement;
      if (target.matches(".remove-cart-button")) {
        alert("장바구니에서 제거했습니다..");
        console.log("id", target.getAttribute("data-id")!);
        removeFromCart(target.getAttribute("data-id")!);

        const cartContainer = document.querySelector(".cart-container"); 

        if (cartContainer) {
          cartContainer.innerHTML =  await renderCartElement()
        }

        // 장바구니 제거
        function removeFromCart(menuId: string) {
          let cart: selectedFoodInfo[] =
            JSON.parse(localStorage.getItem("cart") as string) || [];

          // 아이템 제거
          cart = cart.filter((item) => item.foodIdx !== menuId);

          // 변경된 장바구니 데이터를 다시 로컬 스토리지에 저장합니다.
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
      isEventListenerAdded = true;
    });
  }
  target.innerHTML = template;
}
