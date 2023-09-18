import "./styles/reset.scss";
import "./styles/global.scss";

import createPages from "./router/pages";
import Router from "./router/router";

const pages = createPages("app");

/* 
라우트 설정
경로 - 경로에 맞는 함수 호출되도록 설정
일치하는 경로 없을 경우 page.notFound 호출
init() 메서드로 라우터 시작
- 초기 경로 확인, 페이지 내에서 라우트 변경을 감지하기 위한 리스너 설정
*/
// const router = createRouter();
const router = new Router();
router
  .addRoute("/", pages.home)
  .addRoute("/store/:storeIdx", pages.storeDetail)
  // .addRoute("/store", pages.storeList)
  // .addRoute("/food", pages.foodList)
  // .addRoute("/food/:foodIdx", pages.foodDetail)
  // .addRoute("/like", pages.likeList)
  // .addRoute("/cart", pages.cartList)
  .setNotFound(pages.notFound)
  .init();
