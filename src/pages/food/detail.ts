import { Params } from "@/router/router";
import header from "@/components/header/header";
import styles from "./detail.scss";
import { getFoodDetailByIdx } from "@/apis/food/food";
import foodInfo from "@/components/food/foodInfo";
import foodOption from "@/components/food/foodOption";
import foodPrice from "@/components/food/foodPrice";
import Page from "@/core/Page";

const template = `{{__header__}}
  {{__food_info__}}

  {{__food_options__}}

  <div class='divider-st1'></div>

  {{__bottom_sheet__}}
  `;
export default class FoodDetailPage extends Page {
  params: Params | null;

  constructor(containerId: string, params?: Params) {
    super(containerId, template);
    this.params = params ?? null;
  }

  async render(): Promise<void> {
    if (!this.params) {
      return;
    }
    const idx = this.params?.["foodIdx"]! as string;
    try {
      const headerElement = header({ title: "음식 상세", hasBack: true });
      this.setTemplateData("header", headerElement);

      const foodDetailRes = await getFoodDetailByIdx(Number(idx));
      const foodInfoElement = foodInfo(foodDetailRes);
      this.setTemplateData("food_info", foodInfoElement);

      const optionInfoElement =
        foodDetailRes.options?.map((option) => foodOption(option)).join("") ??
        "<p>옵션이 없습니다.</p>";
      this.setTemplateData(
        "food_options",
        `<div class=${styles["option-container"]}>
          <p class=${styles["title-option"]}>추가선택</p>
          ${optionInfoElement}
        </div>` ?? ""
      );

      /* TODO = 가격 갱신 로직 추가 */
      const SELECTED_PRICE = 1000;
      const bottomSheetElement = foodPrice({ price: SELECTED_PRICE });
      this.setTemplateData("bottom_sheet", bottomSheetElement);

      this.updatePage();
    } catch {
      throw "데이터 없음";
    }
  }
}
