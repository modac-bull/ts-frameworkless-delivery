import style from "./header.scss";

type Props = {
  title: string;
  hasBack?: boolean;
};

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

  return template;
}
