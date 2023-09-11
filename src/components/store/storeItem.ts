import { StoreItem } from "@/types/store";
import styles from "./storeItem.scss";

/* 가게 목록 아이템 컴포넌트 */

// type Props = {
//   title: string;
//   type: 0 | 1 | 2;
//   delivery_time: [number, number];
//   review_point: number;
//   review_cnt: number;
//   distance: number;
//   price_range: [number, number];
//   thumImgUrls: [string, string, string];
// };

export default function storeItem(data: StoreItem) {
  const {
    title,
    delivery_time,
    review_point,
    review_cnt,
    distance,
    price_range,
    thumImgUrls,
  } = data;
  let template = `<div class=${styles["store-item"]}>
    <h2>가게 이름 : ${title}</h2>
    <p>별점 : ${review_point}</p>
    <p>리뷰 카운트 : ${review_cnt}</p>
    <p>거리 : ${distance}</p>
    <p>가격범위 : ${price_range[0]} ~ ${price_range[1]}</p>
    <p>예상 배달 시간 : ${delivery_time[0]} ~ ${delivery_time[1]}</p>
    <div>
      <div>
        <img src=${thumImgUrls[0]} />
      </div>
      <div>
        <img src=${thumImgUrls[1]} />
        <img src=${thumImgUrls[2]} />
      </div>
    </div>
  </div>
  `;

  return template;
}
