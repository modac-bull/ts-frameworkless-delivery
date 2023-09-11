import { Params } from "@/router/router";
import styles from "./detail.scss";

export default function foodDetailPage(target: Element, params?: Params) {
  console.log("params", params?.["foodIdx"]);
  let template = `
  <div class=${styles["detail"]}>
    <h1 class=${styles["detail-title"]}>메뉴 상세 페이지입니다.</h1>
    <P class=${styles["number"]}>${params?.["foodIdx"]}</p>
  </div>
  `;

  target.innerHTML = template;
}
