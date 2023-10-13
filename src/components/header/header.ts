import headerStyle from "./header.scss";

const headerTemplate = `<header class=${headerStyle["header-container"]}>
  <div class=${headerStyle["header-inner"]}>
    <div class=${headerStyle["header-left"]}>
    {{#if hasBackButton}}
      <button class=${headerStyle["button-back"]} >
        <i id="back-button" class="fa fa-chevron-left fa-lg"></i>
      </button>
    {{/if}}
    </div>
    <h1>{{title}}</h1>
    <div class="${headerStyle["button-wrapper"]} ${headerStyle["header-right"]}">
      <button data-navigate="/" class=${headerStyle["button-home"]}>
        <i class="fa fa-home fa-lg"></i>
      </button>
      <button data-navigate="/like" class=${headerStyle["button-like"]}>
        <i class="fa fa-heart fa-lg"></i>
      </button>
      <button data-navigate="/cart" class=${headerStyle["button-cart"]} >
        <i class="fa fa-shopping-cart fa-lg"></i>
      </button>
    </div>
  </div>
</header>
`;

export default headerTemplate;
