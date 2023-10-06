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
}
