import header from "@/components/header/header";
import styles from "./home.scss";
import storeItem from "@/components/store/storeItem";
import { getStoreListData } from "@/apis/store/store";

export default async function homePage(target: Element) {
  let template = `
  {{__header__}}
  <div class='area'>
    <div class=${styles["main"]}>
      <ul>
        {{__food_list__}}
      </ul>
    </div>
  </div>
  `;

  const headerElement = header({ title: "메인", hasBack: false });
  template = template.replace("{{__header__}}", headerElement);

  const res = await getStoreListData();
  const foodlistElement = res.map((store) => storeItem(store)).join("");
  template = template.replace("{{__food_list__}}", foodlistElement);

  target.innerHTML = template;
}
