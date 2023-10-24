import foodItemStyle from "./foodItem.scss";

const foodItemTemplate = `<div data-navigate=/food/{{id}} class=${foodItemStyle["food-item-wrapper"]}>
<div class=${foodItemStyle["txt-wrap"]}>
  <p class=${foodItemStyle["title-food"]}>{{title}}</p>
  <p class=${foodItemStyle["desc-food"]}>{{desc}}</p>
  <p class=${foodItemStyle["price-food"]}>{{price}}원</p>
</div>
<div class=${foodItemStyle["img-wrap"]}>
  <img src={{thumbImg}}/>
</div>
</div>`;

export default foodItemTemplate;
