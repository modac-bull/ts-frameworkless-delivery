import { Params } from "@/router/router";
import header from "@/components/header/header";
import styles from "./detail.scss";
import { getFoodDetailByIdx } from "@/apis/food/food";
import foodInfo from "@/components/food/foodInfo";
import foodOption from "@/components/food/foodOption";

export default async function foodDetailPage(target: Element, params?: Params) {
  console.log("params", params?.["foodIdx"]);
  const idx = params?.["foodIdx"];
  let template = `{{__header__}}
  {{__food_info__}}

  {{__food_options__}}

  <div class='divider-st1'></div>
  `;

  try {
    const headerElement = header({ title: "음식 상세", hasBack: true });
    template = template.replace("{{__header__}}", headerElement);

    const foodDetailRes = await getFoodDetailByIdx(Number(idx));
    const foodInfoElement = foodInfo(foodDetailRes);
    template = template.replace("{{__food_info__}}", foodInfoElement);

    const optionInfoElement =
      foodDetailRes.options?.map((option) => foodOption(option)).join("") ??
      "<p>옵션이 없습니다.</p>";

    template = template.replace(
      "{{__food_options__}}",

      `<div class=${styles["option-container"]}>
        <p class=${styles["title-option"]}>추가선택</p>
        ${optionInfoElement}
      </div>` ?? ""
    );

    target.innerHTML = template;
  } catch {
    target.innerHTML = `<p>데이터 없음</p>`;
  }
}
