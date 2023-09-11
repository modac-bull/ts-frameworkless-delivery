import { Params } from "@/router/router";
import styles from "./detail.scss";
import header from "@/components/header/header";

export default function storeDetailPage(target: Element, params?: Params) {
  console.log("params", params?.["storeIdx"]);

  let template = `<div class='area'>
    {{__header__}}

    <div class=${styles["detail"]}>
      <h1 class=${styles["detail-title"]}>가게 상세 페이지입니다.</h1>
      <P class=${styles["number"]}>${params?.["storeIdx"]}</p>
    </div>
  </div>
  `;

  const headerElement = header({ title: "메인", hasBack: true });
  template = template.replace("{{__header__}}", headerElement);

  target.innerHTML = template;
}
