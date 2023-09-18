// import homePage from "@/pages/home";

import HomePage from "@/pages/home";
import StoreDetailPage from "@/pages/store/detail";
import { Params } from "./router";
import FoodDetailPage from "@/pages/food/detail";
import CartPage from "@/pages/cart/cart";

export default (container: string) => {
  const home = () => {
    const homePage = new HomePage(container);
    homePage.render();
  };
  const storeDetail = (params?: Params) => {
    const storeDetalPage = new StoreDetailPage(container, params);
    storeDetalPage.render();
  };
  const foodDetail = (params?: Params) => {
    const foodDetailPage = new FoodDetailPage(container, params);
    foodDetailPage.render();
  };
  // const likeList = () => {
  //   likeStorePage(container);
  // };
  const cartList = () => {
    // cartFoodPage(container);
    const cartPage = new CartPage(container);
    cartPage.render();
  };

  const notFound = () => {
    // container.textContent = "페이지 없음!";
  };

  return {
    home,
    // storeList,
    storeDetail,
    // foodList,
    foodDetail,
    // likeList,
    cartList,
    notFound,
  };
};
