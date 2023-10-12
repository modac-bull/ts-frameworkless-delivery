import foodInfo from "@/components/food/foodInfo";
import foodItem from "@/components/food/foodItem";
import foodOption from "@/components/food/foodOption";
import foodPrice from "@/components/food/foodPrice";
import header from "@/components/header/header";
import storeInfo from "@/components/store/storeInfo";
import { Params } from "@/router/router";
type EventMapType = { [key: string]: (event: Event) => void };
type ComponentMapType = { key: string; data: any }[];
export default abstract class Page {
  /* 페이지 HTML 템플릿 */
  private readonly template: string;

  /* 페이지 컨텐츠가 삽입될 부모 컨테이너 */
  private readonly container: HTMLElement;
  /* 실시간으로 렌더링될 템플릿 */
  /* 페이지에 전달된 파라미터 저장 */
  private _params: Params | null = null;
  /* 이벤트 핸들러 함수 저장 */
  private boundEventHandlers: EventMapType = {};
  protected componentMap: ComponentMapType = [];

  get params(): Params | null {
    return this._params;
  }

  set params(value: Params | null) {
    this._params = value;
  }

  /* 
  - 페이지가 사용할 containerId, template을 받아 초기화
  */
  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    if (!containerElement) {
      throw new Error("일치하는 컨테이너가 없어요");
    }

    this.container = containerElement;
    this.template = template;
  }

  /* 템플릿에 데이터를 입힌 템플릿으로 교체 */
  protected setTemplateData(
    template: string,
    key: string,
    value: string
  ): string {
    return template.replace(`{{__${key}__}}`, value);
  }

  /* 페이지 업데이트 + renderTemplate 초기 템플릿으로 복구 */
  protected updateHTML(): void {
    /* 
    1. 템플릿과 관련된 모든 작업을 한다.
    2. renderTemplate은 없앤다.
    - 맵, 변수
    3. element는 데이터가 아니다. 
     */
    let updatedTemplate = this.template;

    this.componentMap.map((component) => {
      let resultComponent = "";

      switch (component.key) {
        case "header":
          resultComponent = header(component.data);
          break;
        case "store_info":
          resultComponent = storeInfo(
            component.data.detail,
            component.data.isLike
          );
          break;
        case "food_info":
          resultComponent = foodInfo(component.data);
          break;
        case "food_list":
          resultComponent = component.data
            .map((food: any) => foodItem(food))
            .join("");
          break;
        case "food_options":
          resultComponent = component.data
            .map((food: any) => foodOption(food))
            .join("");
          break;
        case "bottom_sheet":
          resultComponent = foodPrice(component.data);
          break;
        // 추가적인 component.key들을 위한 케이스
        default:
          break;
      }

      updatedTemplate = this.setTemplateData(
        updatedTemplate,
        component.key,
        resultComponent
      );
    });

    this.container.innerHTML = updatedTemplate;
    this.componentMap = [];
  }

  /**
   * 이벤트 매핑을 반환하는 메서드
   * 예시: { "click .btn-save": this.saveHandler }
   *
   * @returns {EventMapType} - 이벤트 설명과 핸들러를 연결한 객체.
   */
  protected defineEventMap(): EventMapType {
    return {};
  }

  /**
   * `eventMap` 메서드를 통해 제공된 매핑을 기반으로 이벤트를 바인딩
   */
  protected bindEvents(): void {
    const events = this.defineEventMap();
    for (const eventSelector in events) {
      const [event, selector] = eventSelector.split(" ");
      const elements = this.container.querySelectorAll(selector);
      const boundHandler = events[eventSelector].bind(this);

      // 핸들러를 바인딩하고 나중에 제거하기 위한 참조 저장
      this.boundEventHandlers[eventSelector] = boundHandler;
      elements.forEach((element) => {
        element.addEventListener(event, boundHandler);
      });
    }
  }
  /**
   * `bindEvents`를 사용하여 이전에 바인딩 된 모든 이벤트를 해제
   */
  unbindEvents(): void {
    for (const eventSelector in this.boundEventHandlers) {
      const [event, selector] = eventSelector.split(" ");
      const elements = this.container.querySelectorAll(selector);
      elements.forEach((element) => {
        element.removeEventListener(
          event,
          this.boundEventHandlers[eventSelector]
        );
      });

      // 이벤트를 해제한 후 저장된 참조를 삭제
      delete this.boundEventHandlers[eventSelector];
    }
  }

  /**
   * UI 업데이트를 위한 추상 메서드
   * 하위 클래스에서 구현
   */
  abstract updateData(): Promise<void>;

  /* 
  updateUI 호출, 이벤트를 바인딩
  error 발생시 404 url로 이동
  */
  async render(): Promise<void> {
    try {
      await this.updateData(); // updateUI 호출

      // 별도의 렌더링 하는 메서드 이곳에서 호출
      this.updateHTML();

      this.bindEvents();
    } catch (error) {
      console.log(error);
      window.location.href = "/404";
    }
  }
}
