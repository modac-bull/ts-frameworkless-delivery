import { header } from "@/components";
import styles from "./like.scss";

export default function likeStorePage(target: Element) {
  let template = `
  <div class='area'>
    {{__header__}}
    <div class=${styles["main"]}>
    <p class=${styles["main-title"]}>좋아요 페이지</p>
    </div>
  </div>
  `;

  const headerElement = header({ title: "찜 페이지", hasBack: true });
  template = template.replace("{{__header__}}", headerElement);

  target.innerHTML = template;
}
