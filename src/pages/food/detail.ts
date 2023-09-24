// import { Params } from "@/router/router";
import header from "@/components/header/header";
import styles from "./detail.scss";
import { getFoodDetailByIdx } from "@/apis/food/food";
import foodInfo from "@/components/food/foodInfo";
import foodOption from "@/components/food/foodOption";
import foodPrice from "@/components/food/foodPrice";
import Page from "@/core/Page";
import { selectedFoodInfo } from "@/apis/food/types";

const template = `{{__header__}}
  <div class='area'>
    {{__food_info__}}

    {{__food_options__}}

    <div class='divider-st1'></div>

    {{__bottom_sheet__}}
  </div>
  `;
export default class FoodDetailPage extends Page {
  foodId: string | null;
  optionId: string[];
  totalPrice: number;

  constructor(containerId: string) {
    super(containerId, template);
    this.foodId = "";
    this.optionId = [];
    this.totalPrice = 0;
  }

  eventMap() {
    return {
      "click #btn-add-cart": this.buttonClickHandler,
      "change #price-option": this.inputChangeHandler,
    };
  }

  // 장바구니 추가 로직
  buttonClickHandler() {
    // 로컬 스토리지에 추가
    const selectedInfo: selectedFoodInfo = {
      foodId: null,
      optionIds: [],
    };

    let cart = JSON.parse(localStorage.getItem("cart") as string) || [];
    selectedInfo.foodId = this.foodId;
    selectedInfo.optionIds = this.optionId;
    cart.push(selectedInfo);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 추가했습니다.");
  }

  // 옵션 정보 업데이트
  inputChangeHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    if (
      event.type === "change" &&
      target.closest("#price-option") &&
      target.type === "checkbox"
    ) {
      if (target.checked) {
        this.totalPrice += Number(target.value);
        this.optionId.push(target.id); // 옵션 ID 추가
      } else {
        this.totalPrice -= Number(target.value);
        const index = this.optionId.indexOf(target.id);
        if (index > -1) {
          this.optionId.splice(index, 1); // 옵션 ID 제거
        }
      }
      // 가격 정보 업데이트
      const totalPriceElement = document.getElementById("total-price");
      if (totalPriceElement) {
        totalPriceElement.textContent = this.totalPrice.toLocaleString();
      }
    }
  }

  async updateUI(): Promise<void> {
    const idx = this.params?.["foodIdx"]! as string;
    this.foodId = idx;
    this.optionId = [];

    const headerElement = header({ title: "음식 상세", hasBack: true });
    this.setTemplateData("header", headerElement);

    const foodDetailRes = await getFoodDetailByIdx(Number(idx));
    this.totalPrice = foodDetailRes.price;

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

    const SELECTED_PRICE = this.totalPrice;
    const bottomSheetElement = foodPrice({ price: SELECTED_PRICE });
    this.setTemplateData("bottom_sheet", bottomSheetElement);

    this.updatePage();
  }

  async render(): Promise<void> {
    try {
      await this.updateUI();
      this.bindEvents();
    } catch (error) {
      console.error("Error in rendering:", error);
      throw "데이터 없음";
    }
  }
}
