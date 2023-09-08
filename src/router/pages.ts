import homePage from "../pages/home";
import storeDetailPage from "../pages/store/detail";
import storeListPage from "../pages/store/list";
import { Params } from "./router";

export default (container: Element) => {
  const home = () => {
    homePage(container);
  };

  const storeList = () => {
    storeListPage(container);
  };

  const storeDetail = (params?: Params) => {
    // storeListPage(container);
    storeDetailPage(container, params);
  };

  const food = async (params?: Params) => {
    console.log(params);
    container.textContent = "페이지 없음!";
  };

  const notFound = () => {
    container.textContent = "페이지 없음!";
  };

  return {
    home,
    storeList,
    storeDetail,
    food,
    notFound,
  };
};
