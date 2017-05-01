import { AngularSocketioGamePage } from './app.po';

describe('angular-socketio-game App', () => {
  let page: AngularSocketioGamePage;

  beforeEach(() => {
    page = new AngularSocketioGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('aio works!');
  });
});
