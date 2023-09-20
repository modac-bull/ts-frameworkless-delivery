import Page from "@/core/Page";

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";

const extractUrlParams = (route: Route, pathname: string) => {
  const params: Params = {};
  if (route.params.length === 0) {
    return params;
  }
  const matches = pathname.match(route.testRegExp);
  if (!matches) {
    return params;
  }
  matches.shift();
  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue;
  });
  return params;
};

type Route = {
  testRegExp: RegExp;
  page: Page;
  params: ParamsId;
};
type ParamsId = string[];
export type Params = { [key: string]: string };

class Router {
  private routes: Route[];
  private notFound: Page | null;
  private lastPathname;

  constructor() {
    this.routes = [];
    this.notFound = null;
    this.lastPathname = "";
  }

  /* 
  현재 URL을 확인하고 일치하는 라우트의 페이지 인스턴스 render 메서드 수행
  - 이벤트 리스너 해제 코드 추가
  */
  checkRoutes() {
    const { pathname } = window.location;
    if (this.lastPathname === pathname) {
      return;
    }
    // 현재 활성화된 페이지의 이벤트 리스너 해제
    const currentActiveRoute = this.routes.find((route) =>
      route.testRegExp.test(this.lastPathname)
    );
    if (currentActiveRoute) {
      currentActiveRoute.page.unbindEvents();
    }

    this.lastPathname = pathname;
    const currentRoute = this.routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(pathname);
    });

    if (!currentRoute) {
      this.notFound?.render();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, pathname);
    currentRoute.page.params = urlParams;
    currentRoute.page.render();
  }

  addRoute(path: string, page: Page) {
    const params: ParamsId = [];
    const parsedPath = path
      .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, "\\/");
    this.routes.push({
      testRegExp: new RegExp(`^${parsedPath}$`),
      page,
      params,
    });
    return this;
  }

  /* 일치하는 라우트 없을 떄 실행할 콜백 설정 */
  setNotFound(page: Page) {
    this.notFound = page;
    return this;
  }

  /* 주어진 경로로 이동하고 해당 라우트의 콜백을 실행 */
  navigate(path: string) {
    window.history.pushState(null, "", path);
    this.checkRoutes();
  }

  /** 초기화 - navigation 버튼 이벤트 리스너 등록*/
  init() {
    this.checkRoutes();
    window.addEventListener("popstate", this.checkRoutes.bind(this));

    /* 
    내베기에션 버튼 이벤트 리스너 설정
    data-navigate 속성 값을 가져와 router.navigate() 메서드 호출하여 해당 경로로 이동
    */
    const NAV_BTN_SELECTOR = "[data-navigate]";
    document.body.addEventListener("click", (e: MouseEvent) => {
      // 클릭 대상의 가까운 부모 중 data-navigate 속성을 갖는 요소 탐색
      const target = (e.target as Element).closest(
        NAV_BTN_SELECTOR
      ) as HTMLElement | null;
      if (target !== null && target.matches(NAV_BTN_SELECTOR)) {
        const { navigate } = target.dataset;
        if (navigate) {
          this.navigate(navigate);
        }
      }
    });
  }
}

export default Router;
