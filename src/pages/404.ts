import Page from "@/core/Page";

const template = `
<div class='area'>
  <p>존재하지 않는 페이지입니다.</p>
</div>
`;
export default class NotFoundPage extends Page {
  constructor(containerId: string) {
    super(containerId, template);
  }
  async updateUI(): Promise<void> {
    this.updatePage();
  }
  async render(): Promise<void> {
    try {
      await this.updateUI();
      this.bindEvents();
    } catch (error) {
      console.error("Error in rendering:", error);
    }
  }
}
