import { Params } from "@/router/router";

export default abstract class Page {
  template: string;
  container: HTMLElement;
  renderTemplate: string;
  _params: Params | null = null;

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

  abstract render(): Promise<void>;
}
