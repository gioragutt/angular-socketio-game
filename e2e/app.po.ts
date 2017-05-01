import { browser, element, by } from 'protractor';

export class AngularSocketioGamePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('aio-root h1')).getText();
  }
}
