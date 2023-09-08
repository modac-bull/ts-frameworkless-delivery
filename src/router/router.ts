const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";

const extractUrlParams = (route: Route, pathname: string) => {
  const params: Params = {};
  if (route.params.length === 0) {
    return params;
  }
  const matches = pathname.match(route.testRegExp);
  if (!matches) {
    return;
  }
  matches.shift();
  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue;
  });
  return params;
};

interface RenderCallbackFunction {
  (params?: Params): void;
}

type Route = {
  testRegExp: RegExp;
  callback: RenderCallbackFunction;
  params: ParamsId;
};
type ParamsId = string[];
type Params = { [key: string]: string };

class Router {
  private routes: Route[];
  private notFound;
  private lastPathname;

  constructor() {
    this.routes = [];
    this.notFound = () => {};
    this.lastPathname = "";
  }

  /* 
  현재 URL을 확인하고 일치하는 라우트의 콜백을 실행
  일치하는 라우트 없을 경우 notFound 콜백 실행
  */
  checkRoutes() {
    const { pathname } = window.location;
    if (this.lastPathname === pathname) {
      return;
    }
    this.lastPathname = pathname;
    const currentRoute = this.routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(pathname);
    });

    if (!currentRoute) {
      this.notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, pathname);
    currentRoute.callback(urlParams);
  }

  addRoute(path: string, callback: RenderCallbackFunction) {
    const params: ParamsId = [];
    const parsedPath = path
      .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, "\\/");
    this.routes.push({
      testRegExp: new RegExp(`^${parsedPath}$`),
      callback,
      params,
    }); 
    return this;
  }

  /* 일치하는 라우트 없을 떄 실행할 콜백 설정 */
  setNotFound(cb: RenderCallbackFunction) {
    this.notFound = cb;
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
