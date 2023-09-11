import homePage from "../pages/home";
import storeListPage from "../pages/store/list";
import storeDetailPage from "../pages/store/detail";
// import foodListPage from "../pages/food/list";
import foodDetailPage from "../pages/food/detail";
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
    container.textContent = "페이지 없음!";
  };
  const foodDetail = (params?: Params) => {
    // foodListPage(container, params);
    foodDetailPage(container, params);
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
    notFound,
  };
};
