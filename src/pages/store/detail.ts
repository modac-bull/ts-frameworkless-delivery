import { Params } from "../../router/router";
import styles from "./detail.scss";

export default function storeDetailPage(target: Element, params?: Params) {
  console.log("params", params?.["storeIdx"]);
  let template = `
  <div class=${styles["detail"]}>
    <h1 class=${styles["detail-title"]}>가게 상세 페이지입니다.</h1>
    <P class=${styles["number"]}>${params?.["storeIdx"]}</p>
  </div>
  `;

  target.innerHTML = template;
}
