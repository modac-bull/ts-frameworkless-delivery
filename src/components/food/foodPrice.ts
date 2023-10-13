import foodPriceStyle from "./foodPrice.scss";

const foodPriceTemplate = `<div class=${foodPriceStyle["bottom-sheet"]}>
  <button id='btn-add-cart' type='button' class=${foodPriceStyle["button-primary"]}>
    <span id="total-price" >{{foodPrice}}</span>원 담기
  </button>
</div>
`;
export default foodPriceTemplate;
