import { Bfh.HtmlPage } from './app.po';

describe('bfh.html App', () => {
  let page: Bfh.HtmlPage;

  beforeEach(() => {
    page = new Bfh.HtmlPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
