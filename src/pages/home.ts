import styles from "./home.scss";
import Page from "@/core/Page";
import { getStoreListData } from "@/apis/store/store";

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
    const storeListData = await getStoreListData();

    const state = [
      {
        key: "header",
        data: { title: "메인", hasBack: false },
      },
      {
        key: "food_list",
        data: storeListData,
      },
    ];
    this.componentMap.push(...state);
  }
}
