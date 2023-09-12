import header from "@/components/header/header";
import styles from "./cart.scss";

export default function cartFoodPage(target: Element) {
  let template = `
  {{__header__}}
  <div class='area'>

    <div class=${styles["main"]}>
    <p class=${styles["main-title"]}>장바구니 페이지</p>
    </div>
    
  </div>
  `;

  const headerElement = header({ title: "장바구니 페이지", hasBack: true });
  template = template.replace("{{__header__}}", headerElement);

  target.innerHTML = template;
}
