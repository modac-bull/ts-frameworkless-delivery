import { Params } from "@/router/router";
import styles from "./detail.scss";

import header from "@/components/header/header";
import storeInfo from "@/components/store/storeInfo";
import { getStoreDetailByIdx } from "@/apis/store/store";
import foodItem from "@/components/food/foodItem";
import { getFoodListDataByIdx } from "@/apis/food/food";

export default async function storeDetailPage(
  target: Element,
  params?: Params
) {
  const idx = params?.["storeIdx"]!;

  let template = `{{__header__}}
  <div class='area'>
    {{__store_info__}}

    <div class='divider-st1'></div>

    <div class="${styles["food-list-container"]}">
      <p class="${styles["title-menu"]}">추천 메뉴</p>
      {{__food_list__}}
    </div>
  </div>
  `;

  try {
    const storeInfoRes = await getStoreDetailByIdx(Number(idx));

    const headerElement = header({ title: "가게 상세", hasBack: true });
    template = template.replace("{{__header__}}", headerElement);

    const storeInfoElement = storeInfo(storeInfoRes);
    template = template.replace("{{__store_info__}}", storeInfoElement);

    const foodListRes = await getFoodListDataByIdx(Number(idx));
    const foodListElement = foodListRes.map((food) => foodItem(food)).join("");
    template = template.replace("{{__food_list__}}", foodListElement);

    target.innerHTML = template;
  } catch {
    target.innerHTML = `<p>데이터 없음</p>`;
  }
}
