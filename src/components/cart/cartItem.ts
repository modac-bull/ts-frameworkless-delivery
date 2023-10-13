import cartItemStyle from "./cartItem.scss";

const cartItemTemplate = `<div class=${cartItemStyle["cart-item-wrapper"]}>
<div class=${cartItemStyle["img-wrapper"]}>
  <img src={{thumbImg}}/>
</div>
<div class=${cartItemStyle["info-wrapper"]}>

  <button class='${cartItemStyle["btn-close"]}' id='btn-remove-cart'>
    <i class="fa fa-times fa-lg" data-id={{id}}></i>
  </button>
  <h3 class=${cartItemStyle["title-food"]}>{{title}}</h3>
  <ul class=${cartItemStyle["desc-wrap"]}>
    <li class=${cartItemStyle["text-price"]}>가격 : {{price}}원</li>
    <li class=${cartItemStyle["text-desc"]}>{{desc}}</li>
    <li class=${cartItemStyle["text-options"]}>
      선택된 옵션 : 
      {{#each options}}
        {{title}}
      {{/each}}
    </li>
  </ul>
</div>`;

export default cartItemTemplate;
