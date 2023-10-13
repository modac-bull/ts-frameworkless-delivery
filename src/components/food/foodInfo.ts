import foodInfoStyle from "./foodInfo.scss";

const foodInfoTemplate = `<div class=${foodInfoStyle["food-info-container"]}>
<div class=${foodInfoStyle["img-wrap"]}>
  <img src={{data/thumbImg}} />
</div>
<div class=${foodInfoStyle["info-wrap"]}>
  <h2 class=${foodInfoStyle["title-food"]}>{{data/title}}</h2>
  <p class=${foodInfoStyle["desc-food"]}>{{data/desc}}</p>
  <div class=${foodInfoStyle["price-wrap"]}>
    <p class=${foodInfoStyle["title-feature"]}>가격</p>
    <p class=${foodInfoStyle["text-price"]}>{{data/price}}</p>
  </div>
</div>
<div class='divider-st1'></div>
</div>
`;

export default foodInfoTemplate;
