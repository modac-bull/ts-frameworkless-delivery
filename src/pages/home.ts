import styles from "./home.scss";
import headerTemplate from "@/components/header/header";
import storeItemTemplate from "@/components/store/storeItem";
import Page from "@/core/Page";
import { getStoreListData } from "@/apis/store/store";
import Handlebars from "handlebars";

Handlebars.registerPartial("header", headerTemplate);
Handlebars.registerPartial("storeItem", storeItemTemplate);

const template = `
{{!헤더}}
{{> header hasBackButton=header/hasBackButton title=header/title }}
{{! /.헤더}}

<div class='area'>
  <div class=${styles["main"]}>
    <ul>
      {{! 가게 목록}}
      {{#each storeLists}}
        {{>storeItem 
          id=id 
          thumbImgUrls=thumImgUrls
          review_point=review_point 
          review_cnt=review_cnt 
          distance=distance 
          delivery_price_range=delivery_price_range
          delivery_time=delivery_time
        }}
      {{/each}}
      {{! /.가게 목록}}
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

    const context = {
      header: {
        hasBackButton: false,
        title: "메인",
      },
      storeLists: storeListData,
    };
    this.context = context;
  }
}
