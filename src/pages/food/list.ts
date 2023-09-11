// 음식 목록은 가게 상세 페이지 내부에 존재해야 함 => 별도의 페이지가 아니라 컴포넌트로 다룰것

import styles from "./list.scss";

export default function storeListPage(target: Element) {
  let template = `
  <div class=${styles["list"]}>
    <p class=${styles["test"]}>테스트</p>
    <h1 class=${styles["list-title"]}>가게 리스트 페이지입니다.</h1>
  </div>
  `;

  target.innerHTML = template;
}
