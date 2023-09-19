import { Params } from "@/router/router";
type EventMapType = { [key: string]: (event: Event) => void };
export default abstract class Page {
  template: string;
  container: HTMLElement;
  renderTemplate: string;
  _params: Params | null = null;
  boundEventHandlers: { [key: string]: (event: Event) => void } = {};

  get params(): Params | null {
    return this._params;
  }

  set params(value: Params | null) {
    this._params = value;
  }

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    if (!containerElement) {
      throw "일치하는 컨테이너가 없어요";
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
  }

  setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  updatePage(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }

  /**
   * 이벤트 매핑을 반환하는 메서드
   * 예시: { "click .btn-save": this.saveHandler }
   *
   * @returns {EventMapType} - 이벤트 설명과 핸들러를 연결한 객체.
   */
  eventMap(): EventMapType {
    return {};
  }

  /**
   * `eventMap` 메서드를 통해 제공된 매핑을 기반으로 이벤트를 바인딩
   */
  bindEvents(): void {
    const events = this.eventMap();
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

  abstract render(): Promise<void>;
}
