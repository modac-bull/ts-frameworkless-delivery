import header from "@/components/header/header";
import styles from "./home.scss";
import storeItem from "@/components/store/storeItem";
import { StoreItem } from "@/apis/store/types";

export default function homePage(target: Element) {
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

  /* 
  TODO
  더미 데이터 apis 로 이동하기
  */

  const DUMMY_STORE: StoreItem[] = [
    {
      id: 1,
      title: "가게이름 가게이름 가게이름 가게이름 가게이름",
      type: 0,
      delivery_time: [15, 20],
      review_point: 5.0,
      review_cnt: 1235,
      distance: 1.4,
      price_range: [15000, 35000],
      thumImgUrls: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      ],
    },
  ];

  const foodlistElement = DUMMY_STORE.map((store) => storeItem(store)).join(
    ","
  );
  template = template.replace("{{__food_list__}}", foodlistElement);

  target.innerHTML = template;
}
