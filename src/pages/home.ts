import styles from "./home.scss";
import headerStyle from "@/components/header/header.scss";
import storeItemStyle from "@/components/store/storeItem.scss";
import Page from "@/core/Page";
import { getStoreListData } from "@/apis/store/store";
import Handlebars from "handlebars";

const template = `
{{!헤더}}
<header class=${headerStyle["header-container"]}>
  <div class=${headerStyle["header-inner"]}>
    <div class=${headerStyle["header-left"]}>
    {{#if header/hasBackButton}}
      <button class=${headerStyle["button-back"]} >
        <i id="back-button" class="fa fa-chevron-left fa-lg"></i>
      </button>
    {{/if}}

    </div>
    <h1>{{header/title}}</h1>
    <div class="${headerStyle["button-wrapper"]} ${headerStyle["header-right"]}">
      <button data-navigate="/" class=${headerStyle["button-home"]}>
        <i class="fa fa-home fa-lg"></i>
      </button>
      <button data-navigate="/like" class=${headerStyle["button-like"]}>
        <i class="fa fa-heart fa-lg"></i>
      </button>
      <button data-navigate="/cart" class=${headerStyle["button-cart"]} >
        <i class="fa fa-shopping-cart fa-lg"></i>
      </button>
    </div>
  </div>
</header>
{{! /.헤더}}

<div class='area'>
  <div class=${styles["main"]}>
    <ul>
      {{#each storeLists}}
        <div data-navigate=/store/{{id}} class=${storeItemStyle["store-item"]}>
          <div class=${storeItemStyle["img-wrapper"]}>
            <div class=${storeItemStyle["left"]}>
              <img src={{thumImgUrls.[0]}} />
            </div>
            <div class=${storeItemStyle["right"]}>
              <img src={{thumImgUrls.[1]}} />
              <img src={{thumImgUrls.[2]}} />
            </div>
          </div>
          <div class=${storeItemStyle["info-wrapper"]}>
            <div class=${storeItemStyle["left"]}>
              <div class=${storeItemStyle["title-wrapper"]}>
                <h2 class=${storeItemStyle["title"]}>{{title}}</h2>
              </div>
              <div class=${storeItemStyle["description"]}>
                <span class=${storeItemStyle["reviews"]}>
                  <i class="fa fa-star fa-lg"></i>
                  {{review__point}}({{review_cnt}})
                </span>
                <span> {{distance}}km</span>
                <span> {{delivery_price_range.[0]}}원 ~ {{delivery_price_range.[1]}}원</span>
              </div>
            </div>
            <div class=${storeItemStyle["right"]}>
              <p> {{delivery_time.[0]}} ~ {{delivery_time.[1]}} 분</p>
            </div>
          </div>
        </div>
      {{/each}}

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
    this.compiledTemplate = Handlebars.compile(template)(context);
  }
}
