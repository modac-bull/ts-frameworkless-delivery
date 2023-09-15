import { Params } from "@/router/router";
import styles from "./detail.scss";
import header from "@/components/header/header";
import { getFoodDetailByIdx } from "@/apis/food/food";
import foodInfo from "@/components/food/foodInfo";

export default async function foodDetailPage(target: Element, params?: Params) {
  console.log("params", params?.["foodIdx"]);
  const idx = params?.["foodIdx"];
  let template = `{{__header__}}
  {{__food_info__}}
  <div class=area>
    <h1 class=${styles["detail-title"]}>메뉴 상세 페이지입니다.</h1>
    <P class=${styles["number"]}>${params?.["foodIdx"]}</p>
  </div>
  `;

  try {
    const headerElement = header({ title: "가게 상세", hasBack: true });
    template = template.replace("{{__header__}}", headerElement);

    const foodDetailRes = await getFoodDetailByIdx(Number(idx));
    const foodInfoElement = foodInfo(foodDetailRes);
    template = template.replace("{{__food_info__}}", foodInfoElement);

    target.innerHTML = template;
  } catch {
    target.innerHTML = `<p>데이터 없음</p>`;
  }
}
