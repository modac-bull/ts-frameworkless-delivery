import { header } from "../components";
import styles from "./home.scss";


export default function homePage(target: Element) {
  let template = `
  <div class='area'>
    {{__header__}}
    <div class=${styles["main"]}>
    <p class=${styles["test"]}>테스트</p>
    <p class=${styles["main-title"]}>메인 페이지입니다.</p>
    </div>
  </div>
  `;
  
  const headerElement = header({ title: "메인", hasBack: false });
  template = template.replace("{{__header__}}", headerElement);

  target.innerHTML = template;
}
