import styles from "./foodPrice.scss";

/* 가게 상세 상단 정보 */
export default function foodPrice(data: { price: number }) {
  const { price } = data;

  // 찜,좋아요 조건 임시
  let template = `<div class=${styles["bottom-sheet"]}>
    <button id='btn-add-cart' type='button' class=${
      styles["button-primary"]
    }><span id="total-price" >${price.toLocaleString()}</span>원 담기</button>
  </div>
  `;

  return template;
}
