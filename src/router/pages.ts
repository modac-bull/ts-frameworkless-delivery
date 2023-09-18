// import homePage from "@/pages/home";

import HomePage from "@/pages/home";

export default (container: string) => {
  const homePage = new HomePage(container);
  const home = () => {
    homePage.render();
  };
  // const storeList = () => {
  //   storeListPage(container);
  // };
  // const storeDetail = (params?: Params) => {
  //   storeDetailPage(container, params);
  // };
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
    // storeDetail,
    // foodList,
    // foodDetail,
    // likeList,
    // cartList,
    notFound,
  };
};
