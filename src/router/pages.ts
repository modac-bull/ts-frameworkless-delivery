// import homePage from "@/pages/home";

import HomePage from "@/pages/home";
import StoreDetailPage from "@/pages/store/detail";
import { Params } from "./router";

export default (container: string) => {
  const home = () => {
    const homePage = new HomePage(container);
    homePage.render();
  };
  // const storeList = () => {
  //   storeListPage(container);
  // };
  const storeDetail = (params?: Params) => {
    const storeDealPage = new StoreDetailPage(container, params);
    storeDealPage.render();
  };
  // const foodList = () => {
  //   // foodListPage(container);
  //   // 별도의 페이지로 만들 필요 없음
  //   container.textContent = "페이지 없음!";
  // };
  // const foodDetail = (params?: Params) => {
  //   // foodListPage(container, params);
  //   foodDetailPage(container, params);
  // };
  // const likeList = () => {
  //   likeStorePage(container);
  // };
  // const cartList = () => {
  //   cartFoodPage(container);
  // };

  const notFound = () => {
    // container.textContent = "페이지 없음!";
  };

  return {
    home,
    // storeList,
    storeDetail,
    // foodList,
    // foodDetail,
    // likeList,
    // cartList,
    notFound,
  };
};
