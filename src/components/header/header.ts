import style from "./header.scss";

type Props = {
  title: string;
  hasBack?: boolean;
};

let isEventListenerAdded = false;

export default function header({ title, hasBack }: Props) {
  const backButton = hasBack
    ? `<button class=${style["button-back"]} >
      <i id="back-button" class="fa fa-chevron-left fa-lg"></i>
    </button>
  `
    : "";

  let template = `<header class=${style["header-container"]}>
    <div class=${style["header-inner"]}>
      <div class=${style["header-left"]}>
        ${backButton}
      </div>
      <h1>${title}</h1>
      <div class="${style["button-wrapper"]} ${style["header-right"]}">
        <button data-navigate="/" class=${style["button-home"]}>
          <i class="fa fa-home fa-lg"></i>
        </button>
        <button data-navigate="/like" class=${style["button-like"]}>
          <i class="fa fa-heart fa-lg"></i>
        </button>
        <button data-navigate="/cart" class=${style["button-cart"]} >
          <i class="fa fa-shopping-cart fa-lg"></i>
        </button>
      </div>
    </div>
  </header>
  `;

  /* 
  TODO
  - 이벤트 관리, 유틸함수로 관리할 수 있을지 확인
  */
  if (!isEventListenerAdded) {
    window.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      // #back-button 또는 그의 상위 요소 중 #back-button 요소를 가지고 있는 경우
      if (target.closest("#back-button")) {
        console.log("뒤로 버튼 클릭됨!");
        // 뒤로 가기 로직
        history.back();
        return;
      }
    });
    isEventListenerAdded = true;
  }

  return template;
}
