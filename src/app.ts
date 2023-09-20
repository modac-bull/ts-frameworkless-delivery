import "./styles/reset.scss";
import "./styles/global.scss";

// import createPages from "./router/pages";
import Router from "./router/router";
import HomePage from "./pages/home";
import StoreDetailPage from "./pages/store/detail";
import FoodDetailPage from "./pages/food/detail";
import CartPage from "./pages/cart/cart";
import NotFoundPage from "./pages/404";

// const pages = createPages("app");

/* 
라우트 설정
경로 - 경로에 맞는 함수 호출되도록 설정
일치하는 경로 없을 경우 page.notFound 호출
init() 메서드로 라우터 시작
- 초기 경로 확인, 페이지 내에서 라우트 변경을 감지하기 위한 리스너 설정
*/
// const router = createRouter();
const router = new Router();
const homePage = new HomePage("app");
const storeDetailPage = new StoreDetailPage("app");
const foodDetailPage = new FoodDetailPage("app");
const cartListPage = new CartPage("app");
const notFoundPage = new NotFoundPage("app");
// const likeListPage = new

router
  .addRoute("/", homePage)
  .addRoute("/store/:storeIdx", storeDetailPage)
  .addRoute("/food/:foodIdx", foodDetailPage)
  .addRoute("/cart", cartListPage)
  // .addRoute("/like", cartListPage)
  .setNotFound(notFoundPage)
  .init();
