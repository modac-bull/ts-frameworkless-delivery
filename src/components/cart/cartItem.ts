import cartItemStyle from "./cartItem.scss";
import { FoodDetailItem } from "@/apis/food/types";

/* 가게 목록 아이템 컴포넌트 */
export default function cartItem(data: FoodDetailItem, optionIdx: string[]) {
  const { id, title, desc, options, price, thumbImg } = data;

  const selectedOption =
    options &&
    optionIdx?.map((option) =>
      options.find((elem) => elem.id === Number(option))
    );

  const selectedOptionElement =
    selectedOption?.map((option) => `<span>${option?.title}</span>`).join("") ??
    "-";

  let template = `<div class=${cartItemStyle["cart-item-wrapper"]}>
    <div class=${cartItemStyle["img-wrapper"]}>
      <img src=${thumbImg}/>
    </div>
    <div class=${cartItemStyle["info-wrapper"]}>

      <button class='${cartItemStyle["btn-close"]}' id='btn-remove-cart'>
        <i class="fa fa-times fa-lg" data-id=${id}></i>
      </button>
      <h3 class=${cartItemStyle["title-food"]}>${title}</h3>
      <ul class=${cartItemStyle["desc-wrap"]}>
        <li class=${cartItemStyle["text-price"]}>가격 : ${
    price?.toLocaleString() ?? 0
  }원</li>
        <li class=${cartItemStyle["text-desc"]}>${desc}</li>
        <li class=${
          cartItemStyle["text-options"]
        }>선택된 옵션 : ${selectedOptionElement}</li>
      </ul>
    </div>
  </div>
  `;

  return template;
}
