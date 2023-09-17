import styles from "./cartItem.scss";
import { FoodDetailItem } from "@/apis/food/types";

/* 가게 목록 아이템 컴포넌트 */

export default function cartItem(data: FoodDetailItem, optionIdx: string[]) {
  const { title, desc, options, price, thumbImg } = data;

  const selectedOption =
    options &&
    optionIdx?.map((option) =>
      options.find((elem) => elem.id === Number(option))
    );

  const selectedOptionElement =
    selectedOption?.map((option) => `<span>${option?.title}</span>`).join("") ??
    "-";

  let template = `<div class=${styles["cart-item-wrapper"]}>
    <div class=${styles["img-wrapper"]}>
      <img src=${thumbImg}/>
    </div>
    <div class=${styles["info-wrapper"]}>
      <h3 class=${styles["title-food"]}>${title}</h3>
      <ul class=${styles["desc-wrap"]}>
        <li class=${styles["text-price"]}>가격 : ${
          price?.toLocaleString() ?? 0
        }원</li>
        <li class=${styles["text-desc"]}>${desc}</li>
        <li class=${
          styles["text-options"]
        }>선택된 옵션 : ${selectedOptionElement}</li>
      </ul>
    </div>
  </div>
  `;
  return template;
}
