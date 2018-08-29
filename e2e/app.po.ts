import { browser, by, element } from 'protractor';

export class PortalDr2cBerryFePage {
  navigateTo () {
    return browser.get('/');
  }

  getParagraphText () {
    return element(by.css('berry-root h1')).getText();
  }
}
