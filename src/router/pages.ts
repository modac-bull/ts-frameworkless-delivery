import homePage from "@/pages/home";
import storeListPage from "@/pages/store/list";
import storeDetailPage from "@/pages/store/detail";
// import foodListPage from "@/pages/food/list";
import foodDetailPage from "@/pages/food/detail";
import likeStorePage from "@/pages/like/like";
import cartFoodPage from "@/pages/cart/cart";
import { Params } from "./router";

export default (container: Element) => {
  const home = () => {
    homePage(container);
  };
  const storeList = () => {
    storeListPage(container);
  };
  const storeDetail = (params?: Params) => {
    storeDetailPage(container, params);
  };
  const foodList = () => {
    // foodListPage(container);
    // 별도의 페이지로 만들 필요 없음
    container.textContent = "페이지 없음!";
  };
  const foodDetail = (params?: Params) => {
    // foodListPage(container, params);
    foodDetailPage(container, params);
  };
  const likeList = () => {
    likeStorePage(container);
  };
  const cartList = () => {
    cartFoodPage(container);
  };

  const notFound = () => {
    container.textContent = "페이지 없음!";
  };

  return {
    home,
    storeList,
    storeDetail,
    foodList,
    foodDetail,
    likeList,
    cartList,
    notFound,
  };
};
