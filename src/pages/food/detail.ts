import { Params } from "@/router/router";
import header from "@/components/header/header";
import styles from "./detail.scss";
import { getFoodDetailByIdx } from "@/apis/food/food";
import foodInfo from "@/components/food/foodInfo";
import foodOption from "@/components/food/foodOption";
import foodPrice from "@/components/food/foodPrice";
import { selectedFoodInfo } from "@/apis/food/types";

// let isEventListenerAdded = false;

/* 선택된 상품, 옵션 정보 */
let selectedMenuInfo = (idx: string): selectedFoodInfo => {
  return {
    foodIdx: idx,
    optionIdx: [],
    quantity: 0,
  };
};

export default async function foodDetailPage(
  cTarget: Element,
  params?: Params
) {
  const idx = params?.["foodIdx"]!;
  console.log("idx", idx);
  const currentInfo = selectedMenuInfo(idx);
  let template = `{{__header__}}
  {{__food_info__}}

  {{__food_options__}}

  <div class='divider-st1'></div>

  {{__bottom_sheet__}}
  `;
  let selectedPrice = 0;
  let totalPrice = 0;

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

    cTarget.innerHTML = template;
  } catch {
    cTarget.innerHTML = `<p>데이터 없음</p>`;
  }

  /* 
  TODO
  - 이벤트 관리, 유틸함수로 관리할 수 있을지 확인
  */
  function changeEventHandler(event: Event) {
    if (!document.contains(cTarget)) {
      cTarget.removeEventListener("change", changeEventHandler);
      return;
    }
    const target = event.target as HTMLInputElement;
    const targetId = target?.getAttribute("id") ?? "";
    // const currentInfo = selectedMenuInfo(idx);

    console.log("selectedMenuInfo", currentInfo);
    if (target.closest("#price-option") && target.type === "checkbox") {
      if (target.checked) {
        selectedPrice += Number(target?.value);

        currentInfo.optionIdx = [...currentInfo.optionIdx, targetId];
      } else {
        selectedPrice -= Number(target?.value); // 체크가 해제된 경우 값을 감소

        // id 값을 배열에서 제거
        const index = currentInfo.optionIdx.indexOf(targetId);
        if (index > -1) {
          currentInfo.optionIdx.splice(index, 1);
        }
      }
      // 가격 정보 업데이트
      const totalPriceElement = document.getElementById("total-price");
      if (totalPriceElement) {
        totalPriceElement.textContent =
          (totalPrice + selectedPrice).toLocaleString() + "원";
      }
    }
  }

  function clickEventHandler(event: Event) {
    if(!document.contains(cTarget)) {
      cTarget.removeEventListener("click", clickEventHandler);
      return;
  }
    const target = event.target as HTMLElement;
    // const currentInfo = selectedMenuInfo(idx);

    if (target.closest("#btn-add-cart")) {
      // alert("장바구니에 담았습니다.");
      console.log("selectedMenuInfo", selectedMenuInfo);
      console.log("idx", idx);

      addToCart({
        ...currentInfo,
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
        existingItem.optionIdx.join("") === selectedMenuInfo.optionIdx.join("")
      ) {
        existingItem.quantity += 1; // 수량 증가
      } else {
        selectedMenuInfo.quantity = 1; // 새로운 아이템이라면 수량을 1로 설정
        cart.push(selectedMenuInfo);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  // if (!isEventListenerAdded) {
  //   window.addEventListener("change", changeEventHandler);
  //   window.addEventListener("click", clickEventHandler);
  //   isEventListenerAdded = true;
  // }

  // 이전에 등록한 이벤트 리스너가 있다면 제거
  cTarget.removeEventListener("change", changeEventHandler);
  cTarget.removeEventListener("click", clickEventHandler);

  // 새로운 이벤트 리스너 등록
  cTarget.addEventListener("change", changeEventHandler);
  cTarget.addEventListener("click", clickEventHandler);
}
