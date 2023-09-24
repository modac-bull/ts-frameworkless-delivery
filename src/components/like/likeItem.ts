import styles from "./likeItem.scss";
import { FoodDetailItem } from "@/apis/food/types";

/* 가게 목록 아이템 컴포넌트 */
export default function likeItem(data: FoodDetailItem, optionIdx: string[]) {
  const { id, title, desc, options, price, thumbImg } = data;

  const selectedOption =
    options &&
    optionIdx?.map((option) =>
      options.find((elem) => elem.id === Number(option))
    );

  const selectedOptionElement =
    selectedOption?.map((option) => `<span>${option?.title}</span>`).join("") ??
    "-";

  let template = `<div class=${styles["like-item-wrapper"]}>
    <div class=${styles["img-wrapper"]}>
      <img src=${thumbImg}/>
    </div>
    <div class=${styles["info-wrapper"]}>

      <button class='${styles["btn-close"]}' id='btn-remove-like'>
        <i class="fa fa-times fa-lg" data-id=${id}></i>
      </button>
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
