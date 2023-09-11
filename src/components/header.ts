import style from "./header.scss";

type Props = {
  title: string;
  hasBack?: boolean;
};

export default function header({ title, hasBack }: Props) {
  const backButton = hasBack
    ? `<button id="back-button" class=${style["button-back"]}>
      <span class=${style["icon-back"]}>뒤로</span>
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
        <button class=${style["button-like"]}>찜 리스트</button>
        <button class=${style["button-cart"]} >장바구니</button>
      </div>
    </div>
  </header>
  `;

  return template;
}
