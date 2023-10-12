import "./styles/reset.scss";
import "./styles/global.scss";

// import createPages from "./router/pages";
import Router from "./router/router";
import HomePage from "./pages/home";
// import StoreDetailPage from "./pages/store/detail";
// import FoodDetailPage from "./pages/food/detail";
// import CartPage from "./pages/cart/cart";
import NotFoundPage from "./pages/404";
// import LikePage from "./pages/like/like";

/* 
라우트 설정
- url경로-페이지 인스턴스를 전달
- 일치하는 경로 없을 경우 notFoundPage 페이지 인스턴스 전달
- init() 메서드로 라우터 시작
*/
const router = new Router();
const homePage = new HomePage("app");
// const storeDetailPage = new StoreDetailPage("app");
// const foodDetailPage = new FoodDetailPage("app");
// const cartListPage = new CartPage("app");
// const likeListPage = new LikePage("app");
const notFoundPage = new NotFoundPage("app");

router
  .addRoute("/", homePage)
  // .addRoute("/store/:storeId", storeDetailPage)
  // .addRoute("/food/:foodId", foodDetailPage)
  // .addRoute("/cart", cartListPage)
  // .addRoute("/like", likeListPage)
  .setNotFound(notFoundPage)
  .init();
