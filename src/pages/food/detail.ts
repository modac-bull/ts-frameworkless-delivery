import { Params } from "@/router/router";
import header from "@/components/header/header";
import styles from "./detail.scss";
import { getFoodDetailByIdx } from "@/apis/food/food";
import foodInfo from "@/components/food/foodInfo";
import foodOption from "@/components/food/foodOption";
import foodPrice from "@/components/food/foodPrice";
import { selectedFoodInfo } from "@/apis/food/types";

let isEventListenerAdded = false;

export default async function foodDetailPage(target: Element, params?: Params) {
  const idx = params?.["foodIdx"]!;
  console.log("idx", idx);
  let template = `{{__header__}}
  {{__food_info__}}

  {{__food_options__}}

  <div class='divider-st1'></div>

  {{__bottom_sheet__}}
  `;
  let selectedPrice = 0;
  let totalPrice = 0;

  /* 선택된 상품, 옵션 정보 */
  let selectedMenuInfo: selectedFoodInfo = {
    foodIdx: idx,
    optionIdx: [],
    quantity: 0,
  };

  try {
    const headerElement = header({ title: "음식 상세", hasBack: true });
    template = template.replace("{{__header__}}", headerElement);

    const foodDetailRes = await getFoodDetailByIdx(Number(idx));
    totalPrice = foodDetailRes.price;
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

    const bottomSheet = foodPrice({ price: totalPrice });
    template = template.replace("{{__bottom_sheet__}}", bottomSheet);

    target.innerHTML = template;
  } catch {
    target.innerHTML = `<p>데이터 없음</p>`;
  }

  /* 
  TODO
  - 이벤트 관리, 유틸함수로 관리할 수 있을지 확인
  */
  if (!isEventListenerAdded) {
    window.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      const targetId = target?.getAttribute("id") ?? "";

      console.log("selectedMenuInfo", selectedMenuInfo);
      if (target.closest("#price-option") && target.type === "checkbox") {
        if (target.checked) {
          selectedPrice += Number(target?.value);

          selectedMenuInfo.optionIdx = [
            ...selectedMenuInfo.optionIdx,
            targetId,
          ];
        } else {
          selectedPrice -= Number(target?.value); // 체크가 해제된 경우 값을 감소

          // id 값을 배열에서 제거
          const index = selectedMenuInfo.optionIdx.indexOf(targetId);
          if (index > -1) {
            selectedMenuInfo.optionIdx.splice(index, 1);
          }
        }
        // 가격 정보 업데이트
        const totalPriceElement = document.getElementById("total-price");
        if (totalPriceElement) {
          totalPriceElement.textContent =
            (totalPrice + selectedPrice).toLocaleString() + "원";
        }
      }
    });
    window.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.closest("#btn-add-cart")) {
        alert("장바구니에 담았습니다.");

        addToCart({
          ...selectedMenuInfo,
          foodIdx: idx,
        });
      }

      // 장바구니 추가
      function addToCart(selectedMenuInfo: selectedFoodInfo) {
        // 로컬 스토리지에서 기존 장바구니 데이터
        let cart: selectedFoodInfo[] =
          JSON.parse(localStorage.getItem("cart") as string) || [];

        const existingItem = cart.find(
          (item: selectedFoodInfo) => item.foodIdx === selectedMenuInfo.foodIdx
        );
        if (
          existingItem &&
          existingItem.optionIdx.join("") ===
            selectedMenuInfo.optionIdx.join("")
        ) {
          existingItem.quantity += 1; // 수량 증가
        } else {
          selectedMenuInfo.quantity = 1; // 새로운 아이템이라면 수량을 1로 설정
          cart.push(selectedMenuInfo);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
    isEventListenerAdded = true;
  }
}
