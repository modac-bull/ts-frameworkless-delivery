import header from "@/components/header/header";
import styles from "./home.scss";
import Page from "@/core/Page";
import { getStoreListData } from "@/apis/store/store";
import storeItem from "@/components/store/storeItem";

const template = `
{{__header__}}
<div class='area'>
  <div class=${styles["main"]}>
    <ul>
      {{__food_list__}}
    </ul>
  </div>
</div>
`;
export default class HomePage extends Page {
  constructor(containerId: string) {
    super(containerId, template);
  }

  async updateData(): Promise<void> {
    const res = await getStoreListData();

    const headerElement = header({ title: "메인", hasBack: false });
    const foodlistElement = res.map((store) => storeItem(store)).join("");

    const data = [
      {
        key: "header",
        component: headerElement,
      },
      {
        key: "food_list",
        component: foodlistElement,
      },
    ];
    this.componentMap.push(...data);
  }
}
