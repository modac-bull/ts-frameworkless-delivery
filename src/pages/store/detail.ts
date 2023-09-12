import { Params } from "@/router/router";
// import styles from "./detail.scss";
import header from "@/components/header/header";
import storeInfo from "@/components/store/storeInfo";
import { getStoreDetailByIdx } from "@/apis/store/store";

export default async function storeDetailPage(
  target: Element,
  params?: Params
) {
  const idx = params?.["storeIdx"]!;

  let template = `  {{__header__}}
  <div class='area'>
    {{__store_info__}}

    {{__food_list__}}
  </div>
  `;

  
  try {
    const storeInfoRes = await getStoreDetailByIdx(Number(idx));

    const headerElement = header({ title: "가게 상세", hasBack: true });
    template = template.replace("{{__header__}}", headerElement);
    
    const storeInfoElement = storeInfo(storeInfoRes);
    template = template.replace("{{__store_info__}}", storeInfoElement);
  
    target.innerHTML = template;

  } catch {
    console.log('res' )

    target.innerHTML = `<p>데이터 없음</p>`

  }
}
